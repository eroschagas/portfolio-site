import assert from "node:assert/strict";
import econet from "../app/data/work/econet.ts";
import socarrao from "../app/data/work/socarrao.ts";
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const binaryPath = (process.env.PATH ?? process.env.Path)
  .split(path.delimiter)
  .find((directory) =>
    fs.existsSync(path.resolve(directory, "../playwright/package.json"))
  );
assert.ok(
  binaryPath,
  "Run via npm exec --yes --package=playwright -- node tests/work-gallery.mjs"
);
const { chromium } = await import(
  pathToFileURL(path.resolve(binaryPath, "../playwright/index.mjs")).href
);

class WorkGalleryAudit {
  async run() {
    const server = spawn(process.execPath, [".output/server/index.mjs"], {
      env: { ...process.env, PORT: "3089", HOST: "127.0.0.1" },
      stdio: "ignore",
      windowsHide: true,
    });
    let browser;
    try {
      await this.waitForServer();
      browser = await chromium.launch({ channel: "chrome", headless: true });
      const company = econet;
      for (const language of ["en", "pt"]) {
        const context = await browser.newContext({
          viewport: { width: 360, height: 800 },
          reducedMotion: "reduce",
        });
        await context.addCookies([
          {
            name: "portfolio-language",
            value: language,
            url: "http://127.0.0.1:3089",
          },
        ]);
        const page = await context.newPage();
        const errors = [];
        page.on("pageerror", (error) => errors.push(error.message));
        await page.goto("http://127.0.0.1:3089/work");
        await page.waitForFunction(
          () => !!document.querySelector("#__nuxt")?.__vue_app__
        );
        assert.equal(await page.locator(".work-company-card").count(), 2);
        assert.equal(
          await page.locator(".work-company-card").first().getAttribute("href"),
          "/work/socarrao"
        );
        await page.locator('.work-company-card[href="/work/econet"]').click();
        await page.waitForURL("**/work/econet");
        assert.equal(
          await page
            .locator(".company-detail__projects > .work-project")
            .count(),
          company.projects.length
        );
        const period = await page
          .locator(".company-detail > .work-period")
          .textContent();
        assert.ok(
          period.includes(company.start) && period.includes(company.end)
        );
        await this.auditProjects(page, company.projects, language);
        await page
          .getByRole("button", {
            name: language === "en" ? "PT" : "EN",
            exact: true,
          })
          .click();
        await page.waitForFunction(
          (expected) => document.documentElement.lang === expected,
          language === "en" ? "pt-BR" : "en"
        );
        assert.ok(
          (
            await page
              .locator(".company-detail__projects > .work-project > h2")
              .first()
              .textContent()
          ).includes(
            this.localize(
              company.projects[0].name,
              language === "en" ? "pt" : "en"
            )
          )
        );
        await page.goto("http://127.0.0.1:3089/work/socarrao");
        assert.equal(
          await page
            .locator(".company-detail__projects > .work-project")
            .count(),
          socarrao.projects.length
        );
        const socarraoPeriod = await page
          .locator(".company-detail > .work-period")
          .textContent();
        assert.ok(
          socarraoPeriod.includes(socarrao.start) &&
            socarraoPeriod.includes(socarrao.end)
        );
        const selectedLanguage = language === "en" ? "pt" : "en";
        await this.auditProjects(page, socarrao.projects, selectedLanguage);
        for (const slug of [
          "aurora-studio",
          "northstar-labs",
          "not-a-company",
        ]) {
          assert.equal(
            (await page.goto(`http://127.0.0.1:3089/work/${slug}`)).status(),
            404
          );
        }
        assert.deepEqual(errors, []);
        await context.close();
        console.log(
          `${language}: Econet and SóCarrão navigation, projects, dates, ordering, galleries when available, language switch and removed-company 404s passed`
        );
      }
    } finally {
      await browser?.close();
      server.kill();
    }
  }

  localize(text, language) {
    return typeof text === "string" ? text : text[language];
  }

  async auditProjects(
    page,
    projects,
    language,
    container = page.locator(".company-detail__projects"),
    level = 2
  ) {
    assert.equal(
      await container.locator(":scope > .work-project").count(),
      projects.length
    );
    for (const project of projects) {
      const section = container.locator(`:scope > article[id="${project.id}"]`);
      assert.equal(
        await section.locator(`:scope > h${level}`).textContent(),
        this.localize(project.name, language)
      );
      assert.equal(
        await section
          .locator(":scope > .work-project__description")
          .textContent(),
        this.localize(project.description, language)
      );
      const gallery = section.locator(":scope > .work-gallery");
      if (await gallery.count()) {
        const thumbnail = gallery
          .locator(".gallery-preview__thumbnail:visible")
          .first();
        const expectedSource = await thumbnail
          .locator("img")
          .getAttribute("src");
        assert.ok(expectedSource.startsWith(`/work/${project.id}/`));
        await thumbnail.click();
        const modal = gallery.locator("dialog[open]");
        await modal.waitFor({ state: "visible" });
        assert.equal(await page.locator("dialog[open]").count(), 1);
        await page.waitForFunction(() => {
          const image = document.querySelector("dialog[open] img");
          return image?.complete && image.naturalWidth > 0;
        });
        assert.equal(
          await modal.locator("img").getAttribute("src"),
          expectedSource
        );
        if (project.images?.length) {
          await this.auditImageMetadata(
            page,
            modal,
            thumbnail,
            project,
            language
          );
        }
        await this.auditModalLayout(page, modal);
        await page.keyboard.press("Escape");
        await page.waitForFunction(
          () =>
            !document.querySelector("dialog[open]") &&
            document.body.style.overflow !== "hidden"
        );
      }
      const panel = section.locator(
        ":scope > .work-project__details > .work-subprojects"
      );
      const children = project.subprojects ?? [];
      assert.equal(await panel.count(), children.length ? 1 : 0);
      if (children.length) {
        assert.equal(await panel.getAttribute("open"), null);
        const content = panel.locator(":scope > .work-subprojects__content");
        assert.equal(await content.isVisible(), false);
        const toggle = panel.locator(":scope > summary");
        assert.equal(
          (await toggle.locator(":scope > span").first().textContent()).trim(),
          `${language === "en" ? "Details" : "Detalhes"} (${children.length})`
        );
        if (await gallery.count()) {
          assert.equal(
            await gallery.evaluate((element) =>
              element.nextElementSibling?.classList.contains(
                "work-project__details"
              )
            ),
            true
          );
        }
        await toggle.focus();
        await page.keyboard.press("Enter");
        await content.waitFor({ state: "visible" });
        await this.auditProjects(
          page,
          children,
          language,
          content,
          Math.min(level + 1, 6)
        );
        await toggle.click();
        await content.waitFor({ state: "hidden" });
      }
    }
  }

  async auditModalLayout(page, modal) {
    const initialViewport = page.viewportSize();
    for (const viewport of [
      { width: 360, height: 640 },
      { width: 844, height: 390 },
      { width: 1440, height: 300 },
      { width: 2560, height: 360 },
      { width: 1920, height: 1080 },
    ]) {
      await page.setViewportSize(viewport);
      const geometry = await modal.evaluate((element) => {
        const bounds = element.getBoundingClientRect();
        const toggle = element
          .querySelector(".gallery-caption__toggle")
          ?.getBoundingClientRect();
        const close = element
          .querySelector(".work-gallery__close")
          .getBoundingClientRect();
        const controls = element
          .querySelector(".gallery-viewer__controls")
          .getBoundingClientRect();
        const descendants = [
          element,
          element.querySelector(".gallery-viewer"),
          element.querySelector("img"),
          element.querySelector(".work-gallery__close"),
          element.querySelector(".gallery-viewer__controls"),
          ...element.querySelectorAll(
            ".gallery-caption, .gallery-caption__toggle, .gallery-caption__description"
          ),
        ];
        return {
          x: bounds.x,
          y: bounds.y,
          width: bounds.width,
          height: bounds.height,
          toggleAligned:
            !toggle ||
            (Math.abs(toggle.right - close.right) < 1 &&
              Math.abs(
                toggle.y + toggle.height / 2 - controls.y - controls.height / 2
              ) < 1),
          fits: descendants.every((child) => {
            const rect = child.getBoundingClientRect();
            return (
              rect.width > 0 &&
              rect.height > 0 &&
              rect.left >= 0 &&
              rect.top >= 0 &&
              rect.right <= window.innerWidth + 1 &&
              rect.bottom <= window.innerHeight + 1 &&
              child.scrollWidth <= child.clientWidth + 1 &&
              child.scrollHeight <= child.clientHeight + 1
            );
          }),
          imageFit: getComputedStyle(element.querySelector("img")).objectFit,
          elements: descendants.map((child) => ({
            className: child.className,
            rect: child.getBoundingClientRect().toJSON(),
            scrollWidth: child.scrollWidth,
            clientWidth: child.clientWidth,
            scrollHeight: child.scrollHeight,
            clientHeight: child.clientHeight,
          })),
        };
      });
      assert.equal(geometry.x, 0);
      assert.equal(geometry.y, 0);
      assert.equal(geometry.width, viewport.width);
      assert.equal(geometry.height, viewport.height);
      assert.equal(geometry.toggleAligned, true);
      assert.equal(
        geometry.fits,
        true,
        `Modal overflow at ${viewport.width}x${
          viewport.height
        }: ${JSON.stringify(geometry.elements)}`
      );
      assert.equal(geometry.imageFit, "contain");
    }
    await page.setViewportSize(initialViewport);
  }

  async auditImageMetadata(page, modal, thumbnail, project, language) {
    const files = fs
      .readdirSync(`public/work/${project.id}`)
      .filter((name) => /\.(avif|gif|jpe?g|png|svg|webp)$/i.test(name))
      .sort((left, right) =>
        left.localeCompare(right, "en", { numeric: true })
      );
    assert.equal(
      await thumbnail.locator("img").getAttribute("alt"),
      project.images[0].alt[language]
    );
    const caption = modal.locator(".gallery-caption__description");
    const toggle = modal.getByRole("button", {
      name: language === "en" ? "Hide description" : "Ocultar descrição",
      exact: true,
    });
    await toggle.focus();
    await page.keyboard.press("Enter");
    assert.equal(await caption.isVisible(), false);
    assert.equal(
      await modal
        .locator(".gallery-caption__toggle")
        .getAttribute("aria-expanded"),
      "false"
    );
    for (const [index, metadata] of project.images.entries()) {
      assert.equal(
        await modal.locator("img").getAttribute("src"),
        `/work/${project.id}/${encodeURIComponent(files[index])}`
      );
      assert.equal(
        await modal.locator("img").getAttribute("alt"),
        metadata.alt[language]
      );
      assert.equal(
        (await caption.textContent()).trim(),
        metadata.description[language]
      );
      assert.equal(await caption.isVisible(), false);
      assert.equal(
        await modal.locator("img").getAttribute("aria-describedby"),
        await caption.getAttribute("id")
      );
      if (files.length > 1) await page.keyboard.press("ArrowRight");
    }
    await modal
      .getByRole("button", {
        name: language === "en" ? "Show description" : "Exibir descrição",
        exact: true,
      })
      .click();
    assert.equal(await caption.isVisible(), true);
    assert.equal(
      (await caption.textContent()).trim(),
      project.images[0].description[language]
    );
    assert.equal(
      await modal
        .locator(".gallery-caption__toggle")
        .getAttribute("aria-expanded"),
      "true"
    );
  }

  async waitForServer() {
    for (let attempt = 0; attempt < 60; attempt++) {
      try {
        await fetch("http://127.0.0.1:3089");
        return;
      } catch {
        await new Promise((resolve) => setTimeout(resolve, 250));
      }
    }
    throw new Error("Production server did not start");
  }
}

await new WorkGalleryAudit().run();
