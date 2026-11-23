import { SiteDiscovery } from "~/models/SiteDiscovery";

export const useLocalePath = () => {
  const { language } = usePortfolio();
  const site = new SiteDiscovery(useRuntimeConfig().public.siteUrl);
  return (path: string) => site.localizedPath(path, language.value);
};
