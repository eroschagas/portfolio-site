<template>
  <div class="projects__grid">
    <ProjectCard
      v-for="(project, index) in props.collection.projects"
      :key="`${project.link}-${index}`"
      :project="project"
      :index="index"
    />
  </div>
</template>

<script setup lang="ts">
import { ProjectCollection } from "~/models/ProjectCollection";
import ProjectCard from "./ProjectCard.vue";
const props = defineProps({
  collection: { type: ProjectCollection, required: true },
});
</script>
