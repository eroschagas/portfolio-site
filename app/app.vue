<template>
  <div>
    <NuxtRouteAnnouncer />
    <SiteHeader />
    <div class="portfolio">
      <main><NuxtPage /></main>
    </div>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import SiteHeader from "~/components/layout/SiteHeader.vue";
import SiteFooter from "~/components/layout/SiteFooter.vue";
const { language } = usePortfolio();
useHead(() => ({
  htmlAttrs: { lang: language.value === "en" ? "en" : "pt-BR" },
  link: [
    {
      rel: "preload",
      href: "/fonts/dm-sans-latin.woff2",
      as: "font",
      type: "font/woff2",
      crossorigin: "anonymous",
    },
    {
      rel: "preload",
      href: "/fonts/space-grotesk-latin.woff2",
      as: "font",
      type: "font/woff2",
      crossorigin: "anonymous",
    },
  ],
}));
</script>

<style>
@import "~/assets/main.css";
</style>
