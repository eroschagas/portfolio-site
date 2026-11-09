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
        assert.equal(await page.locator(".work-company-card").count(), 3);
        assert.ok(
          (
            await page
              .locator(".work-company-card")
              .first()
              .getAttribute("href")
          ).endsWith("/northstar-labs"),
        );
        assert.ok(
          (
            await page
              .locator(".work-company-card")
              .first()
              .locator(".work-period")
              .textContent()
          ).includes(language === "en" ? "Present" : "Atual"),
        );
        await page
          .locator('.work-company-card[href="/work/aurora-studio"]')
          .click();
        await page.waitForURL("**/work/aurora-studio");
        assert.ok(
          (
            await page.locator(".company-detail > .work-period").textContent()
          ).includes("12/2024"),
        );
        assert.equal(await page.locator(".work-project").count(), 2);
        assert.equal(await page.locator(".work-gallery").count(), 1);
        if (process.env.WORK_SCREENSHOT_DIR) {
          fs.mkdirSync(process.env.WORK_SCREENSHOT_DIR, { recursive: true });
          await page.screenshot({
            path: path.join(
              process.env.WORK_SCREENSHOT_DIR,
              `work-${language}.png`,
            ),
            fullPage: true,
          });
        }
        const inline = page.locator(".gallery-preview");
        const thumbnails = inline.locator(
          ".gallery-preview__thumbnail:visible",
        );
        const more = inline.locator(".gallery-preview__more:visible");
        const modal = page.locator("dialog[open]");
        for (const [width, visibleCount] of [
          [360, 1],
          [768, 2],
          [1440, 3],
        ]) {
          await page.setViewportSize({ width, height: 800 });
          assert.equal(await thumbnails.count(), visibleCount);
          assert.equal(await more.count(), 1);
          assert.equal(
            await more.locator(".gallery-preview__number").textContent(),
            `+${4 - visibleCount}`,
          );
          assert.equal(
            await page.locator(".work-gallery > .gallery-viewer").count(),
            0,
          );
          await thumbnails.last().click();
          assert.ok(
            (await modal.locator("img").getAttribute("src")).includes(
              `0${visibleCount}-`,
            ),
          );
          await page.keyboard.press("Escape");
          await more.click();
          assert.ok(
            (await modal.locator("img").getAttribute("src")).includes(
              `0${visibleCount + 1}-`,
            ),
          );
          await page.keyboard.press("Escape");
        }
        await page.setViewportSize({ width: 360, height: 800 });
        const original = await thumbnails
          .first()
          .locator("img")
          .getAttribute("src");
        await thumbnails.first().click();
        assert.equal(await modal.count(), 1);
        if (process.env.WORK_SCREENSHOT_DIR) {
          await page.screenshot({
            path: path.join(
              process.env.WORK_SCREENSHOT_DIR,
              `work-modal-${language}.png`,
            ),
          });
        }
        assert.equal(await modal.locator("img").getAttribute("src"), original);
        assert.equal(
          await page.evaluate(() => document.body.style.overflow),
          "hidden",
        );
        await page.keyboard.press("ArrowRight");
        assert.ok(
          (await modal.locator("img").getAttribute("src")).includes(
            "02-reports",
          ),
        );
        await page.keyboard.press("ArrowLeft");
        assert.equal(await modal.locator("img").getAttribute("src"), original);
        await page.keyboard.press("Tab");
        assert.equal(
          await page.evaluate(() => !!document.activeElement.closest("dialog")),
          true,
        );
        await page.keyboard.press("Escape");
        await page.waitForFunction(
          () =>
            !document.querySelector("dialog[open]") &&
            document.body.style.overflow !== "hidden",
        );
        assert.equal(
          await page.evaluate(() =>
            document.activeElement.classList.contains(
              "gallery-preview__thumbnail",
            ),
          ),
          true,
        );
        await thumbnails.first().click();
        await modal.locator(".work-gallery__close").click();
        await page.waitForFunction(
          () => !document.querySelector("dialog[open]"),
        );
        await thumbnails.first().click();
        await modal.locator(".gallery-viewer").evaluate((element) => {
          const start = new Touch({
            identifier: 1,
            target: element,
            clientX: 250,
            clientY: 250,
          });
          const end = new Touch({
            identifier: 1,
            target: element,
            clientX: 100,
            clientY: 255,
          });
          element.dispatchEvent(
            new TouchEvent("touchstart", { touches: [start], bubbles: true }),
          );
          element.dispatchEvent(
            new TouchEvent("touchend", {
              changedTouches: [end],
              bubbles: true,
            }),
          );
        });
        assert.ok(
          (await modal.locator("img").getAttribute("src")).includes(
            "02-reports",
          ),
        );
        await page.mouse.click(2, 2);
        await page.waitForFunction(
          () => !document.querySelector("dialog[open]"),
        );
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
          (await page.title()).includes(
            language === "en" ? "Empresa fictícia" : "Demo company",
          ),
        );
        await page.goto("http://127.0.0.1:3089/work/northstar-labs");
        assert.ok(
          (
            await page.locator(".company-detail > .work-period").textContent()
          ).includes(language === "en" ? "Atual" : "Present"),
        );
        assert.equal(await page.locator(".work-gallery").count(), 1);
        assert.equal(await page.locator(".gallery-viewer__arrow").count(), 0);
        assert.equal(
          await page.locator("#operations-platform .work-gallery").count(),
          0,
        );
        assert.equal(
          await page
            .locator("img")
            .first()
            .evaluate((image) => image.complete && image.naturalWidth > 0),
          true,
        );
        assert.equal(
          await page.locator(".gallery-preview__thumbnail:visible").count(),
          1,
        );
        assert.equal(
          await page.locator(".gallery-preview__more:visible").count(),
          0,
        );
        await page.locator(".gallery-preview__thumbnail").click();
        assert.equal(await page.locator("dialog[open]").count(), 1);
        await page.keyboard.press("Escape");
        await page.goto("http://127.0.0.1:3089/work/econet");
        assert.equal(await page.locator(".work-project").count(), 12);
        assert.equal(await page.locator(".work-gallery").count(), 0);
        assert.ok(
          (
            await page.locator(".company-detail > .work-period").textContent()
          ).includes("07/2022"),
        );
        assert.ok(
          (
            await page.locator(".company-detail > .work-period").textContent()
          ).includes("08/2024"),
        );
        const missing = await page.goto(
          "http://127.0.0.1:3089/work/not-a-company",
        );
        assert.equal(missing.status(), 404);
        assert.deepEqual(errors, []);
        await context.close();
        console.log(
          `${language}: company navigation, image navigation, modal, keyboard, focus, language switch, single/missing/empty galleries and 404 passed`,
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
