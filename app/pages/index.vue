<template>
  <div><HomeHero /><HomeAbout /><HomeStack /><HomeCollections /></div>
</template>

<script setup lang="ts">
import HomeHero from "~/components/home/HomeHero.vue";
import HomeAbout from "~/components/home/HomeAbout.vue";
import HomeStack from "~/components/home/HomeStack.vue";
import HomeCollections from "~/components/home/HomeCollections.vue";
import { profile } from "~/data/profile";
const { t } = usePortfolio();
useSeoMeta({
  title: () => `${profile.name} — Portfolio`,
  description: () => t.value.intro,
});
</script>
