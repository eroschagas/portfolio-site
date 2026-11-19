<template>
  <div
    :class="['gallery-viewer', { 'gallery-viewer--expanded': props.expanded }]"
    role="region"
    :aria-label="`${t.workContent.gallery}: ${props.title}`"
    :aria-roledescription="t.workContent.carousel"
    @touchstart.passive="onTouchStart"
    @touchend.passive="onTouchEnd"
  >
    <button
      v-if="!props.expanded"
      type="button"
      class="gallery-viewer__image-button"
      :aria-label="`${t.workContent.enlarge}: ${props.title}`"
      @click="emit('open')"
    >
      <img
        class="gallery-viewer__image"
        :src="props.images[props.index]"
        :alt="imageDescription"
        width="1200"
        height="750"
        loading="lazy"
        draggable="false"
      />
      <span class="gallery-viewer__expand" aria-hidden="true"
        >⤢ {{ t.workContent.enlarge }}</span
      >
    </button>
    <div
      v-else
      class="gallery-viewer__stage"
      :style="{
        '--image-offset': displayedDirection === 'previous' ? '-18px' : '18px',
      }"
    >
      <Transition name="gallery-viewer-image">
        <img
          v-if="displayedSource"
          :key="displayedSource"
          class="gallery-viewer__image"
          :src="displayedSource"
          :alt="imageDescription"
          :aria-describedby="metadata.description ? captionId : undefined"
          width="1200"
          height="750"
          draggable="false"
        />
      </Transition>
      <GalleryImageCaption
        v-if="metadata.description"
        :description="metadata.description"
        :description-id="captionId"
        :visible="descriptionVisible"
      />
    </div>
    <div class="gallery-viewer__controls">
      <IconButton
        v-if="props.images.length > 1"
        class="gallery-viewer__arrow"
        :label="t.workContent.previous"
        variant="primary"
        @click="emit('previous')"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M19 12H5m6-6-6 6 6 6" />
        </svg>
      </IconButton>
      <p class="gallery-viewer__counter" aria-live="polite" aria-atomic="true">
        <span class="gallery-viewer__current">{{ visibleIndex + 1 }}</span>
        <span>/</span>
        <span class="gallery-viewer__total">{{ props.images.length }}</span>
      </p>
      <IconButton
        v-if="props.images.length > 1"
        class="gallery-viewer__arrow"
        :label="t.workContent.next"
        variant="primary"
        @click="emit('next')"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M5 12h14m-6-6 6 6-6 6" />
        </svg>
      </IconButton>
      <GalleryDescriptionToggle
        v-if="props.expanded && metadata.description"
        class="gallery-viewer__description-toggle"
        :visible="descriptionVisible"
        :description-id="captionId"
        @toggle="descriptionVisible = !descriptionVisible"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import IconButton from "../shared/IconButton.vue";
import type { WorkImageMetadata } from "~/models/WorkProject";
import GalleryImageCaption from "./GalleryImageCaption.vue";
import GalleryDescriptionToggle from "./GalleryDescriptionToggle.vue";
import { useGalleryImage } from "~/composables/useGalleryImage";
const props = defineProps({
  images: { type: Array as PropType<string[]>, required: true },
  imageMetadata: {
    type: Array as PropType<WorkImageMetadata[]>,
    default: () => [],
  },
  title: { type: String, required: true },
  index: { type: Number, required: true },
  direction: {
    type: String as PropType<"previous" | "next">,
    default: "next",
  },
  expanded: { type: Boolean, default: false },
});
const emit = defineEmits(["open", "previous", "next"]);
const { t } = usePortfolio();
const captionId = useId();
const descriptionVisible = ref(true);
const { displayedSource, displayedIndex, displayedDirection } = useGalleryImage(
  () => ({
    source: props.expanded ? props.images[props.index] ?? "" : "",
    index: props.index,
    direction: props.direction,
  })
);
const visibleIndex = computed(() =>
  props.expanded ? displayedIndex.value : props.index
);
const metadata = computed(
  () => props.imageMetadata[visibleIndex.value] ?? { alt: "", description: "" }
);
const imageDescription = computed(
  () =>
    metadata.value.alt ||
    `${props.title} — ${t.value.workContent.image} ${
      visibleIndex.value + 1
    } / ${props.images.length}`
);
let touchStart: { x: number; y: number } | null = null;
const onTouchStart = (event: TouchEvent) => {
  const touch = event.touches[0];
  touchStart = touch ? { x: touch.clientX, y: touch.clientY } : null;
};
const onTouchEnd = (event: TouchEvent) => {
  const touch = event.changedTouches[0];
  if (touchStart && touch && props.images.length > 1) {
    const distance = touch.clientX - touchStart.x;
    if (
      Math.abs(distance) > 50 &&
      Math.abs(distance) > Math.abs(touch.clientY - touchStart.y)
    ) {
      if (distance > 0) emit("previous");
      else emit("next");
    }
  }
  touchStart = null;
};
</script>

<style scoped lang="scss">
.gallery-viewer {
  min-width: 0;
  -webkit-user-select: none;
  user-select: none;
}
.gallery-viewer__image-button {
  display: block;
  position: relative;
  width: 100%;
  padding: 0;
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  background: var(--bg);
  cursor: zoom-in;
}
.gallery-viewer__image {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 10;
  object-fit: contain;
  background: #151814;
}
.gallery-viewer__expand {
  position: absolute;
  right: 12px;
  bottom: 12px;
  padding: 10px 14px;
  border-radius: 6px;
  background: #101211e8;
  color: var(--text);
  font-size: 12px;
}
.gallery-viewer__controls {
  position: relative;
  min-height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 14px;
}
.gallery-viewer__description-toggle {
  position: absolute;
  right: 0;
}
.gallery-viewer__counter {
  display: grid;
  grid-template-columns: 3ch 1ch 3ch;
  column-gap: 1ch;
  flex-shrink: 0;
  min-width: 9ch;
  text-align: center;
  white-space: nowrap;
  color: var(--muted);
  font: 12px monospace;
}
.gallery-viewer__current {
  text-align: right;
}
.gallery-viewer__total {
  text-align: left;
}
.gallery-viewer--expanded {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr) auto;
  gap: 8px;
  min-height: 0;
}
.gallery-viewer--expanded .gallery-viewer__image {
  min-height: 0;
  height: 100%;
  aspect-ratio: auto;
  background: var(--bg);
}
.gallery-viewer__stage {
  isolation: isolate;
  position: relative;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}
.gallery-viewer__stage > .gallery-viewer__image {
  position: absolute;
  inset: 0;
}
.gallery-viewer__stage > :deep(.gallery-caption) {
  z-index: 2;
}
.gallery-viewer--expanded .gallery-viewer__controls {
  margin-top: 0;
}
.gallery-viewer-image-enter-active {
  z-index: 1;
  transition: opacity 240ms linear, transform 240ms ease;
}
.gallery-viewer-image-leave-active {
  z-index: 0;
  transition: transform 240ms ease;
}
.gallery-viewer-image-enter-from {
  opacity: 0;
  transform: translateX(var(--image-offset));
}
.gallery-viewer-image-leave-to {
  transform: translateX(calc(-1 * var(--image-offset)));
}
@media (max-width: 767px) {
  .gallery-viewer__expand {
    padding: 8px 10px;
    font-size: 11px;
    right: 8px;
    bottom: 8px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .gallery-viewer-image-enter-active,
  .gallery-viewer-image-leave-active {
    transition: none;
  }
}
</style>
