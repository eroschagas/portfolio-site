<template>
  <div class="language" :aria-label="t.language">
    <button
      v-for="locale in ['pt', 'en'] as const"
      :key="locale"
      :aria-pressed="language === locale"
      :class="{ active: language === locale }"
      @click="language = locale"
    >
      {{ locale.toUpperCase() }}
    </button>
  </div>
</template>

<script setup lang="ts">
const { language, t } = usePortfolio();
</script>
