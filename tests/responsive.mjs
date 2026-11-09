import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

// Run after npm run build:
// npm exec --yes --package=playwright -- node tests/responsive.mjs
const binaryPath = (process.env.PATH ?? process.env.Path)
  .split(path.delimiter)
  .find((directory) =>
    fs.existsSync(path.resolve(directory, "../playwright/package.json")),
  );
assert.ok(binaryPath, "Run this script through npm exec --package=playwright.");
const { chromium } = await import(
  pathToFileURL(path.resolve(binaryPath, "../playwright/index.mjs")).href
);

class ResponsiveAudit {
  failures = [];

  async run() {
    const server = spawn(process.execPath, [".output/server/index.mjs"], {
      env: { ...process.env, PORT: "3088", HOST: "127.0.0.1" },
      stdio: "ignore",
      windowsHide: true,
    });
    let browser;
    try {
      await this.waitForServer();
      browser = await chromium.launch({ channel: "chrome", headless: true });
      for (const language of ["en", "pt"]) {
        const context = await browser.newContext({ reducedMotion: "reduce" });
        await context.addCookies([
          {
            name: "portfolio-language",
            value: language,
            url: "http://127.0.0.1:3088",
          },
        ]);
        const page = await context.newPage();
        page.on("pageerror", (error) =>
          this.failures.push({ language, error: error.message }),
        );
        for (const width of [
          360, 375, 390, 414, 540, 767, 768, 820, 1024, 1440, 1920,
        ]) {
          await page.setViewportSize({ width, height: 844 });
          for (const route of [
            "/",
            "/ai-assisted",
            "/work",
            "/legacy",
            "/work/econet",
            "/work/socarrao",
          ]) {
            await page.goto(`http://127.0.0.1:3088${route}`);
            await page.evaluate(() => document.fonts.ready);
            const result = await page.evaluate(() => {
              const width = document.documentElement.clientWidth;
              const header = document
                .querySelector(".header")
                .getBoundingClientRect();
              const main = document
                .querySelector("main")
                .getBoundingClientRect();
              const overflow = [
                ...document.querySelectorAll("main *, .header, .footer *"),
              ]
                .filter((element) => {
                  const rect = element.getBoundingClientRect();
                  return (
                    rect.width > 0 && (rect.right > width + 1 || rect.left < -1)
                  );
                })
                .map((element) => element.className || element.tagName);
              return {
                width,
                scrollWidth: document.documentElement.scrollWidth,
                overflow,
                headerBottom: header.bottom,
                mainTop: main.top,
              };
            });
            if (
              result.scrollWidth > width ||
              result.overflow.length ||
              result.mainTop < result.headerBottom - 1
            ) {
              this.failures.push({ language, width, route, ...result });
            }
            await page.evaluate(() => window.scrollTo(0, 500));
            assert.equal(
              await page
                .locator(".header")
                .evaluate((element) => element.getBoundingClientRect().top),
              0,
            );
            if (
              width === 360 &&
              language === "pt" &&
              route === "/" &&
              process.env.RESPONSIVE_SCREENSHOT
            ) {
              await page.evaluate(() => window.scrollTo(0, 0));
              await page.screenshot({
                path: process.env.RESPONSIVE_SCREENSHOT,
                fullPage: true,
              });
            }
          }
        }
        await context.close();
      }
      if (this.failures.length) {
        console.error(JSON.stringify(this.failures, null, 2));
        process.exitCode = 1;
      } else {
        console.log(
          "132 responsive checks passed: 6 routes, 11 widths (360–1920px), both languages; fixed header, no horizontal overflow or runtime errors.",
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
        await fetch("http://127.0.0.1:3088");
        return;
      } catch {
        await new Promise((resolve) => setTimeout(resolve, 250));
      }
    }
    throw new Error("Production server did not start.");
  }
}

await new ResponsiveAudit().run();
