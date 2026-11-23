import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import socarrao from "../app/data/work/socarrao.ts";

// Run after npm run build:
// npm exec --yes --package=playwright -- node tests/work-details.mjs
const binaryPath = (process.env.PATH ?? process.env.Path)
  .split(path.delimiter)
  .find((directory) =>
    fs.existsSync(path.resolve(directory, "../playwright/package.json")),
  );
assert.ok(binaryPath, "Run through npm exec --package=playwright.");
const { chromium } = await import(
  pathToFileURL(path.resolve(binaryPath, "../playwright/index.mjs")).href
);

class WorkDetailsAudit {
  async run() {
    const origin = "http://127.0.0.1:3092";
    const server = spawn(process.execPath, [".output/server/index.mjs"], {
      env: { ...process.env, PORT: "3092", HOST: "127.0.0.1" },
      stdio: "ignore",
      windowsHide: true,
    });
    let browser;
    try {
      await this.waitForServer(origin);
      browser = await chromium.launch({ channel: "chrome", headless: true });
      for (const language of ["en", "pt"]) {
        const context = await browser.newContext({ reducedMotion: "reduce" });
        await context.addCookies([
          { name: "portfolio-language", value: language, url: origin },
        ]);
        const errors = [];
        for (const width of [360, 767, 768, 1440, 2560]) {
          const page = await context.newPage();
          page.on("pageerror", (error) => errors.push(error.message));
          await page.setViewportSize({ width, height: 900 });
          const response = await page.goto(`${origin}/work/socarrao`);
          assert.equal(response.status(), 200);
          const html = await response.text();
          assert.ok(html.includes('<details class="work-subprojects"'));
          assert.ok(html.includes('id="socarrao-internal-users"'));
          assert.ok(html.includes('id="socarrao-website"'));
          assert.ok(html.includes('id="socarrao-private-seller-listings"'));
          assert.ok(html.includes('id="socarrao-dealership-portal"'));
          assert.ok(
            html.includes('id="socarrao-internal-management-platform"'),
          );
          assert.ok(html.includes('name="description"'));
          assert.equal(
            await page.locator("html").getAttribute("lang"),
            language === "en" ? "en" : "pt-BR",
          );
          const panel = page.locator(".work-subprojects").first();
          await panel.waitFor();
          const toggle = panel.locator(":scope > summary");
          assert.match(
            await toggle.textContent(),
            language === "en" ? /Details \(10\)/ : /Detalhes \(10\)/,
          );
          assert.equal(
            await panel
              .locator(":scope > .work-subprojects__content > .work-project")
              .count(),
            10,
          );
          assert.equal(
            await page
              .locator(".company-detail__projects > .work-project")
              .count(),
            socarrao.projects.length,
          );
          const requests = await page.evaluate(
            () =>
              performance
                .getEntriesByType("resource")
                .filter((entry) =>
                  /\/work\/socarrao-internal-(users|groups)\//.test(entry.name),
                ).length,
          );
          assert.equal(
            requests,
            0,
            `Closed details must not request subproject images (${language}, ${width}px)`,
          );
          await toggle.focus();
          await page.keyboard.press("Enter");
          await page.waitForFunction(
            () => document.querySelector(".work-subprojects").open,
          );
          assert.equal(await panel.locator(".work-project > h3").count(), 10);
          const thumbnail = panel
            .locator("#socarrao-internal-users .gallery-preview__thumbnail")
            .first();
          await thumbnail.click();
          const dialog = panel.locator(
            "#socarrao-internal-users > .work-gallery > dialog",
          );
          assert.equal(await dialog.evaluate((element) => element.open), true);
          await page.keyboard.press("Escape");
          await toggle.focus();
          await page.keyboard.press("Enter");
          assert.equal(await panel.evaluate((element) => element.open), false);
          assert.equal(
            await page.evaluate(
              () => document.documentElement.scrollWidth <= window.innerWidth,
            ),
            true,
          );
          await page.close();
        }
        assert.deepEqual(errors, []);
        await context.close();
        console.log(
          `${language}: SSR content, deferred images, keyboard expansion, gallery and responsive layout passed`,
        );
      }
    } finally {
      await browser?.close();
      server.kill();
    }
  }

  async waitForServer(origin) {
    const deadline = Date.now() + 15000;
    while (Date.now() < deadline) {
      try {
        if ((await fetch(origin)).ok) return;
      } catch {}
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    throw new Error("Server did not start");
  }
}

await new WorkDetailsAudit().run();
