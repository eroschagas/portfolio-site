<template>
  <button
    type="button"
    :class="['icon-button', `icon-button--${props.variant}`]"
    :aria-label="props.label"
    :title="props.label"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import type { PropType } from "vue";

const props = defineProps({
  label: { type: String, required: true },
  variant: {
    type: String as PropType<"primary" | "secondary">,
    default: "secondary",
  },
});
</script>

<style scoped lang="scss">
.icon-button {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 1px solid var(--border);
  border-radius: 50%;
  background: #20251c;
  line-height: 1;
  cursor: pointer;
  transition: border-color 0.2s ease-out, background-color 0.2s ease-out,
    color 0.2s ease-out;

  &--primary {
    color: var(--accent);
  }

  &--secondary {
    color: var(--text);
  }

  &:hover {
    border-color: var(--accent);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .icon-button {
    transition: none;
  }
}
</style>
