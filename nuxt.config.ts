import { fileURLToPath } from "node:url";
import { WorkImageManifest } from "./build/WorkImageManifest";

const workImagesDirectory = fileURLToPath(
  new URL("./public/work", import.meta.url),
);

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  watch: [workImagesDirectory, /(?:^|[\\/])public[\\/]work(?:[\\/]|$)/],
  runtimeConfig: {
    public: {
      workImages: new WorkImageManifest(workImagesDirectory).generate(),
    },
  },
});
