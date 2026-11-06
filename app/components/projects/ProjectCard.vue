<template>
  <article class="project-card">
    <div class="project-card__top">
      <span>{{ String(props.index + 1).padStart(2, "0") }}</span
      ><span aria-hidden="true">↗</span>
    </div>
    <h3 class="project-card__name">{{ props.project.getName(language) }}</h3>
    <p>{{ props.project.getDescription(language) }}</p>
    <div class="project-card__actions">
      <a
        class="project-card__link"
        :href="props.project.link"
        target="_blank"
        rel="noopener noreferrer"
        >{{ t.view }} ↗</a
      >
      <a
        v-if="props.project.github"
        class="project-card__link"
        :href="props.project.github"
        target="_blank"
        rel="noopener noreferrer"
        >GitHub ↗</a
      >
    </div>
  </article>
</template>

<script setup lang="ts">
import { Project } from "~/models/Project";
const props = defineProps({
  project: { type: Project, required: true },
  index: { type: Number, default: 0 },
});
const { language, t } = usePortfolio();
</script>
