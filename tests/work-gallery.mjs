import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const binaryPath = (process.env.PATH ?? process.env.Path)
  .split(path.delimiter)
  .find((directory) =>
    fs.existsSync(path.resolve(directory, "../playwright/package.json")),
  );
assert.ok(
  binaryPath,
  "Run via npm exec --yes --package=playwright -- node tests/work-gallery.mjs",
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
      const company = JSON.parse(
        fs.readFileSync("app/data/work/econet.json", "utf8"),
      );
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
          () => !!document.querySelector("#__nuxt")?.__vue_app__,
        );
        assert.equal(await page.locator(".work-company-card").count(), 1);
        await page.locator('.work-company-card[href="/work/econet"]').click();
        await page.waitForURL("**/work/econet");
        assert.equal(
          await page.locator(".work-project").count(),
          company.projects.length,
        );
        const period = await page
          .locator(".company-detail > .work-period")
          .textContent();
        assert.ok(
          period.includes(company.start) && period.includes(company.end),
        );
        for (const project of company.projects) {
          const section = page.locator(`#${project.id}`);
          assert.equal(
            await section.locator("h2").textContent(),
            typeof project.name === "string"
              ? project.name
              : project.name[language],
          );
          const gallery = section.locator(".work-gallery");
          if (await gallery.count()) {
            await gallery
              .locator(".gallery-preview__thumbnail:visible")
              .first()
              .click();
            const modal = page.locator("dialog[open]");
            assert.equal(await modal.count(), 1);
            assert.equal(
              await modal
                .locator("img")
                .evaluate((image) => image.complete && image.naturalWidth > 0),
              true,
            );
            await page.keyboard.press("Escape");
            await page.waitForFunction(
              () =>
                !document.querySelector("dialog[open]") &&
                document.body.style.overflow !== "hidden",
            );
          } else {
            assert.equal(await section.locator("img").count(), 0);
          }
        }
        await page
          .getByRole("button", {
            name: language === "en" ? "PT" : "EN",
            exact: true,
          })
          .click();
        await page.waitForFunction(
          (expected) => document.documentElement.lang === expected,
          language === "en" ? "pt-BR" : "en",
        );
        assert.ok(
          (
            await page.locator(".work-project h2").first().textContent()
          ).includes(company.projects[0].name[language === "en" ? "pt" : "en"]),
        );
        for (const slug of [
          "aurora-studio",
          "northstar-labs",
          "not-a-company",
        ]) {
          assert.equal(
            (await page.goto(`http://127.0.0.1:3089/work/${slug}`)).status(),
            404,
          );
        }
        assert.deepEqual(errors, []);
        await context.close();
        console.log(
          `${language}: Econet navigation, projects, dates, galleries when available, language switch and removed-company 404s passed`,
        );
      }
    } finally {
      await browser?.close();
      server.kill();
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
