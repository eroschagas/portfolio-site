<template>
  <NuxtLink :class="['brand', { 'brand--compact': props.compact }]" to="/"
    >e<span>.</span
    ><small v-if="props.showDetails"
      >{{ profile.name }} / {{ t.header.role }}</small
    ></NuxtLink
  >
</template>
<script setup lang="ts">
import { profile } from "~/data/profile";
const props = defineProps({
  showDetails: { type: Boolean, default: false },
  compact: { type: Boolean, default: false },
});
const { t } = usePortfolio();
</script>
<style scoped lang="scss">
.brand {
  font-family: "Space Grotesk", sans-serif;
  font-size: 42px;
  font-weight: 700;
  letter-spacing: -3px;
  display: inline-flex;
  align-items: center;
}
.brand > span {
  color: var(--accent);
}
.brand small {
  font: 12px "DM Sans", sans-serif;
  letter-spacing: 0;
  margin-left: 17px;
  color: var(--muted);
}
.brand--compact {
  font-size: 30px;
}
@media (max-width: 1000px) {
  .brand small {
    display: none;
  }
}
</style>
