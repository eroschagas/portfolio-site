import assert from "node:assert/strict";
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
  "Run via npm exec --yes --package=playwright -- node tests/work-image-watch.mjs",
);
const { chromium } = await import(
  pathToFileURL(path.resolve(binaryPath, "../playwright/index.mjs")).href
);

class WorkImageWatchAudit {
  origin = process.env.WORK_DEV_URL ?? "http://localhost:3000";
  async run() {
    const folder = path.resolve("public/work/socarrao-private-seller-listings");
    const source = path.join(folder, "image.png");
    const temporaryImage = path.join(folder, "zz-watch-audit-temporary.png");
    assert.ok(fs.existsSync(source), "The project image must exist");
    assert.ok(
      !fs.existsSync(temporaryImage),
      "Never overwrite an existing image",
    );
    let browser;
    let ownsTemporaryImage = false;
    try {
      await this.waitForServer();
      browser = await chromium.launch({ channel: "chrome", headless: true });
      const page = await browser.newPage({
        viewport: { width: 1440, height: 1000 },
      });
      await page.goto(this.origin + "/work/socarrao", {
        timeout: 60000,
      });
      const project = page.locator("#socarrao-private-seller-listings");
      const preview = project.locator(".gallery-preview");
      await preview.waitFor();
      assert.equal(await preview.locator("img").count(), 1);
      await preview.locator("img").first().scrollIntoViewIfNeeded();
      await page.waitForFunction(() => {
        const image = document.querySelector(
          "#socarrao-private-seller-listings .gallery-preview img",
        );
        return image?.complete && image.naturalWidth > 0;
      });
      await preview.locator("button").first().click();
      assert.equal(await page.locator("dialog[open]").count(), 1);
      await page.keyboard.press("Escape");
      console.log("Existing project image is visible and opens in the modal");
      fs.copyFileSync(source, temporaryImage);
      ownsTemporaryImage = true;
      await page.waitForFunction(
        () =>
          document.querySelectorAll(
            "#socarrao-private-seller-listings .gallery-preview img",
          ).length === 2,
        { timeout: 60000 },
      );
      console.log(
        "Added image discovered automatically without a manual restart",
      );
      assert.equal(path.dirname(temporaryImage), folder);
      fs.unlinkSync(temporaryImage);
      ownsTemporaryImage = false;
      await page.waitForFunction(
        () =>
          document.querySelectorAll(
            "#socarrao-private-seller-listings .gallery-preview img",
          ).length === 1,
        { timeout: 60000 },
      );
      console.log("Removed image disappears automatically from the gallery");
    } finally {
      await browser?.close();
      if (ownsTemporaryImage) fs.unlinkSync(temporaryImage);
    }
  }

  async waitForServer() {
    for (let attempt = 0; attempt < 60; attempt++) {
      try {
        if (
          (await fetch(this.origin, { signal: AbortSignal.timeout(3000) })).ok
        )
          return;
      } catch {}
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    throw new Error(
      "Start npm run dev before running this check (or set WORK_DEV_URL).",
    );
  }
}

await new WorkImageWatchAudit().run();
