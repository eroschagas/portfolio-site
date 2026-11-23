<template>
  <details class="work-subprojects">
    <summary class="work-subprojects__toggle">
      <span>{{ t.workContent.subprojects }} ({{ props.count }})</span>
      <svg
        class="work-subprojects__icon"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </summary>
    <div class="work-subprojects__content">
      <slot />
    </div>
  </details>
</template>

<script setup lang="ts">
const props = defineProps({
  count: { type: Number, required: true },
});
const { t } = usePortfolio();
</script>

<style scoped lang="scss">
.work-subprojects {
  min-width: 0;
  border: 1px solid var(--border);
  border-radius: 12px;

  &__toggle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    min-height: 48px;
    padding: 16px 24px;
    color: var(--text);
    cursor: pointer;
    list-style: none;

    &::-webkit-details-marker {
      display: none;
    }

    &:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 4px;
    }
  }

  &__icon {
    display: block;
    flex-shrink: 0;
  }

  &[open] > &__toggle &__icon {
    transform: rotate(180deg);
  }

  &__content {
    min-width: 0;
    padding: 0 24px;
  }
}

@media (max-width: 767px) {
  .work-subprojects {
    &__toggle {
      padding: 14px;
    }

    &__content {
      padding: 0 14px;
    }
  }
}
</style>
