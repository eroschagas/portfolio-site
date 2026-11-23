import { SiteDiscovery } from "~/models/SiteDiscovery";

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event);
  const site = new SiteDiscovery(config.public.siteUrl);
  setHeader(event, "Content-Type", "text/plain; charset=utf-8");
  return config.public.indexable === true ||
    String(config.public.indexable) === "true"
    ? `User-agent: *\nAllow: /\n\nSitemap: ${site.url("/sitemap.xml")}\n`
    : "User-agent: *\nDisallow: /\n";
});
