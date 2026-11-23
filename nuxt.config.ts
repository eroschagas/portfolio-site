import { fileURLToPath } from "node:url";
import { readdirSync } from "node:fs";
import { WorkImageManifest } from "./build/WorkImageManifest";

const workImagesDirectory = fileURLToPath(
  new URL("./public/work", import.meta.url),
);
const discoveryPaths = [
  "/",
  "/ai-assisted",
  "/work",
  "/legacy",
  ...readdirSync(fileURLToPath(new URL("./app/data/work", import.meta.url)))
    .filter((file) => file.endsWith(".ts"))
    .map((file) => `/work/${file.slice(0, -3)}`),
];

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/main.scss"],
  watch: [workImagesDirectory, /(?:^|[\\/])public[\\/]work(?:[\\/]|$)/],
  runtimeConfig: {
    discoveryPaths,
    public: {
      siteUrl: "https://eros-chagas.netlify.app",
      indexable: process.env.CONTEXT
        ? process.env.CONTEXT === "production"
        : process.env.NODE_ENV === "production",
      workImages: new WorkImageManifest(workImagesDirectory).generate(),
    },
  },
});
