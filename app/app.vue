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
}));
</script>

<style>
@import "~/assets/main.css";
</style>
