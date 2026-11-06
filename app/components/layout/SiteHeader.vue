<template>
  <header class="header">
    <NuxtLink class="brand" to="/"
      >e<span>.</span><small>{{ profile.name }} / dev</small></NuxtLink
    >
    <nav :aria-label="t.navigation">
      <NuxtLink to="/">Home</NuxtLink
      ><NuxtLink to="/ai-assisted">AI Assisted</NuxtLink
      ><NuxtLink to="/work">Work</NuxtLink
      ><NuxtLink to="/legacy">Legacy</NuxtLink>
    </nav>
    <LanguageSwitch />
  </header>
</template>

<script setup lang="ts">
import { profile } from "~/data/profile";
import LanguageSwitch from "./LanguageSwitch.vue";
const { t } = usePortfolio();
</script>
