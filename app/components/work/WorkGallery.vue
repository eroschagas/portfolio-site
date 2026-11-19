<template>
  <div v-if="props.images.length" class="work-gallery">
    <GalleryPreview
      :images="props.images"
      :image-metadata="props.imageMetadata"
      :title="props.title"
      @open="open"
    />
    <dialog
      ref="dialog"
      class="work-gallery__modal"
      :aria-label="`${t.workContent.gallery}: ${props.title}`"
      @close="onClose"
      @click="onBackdropClick"
      @keydown.left.prevent="carousel.previous()"
      @keydown.right.prevent="carousel.next()"
    >
      <div class="work-gallery__heading">
        <h3>{{ props.title }}</h3>
        <button
          type="button"
          class="work-gallery__close"
          :aria-label="t.workContent.close"
          autofocus
          @click="close"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            aria-hidden="true"
            focusable="false"
          >
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
      <GalleryViewer
        v-if="isOpen"
        :images="props.images"
        :image-metadata="props.imageMetadata"
        :title="props.title"
        :index="carousel.index"
        expanded
        @previous="carousel.previous()"
        @next="carousel.next()"
      />
    </dialog>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { WorkImageMetadata } from "~/models/WorkProject";
import { useGalleryDialog } from "~/composables/useGalleryDialog";
import GalleryViewer from "./GalleryViewer.vue";
import GalleryPreview from "./GalleryPreview.vue";
const props = defineProps({
  images: { type: Array as PropType<string[]>, required: true },
  imageMetadata: {
    type: Array as PropType<WorkImageMetadata[]>,
    default: () => [],
  },
  title: { type: String, required: true },
});
const { t } = usePortfolio();
const { carousel, dialog, isOpen, open, close, onClose, onBackdropClick } =
  useGalleryDialog(() => props.images);
</script>

<style scoped lang="scss">
.work-gallery {
  margin-top: 26px;
  min-width: 0;
}
.work-gallery__modal {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100dvh;
  max-width: none;
  max-height: none;
  margin: 0;
  padding: max(8px, env(safe-area-inset-top))
    max(12px, env(safe-area-inset-right)) max(8px, env(safe-area-inset-bottom))
    max(12px, env(safe-area-inset-left));
  border: 0;
  border-radius: 0;
  overflow: hidden;
  background: var(--bg);
  color: var(--text);
  overscroll-behavior: contain;

  &[open] {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto minmax(0, 1fr);
    gap: 8px;
  }
}
.work-gallery__modal::backdrop {
  background: #000c;
}
.work-gallery__heading {
  display: flex;
  min-width: 0;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}
.work-gallery__heading h3 {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 18px;
  font-weight: 500;
}
.work-gallery__close {
  display: grid;
  place-items: center;
  padding: 0;
  line-height: 1;
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border: 1px solid var(--border);
  border-radius: 50%;
  color: var(--text);
  background: #20251c;
  cursor: pointer;
  font-size: 26px;
}
@media (max-width: 767px) {
  .work-gallery__heading h3 {
    font-size: 16px;
  }
}
</style>
