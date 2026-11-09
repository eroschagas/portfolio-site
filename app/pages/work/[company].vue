<template>
  <section class="section collection company-detail">
    <NuxtLink class="text-link" to="/work">← {{ t.workContent.back }}</NuxtLink>
    <p class="eyebrow collection__label">
      {{ t.header.work }} / {{ t.workContent.projects }}
    </p>
    <h1>{{ company.getName(language) }}<span>.</span></h1>
    <p class="collection__description">
      {{ company.getDescription(language) }}
    </p>
    <WorkPeriodLabel :period="company.period" />
    <div class="company-detail__projects">
      <WorkProjectSection
        v-for="(project, index) in company.projects"
        :key="project.getId()"
        :project="project"
        :index="index"
      />
    </div>
    <p v-if="!company.projects.length" class="company-detail__empty">
      {{ t.workContent.noProjects }}
    </p>
  </section>
</template>

<script setup lang="ts">
import WorkProjectSection from "~/components/work/WorkProjectSection.vue";
import WorkPeriodLabel from "~/components/work/WorkPeriodLabel.vue";
import { WorkRepository } from "~/services/WorkRepository";
import { profile } from "~/data/profile";
const route = useRoute();
const { language, t } = usePortfolio();
const repository = new WorkRepository();
const company = computed(() => {
  const found = repository.findCompany(String(route.params.company));
  if (!found)
    throw createError({
      statusCode: 404,
      statusMessage: "Company not found",
      message: t.value.workContent.notFound,
    });
  return found;
});
useSeoMeta({
  title: () => `${company.value.getName(language.value)} — ${profile.name}`,
  description: () => company.value.getDescription(language.value),
});
</script>

<style scoped>
.company-detail h1 {
  font-size: clamp(36px, 5vw, 64px);
  letter-spacing: -2px;
  max-width: 950px;
}
.company-detail .collection__description {
  max-width: 800px;
}
.company-detail__projects {
  margin-top: 48px;
}
.company-detail__empty {
  margin-top: 40px;
  color: var(--muted);
}
@media (max-width: 767px) {
  .company-detail__projects {
    margin-top: 32px;
  }
}
</style>
