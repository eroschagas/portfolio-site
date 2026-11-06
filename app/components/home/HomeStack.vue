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
