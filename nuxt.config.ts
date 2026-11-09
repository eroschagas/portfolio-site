import { fileURLToPath } from "node:url";
import { WorkImageManifest } from "./build/WorkImageManifest";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      workImages: new WorkImageManifest(
        fileURLToPath(new URL("./public/work", import.meta.url)),
      ).generate(),
    },
  },
});
