<template>
  <NuxtLink
    class="project-card work-company-card"
    :to="`/work/${props.company.slug}`"
  >
    <div class="project-card__top">
      <span>{{ String(props.index + 1).padStart(2, "0") }}</span
      ><span aria-hidden="true">↗</span>
    </div>
    <h2>{{ props.company.getName(language) }}</h2>
    <WorkPeriodLabel :period="props.company.period" />
    <p>{{ props.company.getDescription(language) }}</p>
    <span class="work-company-card__count"
      >{{ props.company.projects.length }} {{ t.workContent.projects }}</span
    >
    <span class="project-card__link"
      >{{ t.workContent.viewProjects }} <span aria-hidden="true">→</span></span
    >
  </NuxtLink>
</template>

<script setup lang="ts">
import { WorkCompany } from "~/models/WorkCompany";
import WorkPeriodLabel from "./WorkPeriodLabel.vue";
const props = defineProps({
  company: { type: WorkCompany, required: true },
  index: { type: Number, default: 0 },
});
const { language, t } = usePortfolio();
</script>

<style scoped>
.work-company-card h2 {
  margin-top: 28px;
  font-size: 27px;
  letter-spacing: -0.8px;
}
.work-company-card p {
  max-width: none;
}
.work-company-card__count {
  margin-top: auto;
  padding-top: 24px;
  color: var(--muted);
  font-size: 12px;
}
</style>
