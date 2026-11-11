<template>
  <section class="section stack">
    <div class="section__heading">
      <div>
        <p class="eyebrow">{{ t.stackLabel }}</p>
        <h2>{{ t.stackTitle }}</h2>
      </div>
      <p>{{ t.stackDescription }}</p>
    </div>
    <div class="stack__list">
      <div
        v-for="(technology, index) in technologies"
        :key="technology"
        class="stack__item"
      >
        <span>{{ stackSymbols[index] }}</span
        >{{ technology }}
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { profile } from "~/data/profile";
const { language, t } = usePortfolio();
const technologies = computed(() => profile.getStack(language.value));
const stackSymbols = ["V", "N", "TS", "JS", "</>", "⑂", "⚛", "✳"];
</script>

<style scoped lang="scss">
.section__heading > * {
  min-width: 0;
}
.section__heading > p {
  font-size: 14px;
  line-height: 1.9;
  color: var(--muted);
}
.section__heading {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 35px;
}
.section__heading h2 {
  margin-top: 17px;
}
.section__heading > p {
  max-width: 265px;
  font-size: 12px;
}
.stack__list {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin-top: 32px;
}
.stack__item {
  min-width: 0;
  overflow-wrap: anywhere;
  border: 1px solid var(--border);
  padding: 23px 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  border-radius: 5px;
  background: #151814;
}
.stack__item > span {
  flex-shrink: 0;
  color: var(--accent);
  font: bold 16px monospace;
}
@media (max-width: 1000px) {
  .stack__list {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
@media (max-width: 767px) {
  .section__heading {
    display: block;
  }
  .section__heading > p {
    margin-top: 15px;
    max-width: 100%;
  }
  .stack__list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    margin-top: 23px;
  }
  .stack__item {
    padding: 19px 14px;
  }
}
</style>
