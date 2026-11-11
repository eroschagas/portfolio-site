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

<style scoped lang="scss">
.projects__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  margin-top: 34px;
}
@media (max-width: 767px) {
  .projects__grid {
    grid-template-columns: minmax(0, 1fr);
    margin-top: 25px;
    gap: 16px;
  }
}
</style>
