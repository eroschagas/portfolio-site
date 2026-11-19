<template>
  <article :id="props.project.getId()" class="work-project">
    <p class="eyebrow">
      {{ t.workContent.project }} /
      {{ String(props.index + 1).padStart(2, "0") }}
    </p>
    <component :is="`h${props.headingLevel}`" class="work-project__title">
      {{ props.project.getName(language) }}
    </component>
    <p class="work-project__description">
      {{ props.project.getDescription(language) }}
    </p>
    <WorkGallery
      v-if="images.length"
      :images="images"
      :image-metadata="imageMetadata"
      :title="props.project.getName(language)"
    />
    <div v-if="props.project.subprojects.length" class="work-project__details">
      <ClientOnly>
        <WorkSubprojectsPanel :count="props.project.subprojects.length">
          <WorkProjectSection
            v-for="(subproject, index) in props.project.subprojects"
            :key="subproject.getId()"
            :project="subproject"
            :index="index"
            :heading-level="Math.min(props.headingLevel + 1, 6)"
          />
        </WorkSubprojectsPanel>
        <template #fallback>
          <div class="work-project__details-placeholder" aria-hidden="true" />
        </template>
      </ClientOnly>
    </div>
  </article>
</template>

<script setup lang="ts">
import { WorkProject } from "~/models/WorkProject";
import { WorkImageCatalog } from "~/services/WorkImageCatalog";
import WorkGallery from "./WorkGallery.vue";
import WorkSubprojectsPanel from "./WorkSubprojectsPanel.vue";
const props = defineProps({
  project: { type: WorkProject, required: true },
  index: { type: Number, default: 0 },
  headingLevel: { type: Number, default: 2 },
});
const { language, t } = usePortfolio();
const config = useRuntimeConfig();
const catalog = new WorkImageCatalog(config.public.workImages);
const images = computed(() => catalog.getImages(props.project.getId()));
const imageMetadata = computed(() =>
  images.value.map((_, index) =>
    props.project.getImageMetadata(index, language.value)
  )
);
</script>

<style scoped lang="scss">
.work-project {
  min-width: 0;
  padding: 40px 0;
  border-top: 1px solid var(--border);
}
.work-project__title {
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
.work-project__details {
  margin-top: 26px;
}
.work-project__details-placeholder {
  height: 55px;
  border: 1px solid var(--border);
  border-radius: 12px;
}
@media (max-width: 767px) {
  .work-project {
    padding: 28px 0;
  }
  .work-project__description {
    font-size: 14px;
  }
  .work-project__details-placeholder {
    height: 51px;
  }
}
</style>
