<template>
  <div class="gallery-caption">
    <p
      :id="props.descriptionId"
      v-show="props.visible"
      class="gallery-caption__description"
      aria-live="polite"
      aria-atomic="true"
    >
      {{ props.description }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  description: { type: String, required: true },
  descriptionId: { type: String, required: true },
  visible: { type: Boolean, default: true },
});
</script>

<style scoped lang="scss">
.gallery-caption {
  position: absolute;
  inset: auto 12px 12px;
  max-width: 880px;
  margin-inline: auto;
  pointer-events: none;

  &__description {
    border: 1px solid #ffffff30;
    border-radius: 12px;
    background: #000c;
    color: #fff;
    pointer-events: auto;
    width: 100%;
    padding: 12px 16px;
    font-size: 14px;
    line-height: 1.5;
    overflow-wrap: anywhere;
  }
}

@media (max-width: 767px) {
  .gallery-caption {
    inset: auto 6px 6px;

    &__description {
      padding: 10px 12px;
      font-size: 12px;
    }
  }
}

@media (max-height: 400px) {
  .gallery-caption {
    bottom: 4px;

    &__description {
      padding: 6px 10px;
      font-size: 11px;
      line-height: 1.3;
    }
  }
}
</style>
