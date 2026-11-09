<template>
  <div v-if="props.images.length" class="work-gallery">
    <GalleryPreview :images="props.images" :title="props.title" @open="open" />
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
          ×
        </button>
      </div>
      <GalleryViewer
        :images="props.images"
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
import { ImageCarouselState } from "~/models/ImageCarouselState";
import GalleryViewer from "./GalleryViewer.vue";
import GalleryPreview from "./GalleryPreview.vue";
const props = defineProps({
  images: { type: Array as PropType<string[]>, required: true },
  title: { type: String, required: true },
});
const { t } = usePortfolio();
const carousel = reactive(new ImageCarouselState(props.images.length));
const dialog = ref<HTMLDialogElement | null>(null);
let previousOverflow: string | null = null;
const open = (index: number) => {
  if (!dialog.value || dialog.value.open) return;
  carousel.select(index);
  previousOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  dialog.value.showModal();
};
const close = () => dialog.value?.close();
const onClose = () => {
  if (previousOverflow !== null) {
    document.body.style.overflow = previousOverflow;
    previousOverflow = null;
  }
};
const onBackdropClick = (event: MouseEvent) => {
  const element = dialog.value;
  if (!element || event.target !== element) return;
  const rect = element.getBoundingClientRect();
  if (
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom
  )
    close();
};
watch(
  () => props.images,
  (images) => {
    close();
    carousel.reset(images.length);
  },
);
onBeforeUnmount(() => {
  close();
  onClose();
});
</script>

<style scoped>
.work-gallery {
  margin-top: 26px;
  min-width: 0;
}
.work-gallery__modal {
  width: min(1200px, calc(100% - 48px));
  max-width: none;
  max-height: calc(100dvh - 48px);
  padding: 24px;
  border: 1px solid var(--border);
  border-radius: 16px;
  background: var(--bg);
  color: var(--text);
  overscroll-behavior: contain;
}
.work-gallery__modal::backdrop {
  background: #000c;
}
.work-gallery__heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 18px;
}
.work-gallery__heading h3 {
  min-width: 0;
  overflow-wrap: anywhere;
  font-size: 20px;
  font-weight: 500;
}
.work-gallery__close {
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
  .work-gallery__modal {
    width: calc(100% - 24px);
    max-height: calc(100dvh - 24px);
    padding: 14px;
    border-radius: 12px;
  }
  .work-gallery__heading h3 {
    font-size: 17px;
  }
}
</style>
