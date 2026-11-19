<template>
  <button
    type="button"
    class="gallery-caption__toggle"
    :aria-label="label"
    :title="label"
    :aria-expanded="props.visible"
    :aria-controls="props.descriptionId"
    @click="emit('toggle')"
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
      <template v-if="props.visible">
        <path
          d="m3 3 18 18M10.6 5.1A11 11 0 0 1 12 5c6.5 0 10 7 10 7a19 19 0 0 1-3 3.8M6.5 6.5A22 22 0 0 0 2 12s3.5 7 10 7a12 12 0 0 0 5.5-1.5M10 10a3 3 0 0 0 4 4"
        />
      </template>
      <template v-else>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </template>
    </svg>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  visible: { type: Boolean, required: true },
  descriptionId: { type: String, required: true },
});
const emit = defineEmits(["toggle"]);
const { t } = usePortfolio();
const label = computed(() =>
  props.visible
    ? t.value.workContent.hideDescription
    : t.value.workContent.showDescription
);
</script>

<style scoped lang="scss">
.gallery-caption__toggle {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 1px solid var(--border);
  border-radius: 50%;
  background: #20251c;
  color: var(--text);
  cursor: pointer;

  &:hover {
    border-color: var(--accent);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
  }
}
</style>
