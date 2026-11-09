<template>
  <section class="section collection">
    <NuxtLink class="text-link" to="/">← {{ t.back }}</NuxtLink>
    <p class="eyebrow collection__label">
      {{ t.collection }} / {{ category.number }}
    </p>
    <h1>{{ category.name }}<span>.</span></h1>
    <p class="collection__description">{{ category.description }}</p>
    <WorkCompanyGrid v-if="route.params.collection === 'work'" />
    <ProjectGrid
      v-else-if="!projectCollection.isEmpty"
      :collection="projectCollection"
    />
    <div v-else class="collection__empty">
      <span class="collection__symbol" aria-hidden="true">{{
        category.symbol
      }}</span>
      <p class="eyebrow">{{ t.status }}</p>
      <h2>{{ t.emptyTitle }}</h2>
      <p>{{ category.empty }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import ProjectGrid from "~/components/projects/ProjectGrid.vue";
import WorkCompanyGrid from "~/components/work/WorkCompanyGrid.vue";
import { ProjectRepository } from "~/services/ProjectRepository";
import { profile } from "~/data/profile";
const route = useRoute();
const repository = new ProjectRepository();
const projectCollection = computed(() =>
  repository.getCollection(String(route.params.collection)),
);
const { t } = usePortfolio();
definePageMeta({
  validate: (route) =>
    ["ai-assisted", "work", "legacy"].includes(String(route.params.collection)),
});
const category = computed(() => {
  const categories = {
    "ai-assisted": {
      name: "AI Assisted",
      number: "01",
      symbol: "✳",
      description: t.value.ai,
      empty: t.value.empty,
    },
    work: {
      name: "Work",
      number: "02",
      symbol: "⌘",
      description: t.value.work,
      empty: t.value.emptyWork,
    },
    legacy: {
      name: "Legacy",
      number: "03",
      symbol: "</>",
      description: t.value.legacy,
      empty: t.value.emptyLegacy,
    },
  };
  return (
    categories[route.params.collection as keyof typeof categories] ||
    categories["ai-assisted"]
  );
});
useSeoMeta({
  title: () => `${category.value.name} — ${profile.name}`,
  description: () => category.value.description,
});
</script>
