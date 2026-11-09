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
  "Run via npm exec --yes --package=playwright -- node tests/language-routing.mjs",
);
const { chromium } = await import(
  pathToFileURL(path.resolve(binaryPath, "../playwright/index.mjs")).href
);

class LanguageRoutingAudit {
  origin = "http://127.0.0.1:3091";

  async run() {
    const server = spawn(process.execPath, [".output/server/index.mjs"], {
      env: { ...process.env, PORT: "3091", HOST: "127.0.0.1" },
      stdio: "ignore",
      windowsHide: true,
    });
    let browser;
    try {
      await this.waitForServer();
      const scenarios = [
        { query: "", cookie: "", expected: "en", write: true },
        { query: "", cookie: "pt", expected: "pt" },
        { query: "?lang=pt", cookie: "", expected: "pt", write: true },
        { query: "?lang=pt", cookie: "en", expected: "pt", write: true },
        { query: "?lang=en", cookie: "pt", expected: "en", write: true },
        { query: "?lang=fr", cookie: "pt", expected: "pt" },
        { query: "?lang=fr", cookie: "invalid", expected: "en", write: true },
        { query: "?lang=pt&lang=en", cookie: "pt", expected: "pt" },
      ];
      for (const route of [
        "/",
        "/ai-assisted",
        "/work",
        "/legacy",
        "/work/econet",
        "/work/socarrao",
      ]) {
        for (const scenario of scenarios) {
          const response = await fetch(this.origin + route + scenario.query, {
            headers: scenario.cookie
              ? { cookie: `portfolio-language=${scenario.cookie}` }
              : {},
          });
          assert.equal(response.status, 200);
          const html = await response.text();
          assert.match(
            html,
            new RegExp(
              `<html[^>]*lang="${scenario.expected === "pt" ? "pt-BR" : "en"}"`,
            ),
          );
          assert.ok(
            html.includes(
              scenario.expected === "pt"
                ? "Ideias bem pensadas"
                : "Thoughtful ideas",
            ),
          );
          if (scenario.write)
            assert.ok(
              response.headers
                .get("set-cookie")
                ?.includes(`portfolio-language=${scenario.expected}`),
              `${route}${scenario.query}: missing cookie`,
            );
        }
      }
      console.log("48 server-rendered language and cookie scenarios passed");
      browser = await chromium.launch({ channel: "chrome", headless: true });
      const context = await browser.newContext();
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (/hydration/i.test(message.text())) errors.push(message.text());
      });
      await page.goto(this.origin);
      await this.assertLanguage(page, context, "en");
      await page.goto(this.origin + "/work?lang=pt&source=share#details");
      await this.assertLanguage(page, context, "pt");
      await page.getByRole("button", { name: "EN", exact: true }).click();
      await page.waitForURL((url) => url.searchParams.get("lang") === "en");
      assert.equal(new URL(page.url()).searchParams.get("source"), "share");
      assert.equal(new URL(page.url()).hash, "#details");
      await this.assertLanguage(page, context, "en");
      await page.reload();
      await this.assertLanguage(page, context, "en");
      // Exercise global middleware on a client-side route change with a query.
      await page.evaluate(async () => {
        await document
          .querySelector("#__nuxt")
          .__vue_app__.config.globalProperties.$router.push("/legacy?lang=pt");
      });
      await this.assertLanguage(page, context, "pt");
      assert.ok((await page.title()).startsWith("Legado"));
      await page.locator('.header nav a[href="/work"]').click();
      await page.waitForURL((url) => url.pathname === "/work" && !url.search);
      await this.assertLanguage(page, context, "pt");
      await page.getByRole("button", { name: "EN", exact: true }).click();
      await this.assertLanguage(page, context, "en");
      assert.equal(new URL(page.url()).search, "");
      await page.reload();
      await this.assertLanguage(page, context, "en");
      assert.deepEqual(errors, []);
      await context.close();
      console.log(
        "Browser checks passed: initial cookie, URL override, switch, query/hash preservation, reload, client navigation and hydration",
      );
    } finally {
      await browser?.close();
      server.kill();
    }
  }

  async assertLanguage(page, context, language) {
    await page.waitForFunction(
      (expected) => document.documentElement.lang === expected,
      language === "pt" ? "pt-BR" : "en",
    );
    await page.waitForFunction(
      (expected) => document.cookie.includes(`portfolio-language=${expected}`),
      language,
    );
    assert.equal(
      (await context.cookies()).find(
        (cookie) => cookie.name === "portfolio-language",
      )?.value,
      language,
    );
    assert.equal(
      await page
        .getByRole("button", { name: language.toUpperCase(), exact: true })
        .getAttribute("aria-pressed"),
      "true",
    );
  }

  async waitForServer() {
    for (let attempt = 0; attempt < 60; attempt++) {
      try {
        await fetch(this.origin);
        return;
      } catch {
        await new Promise((resolve) => setTimeout(resolve, 250));
      }
    }
    throw new Error("Production server did not start");
  }
}

await new LanguageRoutingAudit().run();
