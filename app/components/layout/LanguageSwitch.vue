<template>
  <div class="language" :aria-label="t.language">
    <button
      v-for="locale in ['pt', 'en'] as const"
      :key="locale"
      :aria-pressed="language === locale"
      :class="[
        'language__button',
        { 'language__button--active': language === locale },
      ]"
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
      { replace: true }
    );
  }
};
</script>

<style scoped lang="scss">
.language {
  display: flex;
  align-items: center;
  gap: 6px;
}
.language__button {
  min-width: 44px;
  min-height: 44px;
  background: none;
  border: 0;
  color: var(--muted);
  cursor: pointer;
  padding: 9px 5px;
  font-size: 12px;
}
.language__button + button {
  border-left: 1px solid var(--border);
  padding-left: 12px;
}
.language__button--active {
  color: var(--accent);
}
</style>
