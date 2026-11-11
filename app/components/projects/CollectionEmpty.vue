<template>
  <div class="collection__empty">
    <span class="collection__symbol" aria-hidden="true">{{
      props.symbol
    }}</span>
    <p class="eyebrow">{{ t.status }}</p>
    <h2>{{ t.emptyTitle }}</h2>
    <p>{{ props.description }}</p>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  symbol: { type: String, required: true },
  description: { type: String, required: true },
});
const { t } = usePortfolio();
</script>
<style scoped lang="scss">
.collection__empty {
  border: 1px dashed #3e4935;
  border-radius: 8px;
  padding: 45px;
  margin-top: 45px;
  background: #171b15;
}
.collection__symbol {
  float: right;
  font: 65px monospace;
  color: var(--accent);
}
.collection__empty h2 {
  font-size: 27px;
  margin: 15px 0;
}
.collection__empty > p:last-child {
  max-width: 590px;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.9;
}
@media (max-width: 767px) {
  .collection__empty {
    padding: 25px;
    margin-top: 30px;
  }
  .collection__symbol {
    font-size: 35px;
  }
  .collection__empty h2 {
    font-size: 25px;
    max-width: 260px;
  }
  .collection__empty > p:last-child {
    font-size: 13px;
  }
}
</style>
