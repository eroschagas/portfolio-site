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
  "Run via npm exec --yes --package=playwright -- node tests/image-prefetch.mjs",
);
const { chromium } = await import(
  pathToFileURL(path.resolve(binaryPath, "../playwright/index.mjs")).href
);
const origin = "http://127.0.0.1:3094";
const server = spawn(process.execPath, [".output/server/index.mjs"], {
  env: { ...process.env, PORT: "3094", HOST: "127.0.0.1" },
  stdio: "ignore",
  windowsHide: true,
});
let browser;
try {
  const deadline = Date.now() + 10000;
  while (true) {
    try {
      assert.equal((await fetch(origin)).status, 200);
      break;
    } catch (error) {
      if (Date.now() >= deadline) throw error;
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }
  browser = await chromium.launch({ channel: "chrome", headless: true });
  for (const language of ["en", "pt"]) {
    const page = await browser.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(`${origin}/?lang=${language}`);
    const source = "/images/ai-assisted/lunera-app/home.webp";
    await page.waitForFunction(
      (source) =>
        performance
          .getEntriesByType("resource")
          .some(
            (entry) =>
              new URL(entry.name).pathname === source && entry.responseEnd > 0,
          ),
      source,
    );
    assert.equal(
      new URL(page.url()).pathname,
      "/",
      "Images load before navigating",
    );
    await page
      .locator(`.header__link[href="/ai-assisted?lang=${language}"]`)
      .click();
    await page.waitForURL(`**/ai-assisted?lang=${language}`);
    await page.waitForFunction(() => {
      const image = document.querySelector(".gallery-preview img");
      return image?.complete && image.naturalWidth > 0;
    });
    await page.locator(".gallery-preview__thumbnail").first().click();
    await page.locator("dialog[open]").waitFor();
    await page.keyboard.press("Escape");
    await page.goto(`${origin}/work?lang=${language}`);
    await page.waitForFunction(() =>
      performance
        .getEntriesByType("resource")
        .some(
          (entry) =>
            new URL(entry.name).pathname.startsWith("/images/work/") &&
            entry.responseEnd > 0,
        ),
    );
    assert.equal(
      new URL(page.url()).pathname,
      "/work",
      "Work previews load before company navigation",
    );
    assert.deepEqual(errors, []);
    await page.close();
  }
  console.log(
    "Image prefetch precedes SPA navigation in both languages; galleries still open.",
  );
} finally {
  await browser?.close();
  server.kill();
}
