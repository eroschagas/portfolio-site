<template>
  <div
    class="gallery-preview"
    role="group"
    :aria-label="`${t.workContent.gallery}: ${props.title}`"
  >
    <div class="gallery-preview__strip">
      <button
        v-for="(image, index) in props.images.slice(0, 3)"
        :key="image"
        type="button"
        :class="[
          'gallery-preview__item',
          'gallery-preview__thumbnail',
          `gallery-preview__thumbnail--${index + 1}`,
        ]"
        :aria-label="`${t.workContent.enlarge}: ${props.title} — ${
          t.workContent.image
        } ${index + 1}`"
        @click="emit('open', index)"
      >
        <img
          :src="image"
          :alt="`${props.title} — ${t.workContent.image} ${index + 1}`"
          width="1200"
          height="750"
          loading="lazy"
        />
      </button>
      <template v-for="capacity in layout.capacities" :key="capacity">
        <button
          v-if="layout.getRemaining(capacity) > 0"
          type="button"
          :class="[
            'gallery-preview__item',
            'gallery-preview__more',
            `gallery-preview__more--${capacity}`,
          ]"
          :aria-label="`${layout.getRemaining(capacity)} ${
            t.workContent.moreImages
          }: ${props.title}`"
          @click="emit('open', capacity)"
        >
          <span class="gallery-preview__number"
            >+{{ layout.getRemaining(capacity) }}</span
          >
          <span class="gallery-preview__label">{{
            t.workContent.moreImages
          }}</span>
        </button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { ImagePreviewLayout } from "~/models/ImagePreviewLayout";
const props = defineProps({
  images: { type: Array as PropType<string[]>, required: true },
  title: { type: String, required: true },
});
const emit = defineEmits({ open: (index: number) => Number.isInteger(index) });
const { t } = usePortfolio();
const layout = computed(() => new ImagePreviewLayout(props.images.length));
</script>

<style scoped lang="scss">
.gallery-preview {
  container-type: inline-size;
  min-width: 0;
}
.gallery-preview__strip {
  display: flex;
  align-items: stretch;
  gap: 16px;
}
.gallery-preview__item {
  flex: 1 1 0;
  min-width: 0;
  max-width: 440px;
  min-height: 44px;
  padding: 0;
  border: 1px solid var(--border);
  border-radius: 10px;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: #191e17;
  color: var(--text);
  cursor: pointer;
}
.gallery-preview__item:hover {
  border-color: var(--accent);
}
.gallery-preview__thumbnail {
  cursor: zoom-in;
}
.gallery-preview__thumbnail img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.gallery-preview__more {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 12px;
}
.gallery-preview__more--3 {
  display: flex;
}
.gallery-preview__number {
  font-family: "Space Grotesk", sans-serif;
  font-size: clamp(28px, 4vw, 46px);
  color: var(--accent);
}
.gallery-preview__label {
  font-size: 12px;
  color: var(--muted);
  overflow-wrap: anywhere;
}
@container (max-width: 900px) {
  .gallery-preview__thumbnail--3,
  .gallery-preview__more--3 {
    display: none;
  }
  .gallery-preview__more--2 {
    display: flex;
  }
}
@container (max-width: 560px) {
  .gallery-preview__strip {
    gap: 10px;
  }
  .gallery-preview__thumbnail--2,
  .gallery-preview__more--2 {
    display: none;
  }
  .gallery-preview__more--1 {
    display: flex;
  }
  .gallery-preview__label {
    font-size: 11px;
  }
}
</style>
