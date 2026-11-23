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
  "Run via npm exec --yes --package=playwright -- node tests/seo.mjs",
);
const { chromium } = await import(
  pathToFileURL(path.resolve(binaryPath, "../playwright/index.mjs")).href
);

class SeoAudit {
  origin = "http://127.0.0.1:3093";
  production = "https://eros-chagas.netlify.app";

  async start(indexable) {
    const server = spawn(process.execPath, [".output/server/index.mjs"], {
      env: {
        ...process.env,
        PORT: "3093",
        HOST: "127.0.0.1",
        NUXT_PUBLIC_INDEXABLE: String(indexable),
      },
      stdio: "ignore",
      windowsHide: true,
    });
    await Promise.race([
      this.waitForServer(),
      new Promise((_, reject) => server.once("error", reject)),
    ]);
    return server;
  }

  async waitForServer() {
    const deadline = Date.now() + 15000;
    while (Date.now() < deadline) {
      try {
        if ((await fetch(this.origin)).ok) return;
      } catch {}
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
    throw Error("Server failed to start");
  }

  async run() {
    let server = await this.start(true);
    const browser = await chromium.launch({
      channel: "chrome",
      headless: true,
    });
    const page = await browser.newPage({
      viewport: { width: 1200, height: 630 },
      reducedMotion: "reduce",
    });
    try {
      if (process.argv.includes("--capture-social")) {
        fs.mkdirSync("public/social", { recursive: true });
        for (const language of ["en", "pt"]) {
          await page.goto(this.origin + "/?lang=" + language);
          await page.evaluate(() => document.fonts.ready);
          await page.screenshot({
            path: `public/social/portfolio-${language}.png`,
            animations: "disabled",
          });
        }
      }
      const xml = await (await fetch(this.origin + "/sitemap.xml")).text();
      const urls = await page.evaluate((source) => {
        const document = new DOMParser().parseFromString(
          source,
          "application/xml",
        );
        if (document.querySelector("parsererror"))
          throw Error("Invalid sitemap XML");
        return [...document.querySelectorAll("url")].map((entry) => ({
          loc: entry.querySelector("loc").textContent,
          alternates: [
            ...entry.getElementsByTagNameNS(
              "http://www.w3.org/1999/xhtml",
              "link",
            ),
          ].map((link) => ({
            lang: link.getAttribute("hreflang"),
            href: link.getAttribute("href"),
          })),
        }));
      }, xml);
      assert.equal(
        urls.length,
        2 *
          (4 +
            fs
              .readdirSync("app/data/work")
              .filter((file) => file.endsWith(".ts")).length),
      );
      const titles = new Set();
      const descriptions = new Set();
      for (const entry of urls) {
        const target = new URL(entry.loc);
        assert.equal(target.origin, this.production);
        assert.deepEqual(
          entry.alternates.map((alternate) => alternate.lang),
          ["en", "pt-BR", "x-default"],
        );
        const language = target.searchParams.get("lang");
        const response = await fetch(
          this.origin + target.pathname + target.search,
          {
            headers: {
              cookie: `portfolio-language=${language === "en" ? "pt" : "en"}`,
            },
          },
        );
        assert.equal(response.status, 200, entry.loc);
        const html = await response.text();
        const data = await page.evaluate((source) => {
          const document = new DOMParser().parseFromString(source, "text/html");
          const meta = (name) =>
            document
              .querySelector(`meta[name="${name}"], meta[property="${name}"]`)
              ?.getAttribute("content");
          return {
            language: document.documentElement.lang,
            title: document.title,
            description: meta("description"),
            canonical: document
              .querySelector('link[rel="canonical"]')
              ?.getAttribute("href"),
            alternates: [...document.querySelectorAll("link[hreflang]")].map(
              (link) => ({
                lang: link.getAttribute("hreflang"),
                href: link.getAttribute("href"),
              }),
            ),
            robots: meta("robots"),
            ogUrl: meta("og:url"),
            ogTitle: meta("og:title"),
            image: meta("og:image"),
            imageAlt: meta("og:image:alt"),
            imageWidth: meta("og:image:width"),
            imageHeight: meta("og:image:height"),
            card: meta("twitter:card"),
            headings: document.querySelectorAll("h1").length,
            graph: JSON.parse(
              document.querySelector('script[type="application/ld+json"]')
                .textContent,
            ),
            links: [...document.querySelectorAll(".header__nav a")].map(
              (link) => link.getAttribute("href"),
            ),
            details: document.querySelectorAll("details .work-project").length,
          };
        }, html);
        assert.equal(data.language, language === "en" ? "en" : "pt-BR");
        assert.equal(data.canonical, entry.loc);
        assert.deepEqual(data.alternates, entry.alternates);
        assert.equal(data.ogUrl, entry.loc);
        assert.equal(data.ogTitle, data.title);
        assert.match(data.robots, /^index,/);
        assert.equal(data.headings, 1);
        assert.ok(
          data.description && !descriptions.has(data.description),
          "Unique description",
        );
        assert.ok(
          data.title && !titles.has(data.title),
          `Unique title: ${entry.loc}: ${data.title}`,
        );
        descriptions.add(data.description);
        titles.add(data.title);
        assert.equal(data.card, "summary_large_image");
        assert.equal(data.imageWidth, "1200");
        assert.equal(data.imageHeight, "630");
        assert.ok(data.imageAlt);
        assert.ok(fs.existsSync("public" + new URL(data.image).pathname));
        if (!process.argv.includes("--capture-social")) {
          const imageResponse = await fetch(
            this.origin + new URL(data.image).pathname,
          );
          assert.equal(imageResponse.status, 200);
          assert.match(imageResponse.headers.get("content-type"), /image\/png/);
        }
        assert.equal(data.graph["@context"], "https://schema.org");
        assert.equal(data.graph["@graph"][2].url, entry.loc);
        assert.ok(
          data.links.every((link) => link.endsWith(`?lang=${language}`)),
        );
        if (target.pathname === "/work/socarrao")
          assert.ok(data.details > 0, "Subprojects must be in SSR HTML");
      }
      const robots = await (await fetch(this.origin + "/robots.txt")).text();
      assert.match(robots, /Allow: \/\n/);
      assert.ok(robots.includes(this.production + "/sitemap.xml"));
      const llms = await (await fetch(this.origin + "/llms.txt")).text();
      urls.forEach(({ loc }) => assert.ok(llms.includes(loc)));
      for (const missing of ["/missing-page", "/work/missing-company"])
        assert.equal((await fetch(this.origin + missing)).status, 404);
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (/hydration/i.test(message.text())) errors.push(message.text());
      });
      await page.goto(this.origin + "/?lang=en");
      await page.getByRole("link", { name: "PT", exact: true }).click();
      await page.waitForURL("**/?lang=pt");
      await page.locator('.header__nav a[href="/ai-assisted?lang=pt"]').click();
      await page.waitForURL("**/ai-assisted?lang=pt");
      assert.equal(await page.locator("html").getAttribute("lang"), "pt-BR");
      assert.equal(
        await page.locator('link[rel="canonical"]').getAttribute("href"),
        this.production + "/ai-assisted?lang=pt",
      );
      const redirect = await fetch(this.origin + "/work/?lang=pt", {
        redirect: "manual",
      });
      assert.equal(redirect.status, 308);
      assert.equal(redirect.headers.get("location"), "/work?lang=pt");
      assert.deepEqual(errors, []);
      await new Promise((resolve) => {
        server.once("exit", resolve);
        server.kill();
      });
      server = await this.start(false);
      const preview = await fetch(this.origin + "/?lang=en");
      assert.match(preview.headers.get("x-robots-tag"), /noindex/);
      assert.match(await preview.text(), /content="noindex, nofollow"/);
      assert.match(
        await (await fetch(this.origin + "/robots.txt")).text(),
        /Disallow: \/\n/,
      );
      console.log(
        `${urls.length} localized SSR pages passed: metadata, canonical, hreflang, JSON-LD, sitemap, robots, llms, social images, 404s, subprojects, client navigation and preview noindex.`,
      );
    } finally {
      await browser.close();
      server.kill();
    }
  }
}

await new SeoAudit().run();
