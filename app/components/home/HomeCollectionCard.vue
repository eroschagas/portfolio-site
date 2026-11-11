<template>
  <NuxtLink
    :to="props.category.path"
    :class="['project-card', `project-card--${props.category.kind}`]"
    ><div class="project-card__top">
      <span>0{{ props.index + 1 }}</span
      ><span>↗</span>
    </div>
    <div class="project-card__art" aria-hidden="true">
      {{ props.category.symbol }}
    </div>
    <h3>{{ props.category.name }}</h3>
    <p>{{ props.category.description }}</p>
    <span class="project-card__link"
      >{{ t.view }} <span>→</span></span
    ></NuxtLink
  >
</template>
<script setup lang="ts">
import { CollectionCategory } from "~/models/CollectionCategory";
const props = defineProps({
  category: { type: CollectionCategory, required: true },
  index: { type: Number, default: 0 },
});
const { t } = usePortfolio();
</script>
<style scoped lang="scss">
@use "~/assets/styles/project-card";
@include project-card.card;
.project-card__art {
  height: 135px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c6f589;
  font: 80px "Space Grotesk", sans-serif;
  background: radial-gradient(ellipse, #c6f5890d, transparent 65%);
}
.project-card--work .project-card__art {
  color: #c3c8f2;
  background: radial-gradient(ellipse, #c3c8f20d, transparent 65%);
}
.project-card--legacy .project-card__art {
  font: 52px monospace;
  color: #e7bf91;
  background: radial-gradient(ellipse, #e7bf910d, transparent 65%);
}
@media (max-width: 767px) {
  .project-card__art {
    height: 105px;
  }
}
</style>
