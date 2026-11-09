<template>
  <div class="language" :aria-label="t.language">
    <button
      v-for="locale in ['pt', 'en'] as const"
      :key="locale"
      :aria-pressed="language === locale"
      :class="{ active: language === locale }"
      @click="selectLanguage(locale)"
    >
      {{ locale.toUpperCase() }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Language } from "~/models/Project";
const { language, t } = usePortfolio();
const route = useRoute();
const selectLanguage = (locale: Language) => {
  language.value = locale;
  if ("lang" in route.query) {
    return navigateTo(
      {
        path: route.path,
        query: { ...route.query, lang: locale },
        hash: route.hash,
      },
      { replace: true },
    );
  }
};
</script>
