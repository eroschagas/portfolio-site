<template>
  <section id="explore" class="section projects">
    <p class="eyebrow">{{ t.projectsLabel }}</p>
    <h2>{{ t.projectsTitle }}</h2>
    <div class="projects__grid">
      <NuxtLink
        v-for="(project, index) in projects"
        :key="project.path"
        :to="project.path"
        :class="['project-card', `project-card--${project.kind}`]"
        ><div class="project-card__top">
          <span>0{{ index + 1 }}</span
          ><span>↗</span>
        </div>
        <div class="project-card__art" aria-hidden="true">
          {{ project.symbol }}
        </div>
        <h3>{{ project.name }}</h3>
        <p>{{ project.description }}</p>
        <span class="project-card__link"
          >{{ t.view }} <span>→</span></span
        ></NuxtLink
      >
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = usePortfolio();
const projects = computed(() => [
  {
    path: "/ai-assisted",
    kind: "ai",
    name: t.value.header.aiAssisted,
    symbol: "✳",
    description: t.value.ai,
  },
  {
    path: "/work",
    kind: "work",
    name: t.value.header.work,
    symbol: "⌘",
    description: t.value.work,
  },
  {
    path: "/legacy",
    kind: "legacy",
    name: t.value.header.legacy,
    symbol: "</>",
    description: t.value.legacy,
  },
]);
</script>
