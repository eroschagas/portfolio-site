<template>
  <header class="header">
    <NuxtLink class="brand" to="/"
      >e<span>.</span
      ><small>{{ profile.name }} / {{ t.header.role }}</small></NuxtLink
    >
    <nav :aria-label="t.navigation">
      <NuxtLink to="/">{{ t.header.home }}</NuxtLink
      ><NuxtLink to="/ai-assisted">{{ t.header.aiAssisted }}</NuxtLink
      ><NuxtLink
        to="/work"
        :class="[
          'header__link',
          { 'header__link--active': route.path.startsWith('/work/') },
        ]"
        >{{ t.header.work }}</NuxtLink
      ><NuxtLink to="/legacy">{{ t.header.legacy }}</NuxtLink>
    </nav>
    <LanguageSwitch />
  </header>
</template>

<script setup lang="ts">
import { profile } from "~/data/profile";
import LanguageSwitch from "./LanguageSwitch.vue";
const { t } = usePortfolio();
const route = useRoute();
</script>
