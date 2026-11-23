import assert from "node:assert/strict";
import test from "node:test";
import { SiteDiscovery } from "../app/models/SiteDiscovery.ts";

test("localized URLs preserve a single central origin and normalize trailing slashes", () => {
  const site = new SiteDiscovery("https://portfolio.example/");
  assert.equal(
    site.url("/work/", "pt"),
    "https://portfolio.example/work?lang=pt",
  );
  assert.equal(site.url("/", "en"), "https://portfolio.example/?lang=en");
  [
    "javascript:alert(1)",
    "https://portfolio.example/subpath",
    "https://user:pass@portfolio.example",
    "https://portfolio.example/?a=1",
  ].forEach((origin) => assert.throws(() => new SiteDiscovery(origin)));
});

test("sitemap contains both self-referencing languages and reciprocal alternates without invented dates", () => {
  const sitemap = new SiteDiscovery("https://portfolio.example").sitemap(["/"]);
  assert.equal((sitemap.match(/<url>/g) ?? []).length, 2);
  assert.equal((sitemap.match(/hreflang="pt-BR"/g) ?? []).length, 2);
  assert.equal((sitemap.match(/hreflang="x-default"/g) ?? []).length, 2);
  assert.ok(!sitemap.includes("lastmod"));
});
