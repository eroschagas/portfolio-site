<template>
  <article :id="props.project.getId()" class="work-project">
    <p class="eyebrow">
      {{ t.workContent.project }} /
      {{ String(props.index + 1).padStart(2, "0") }}
    </p>
    <h2>{{ props.project.getName(language) }}</h2>
    <p class="work-project__description">
      {{ props.project.getDescription(language) }}
    </p>
    <WorkGallery
      v-if="images.length"
      :images="images"
      :title="props.project.getName(language)"
    />
  </article>
</template>

<script setup lang="ts">
import { WorkProject } from "~/models/WorkProject";
import { WorkImageCatalog } from "~/services/WorkImageCatalog";
import WorkGallery from "./WorkGallery.vue";
const props = defineProps({
  project: { type: WorkProject, required: true },
  index: { type: Number, default: 0 },
});
const { language, t } = usePortfolio();
const config = useRuntimeConfig();
const catalog = new WorkImageCatalog(config.public.workImages);
const images = computed(() =>
  catalog.getImages(props.project.getId()),
);
</script>

<style scoped>
.work-project {
  min-width: 0;
  padding: 40px 0;
  border-top: 1px solid var(--border);
}
.work-project h2 {
  margin-top: 15px;
  font-size: clamp(26px, 4vw, 36px);
}
.work-project__description {
  max-width: 800px;
  margin-top: 18px;
  font-size: 15px;
  line-height: 1.9;
  color: var(--muted);
  white-space: pre-line;
  overflow-wrap: anywhere;
}
@media (max-width: 767px) {
  .work-project {
    padding: 28px 0;
  }
  .work-project__description {
    font-size: 14px;
  }
}
</style>
