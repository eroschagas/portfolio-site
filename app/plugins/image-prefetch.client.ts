import { GalleryImageLoader } from "~/services/GalleryImageLoader";
import { RouteImagePrefetcher } from "~/services/RouteImagePrefetcher";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const prefetcher = new RouteImagePrefetcher(async (path) => {
    if (path === "/ai-assisted" || path === "/legacy") {
      const { ProjectRepository } =
        await import("~/services/ProjectRepository");
      return new ProjectRepository()
        .getCollection(path.slice(1))
        .projects.flatMap((project) => project.getImages().slice(0, 3));
    }

    const companyMatch = /^\/work\/([^/]+)$/.exec(path);
    if (!companyMatch) return [];
    const { WorkRepository } = await import("~/services/WorkRepository");
    const { WorkImageCatalog } = await import("~/services/WorkImageCatalog");
    const company = new WorkRepository().findCompany(companyMatch[1]!);
    const catalog = new WorkImageCatalog(config.public.workImages);
    return (
      company?.projects.flatMap((project) =>
        catalog.getImages(project.getId()).slice(0, 3),
      ) ?? []
    );
  }, new GalleryImageLoader());

  nuxtApp.hook("link:prefetch", (to) => {
    const url = new URL(to, window.location.href);
    if (url.origin !== window.location.origin) return;
    return prefetcher.prefetch(url.pathname.replace(/\/+$/, "") || "/");
  });
});
