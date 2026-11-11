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
      />
      <span class="gallery-viewer__expand" aria-hidden="true"
        >⤢ {{ t.workContent.enlarge }}</span
      >
    </button>
    <img
      v-else
      class="gallery-viewer__image"
      :src="props.images[props.index]"
      :alt="imageDescription"
      width="1200"
      height="750"
    />
    <div class="gallery-viewer__controls">
      <button
        v-if="props.images.length > 1"
        type="button"
        class="gallery-viewer__arrow"
        :aria-label="t.workContent.previous"
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
      </button>
      <p class="gallery-viewer__counter" aria-live="polite" aria-atomic="true">
        {{ props.index + 1 }} / {{ props.images.length }}
      </p>
      <button
        v-if="props.images.length > 1"
        type="button"
        class="gallery-viewer__arrow"
        :aria-label="t.workContent.next"
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
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
const props = defineProps({
  images: { type: Array as PropType<string[]>, required: true },
  title: { type: String, required: true },
  index: { type: Number, required: true },
  expanded: { type: Boolean, default: false },
});
const emit = defineEmits(["open", "previous", "next"]);
const { t } = usePortfolio();
const imageDescription = computed(
  () =>
    `${props.title} — ${t.value.workContent.image} ${props.index + 1} / ${
      props.images.length
    }`
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
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 14px;
}
.gallery-viewer__arrow {
  display: grid;
  place-items: center;
  padding: 0;
  line-height: 1;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border: 1px solid var(--border);
  border-radius: 50%;
  background: #20251c;
  color: var(--accent);
  cursor: pointer;
  font-size: 20px;
}
.gallery-viewer__arrow:hover {
  border-color: var(--accent);
}
.gallery-viewer__counter {
  color: var(--muted);
  font: 12px monospace;
}
.gallery-viewer--expanded .gallery-viewer__image {
  height: min(68dvh, 850px);
  aspect-ratio: auto;
  background: var(--bg);
}
@media (max-width: 767px) {
  .gallery-viewer__expand {
    padding: 8px 10px;
    font-size: 11px;
    right: 8px;
    bottom: 8px;
  }
  .gallery-viewer--expanded .gallery-viewer__image {
    height: 58dvh;
  }
}
</style>
