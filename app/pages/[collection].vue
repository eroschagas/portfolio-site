<template>
  <section class="section collection">
    <NuxtLink class="text-link" :to="localePath('/')">← {{ t.back }}</NuxtLink>
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
    <CollectionEmpty
      v-else
      :symbol="category.symbol"
      :description="category.empty"
    />
  </section>
</template>

<script setup lang="ts">
import CollectionEmpty from "~/components/projects/CollectionEmpty.vue";
import ProjectGrid from "~/components/projects/ProjectGrid.vue";
import WorkCompanyGrid from "~/components/work/WorkCompanyGrid.vue";
import { ProjectRepository } from "~/services/ProjectRepository";
import { profile } from "~/data/profile";
import { WorkRepository } from "~/services/WorkRepository";
import { SeoProjectMapper } from "~/services/SeoProjectMapper";
import { SiteDiscovery } from "~/models/SiteDiscovery";
const localePath = useLocalePath();
const seoMapper = new SeoProjectMapper(
  new SiteDiscovery(useRuntimeConfig().public.siteUrl),
);
const route = useRoute();
const repository = new ProjectRepository();
const projectCollection = computed(() =>
  repository.getCollection(String(route.params.collection)),
);
const { t, language } = usePortfolio();
definePageMeta({
  validate: (route) =>
    ["ai-assisted", "work", "legacy"].includes(String(route.params.collection)),
});
const { categories } = useCollections();
const category = computed(
  () =>
    categories.value.find((item) => item.slug === route.params.collection) ??
    categories.value[0]!,
);
usePageSeo({
  type: "CollectionPage",
  title: () => `${category.value.name} — ${profile.name}`,
  description: () => category.value.description,
  items: () =>
    route.params.collection === "work"
      ? seoMapper.companies(new WorkRepository().getCompanies(), language.value)
      : seoMapper.projects(projectCollection.value, language.value),
});
</script>

<style scoped lang="scss">
@use "~/assets/styles/collection";
@include collection.layout;
</style>
