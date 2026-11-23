import { SiteDiscovery } from "~/models/SiteDiscovery";

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event);
  setHeader(event, "Content-Type", "application/xml; charset=utf-8");
  return new SiteDiscovery(config.public.siteUrl).sitemap(
    config.discoveryPaths,
  );
});
