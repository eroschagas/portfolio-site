<template>
  <div class="language" :aria-label="t.language">
    <NuxtLink
      v-for="locale in ['pt', 'en'] as const"
      :key="locale"
      :aria-current="language === locale ? 'true' : undefined"
      :to="{
        path: route.path,
        query: { ...route.query, lang: locale },
        hash: mounted ? route.hash : '',
      }"
      :class="[
        'language__button',
        { 'language__button--active': language === locale },
      ]"
    >
      {{ locale.toUpperCase() }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { language, t } = usePortfolio();
const route = useRoute();
const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
});
</script>

<style scoped lang="scss">
.language {
  display: flex;
  align-items: center;
  gap: 6px;
}
.language__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  background: none;
  border: 0;
  color: var(--muted);
  cursor: pointer;
  padding: 9px 5px;
  font-size: 12px;
}
.language__button + .language__button {
  border-left: 1px solid var(--border);
  padding-left: 12px;
}
.language__button--active {
  color: var(--accent);
}
</style>
