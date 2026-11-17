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
        await page.keyboard.press("Escape");
        await page.waitForFunction(
          () =>
            !document.querySelector("dialog[open]") &&
            document.body.style.overflow !== "hidden"
        );
      }
      const panel = section.locator(":scope > .work-subprojects");
      const children = project.subprojects ?? [];
      assert.equal(await panel.count(), children.length ? 1 : 0);
      if (children.length) {
        assert.equal(await panel.getAttribute("open"), null);
        const content = panel.locator(":scope > .work-subprojects__content");
        assert.equal(await content.isVisible(), false);
        const toggle = panel.locator(":scope > summary");
        assert.equal(
          (await toggle.locator(":scope > span").first().textContent()).trim(),
          `${language === "en" ? "Subprojects" : "Subprojetos"} (${
            children.length
          })`
        );
        if (await gallery.count()) {
          assert.equal(
            await gallery.evaluate((element) =>
              element.nextElementSibling?.classList.contains("work-subprojects")
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
