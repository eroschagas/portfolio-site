<template>
  <header class="header">
    <SiteBrand show-details />
    <nav class="header__nav" :aria-label="t.navigation">
      <NuxtLink class="header__link" to="/">{{ t.header.home }}</NuxtLink
      ><NuxtLink class="header__link" to="/ai-assisted">{{
        t.header.aiAssisted
      }}</NuxtLink
      ><NuxtLink
        to="/work"
        :class="[
          'header__link',
          { 'header__link--active': route.path.startsWith('/work/') },
        ]"
        >{{ t.header.work }}</NuxtLink
      ><NuxtLink class="header__link" to="/legacy">{{
        t.header.legacy
      }}</NuxtLink>
    </nav>
    <LanguageSwitch class="header__language" />
  </header>
</template>

<script setup lang="ts">
import SiteBrand from "./SiteBrand.vue";
import LanguageSwitch from "./LanguageSwitch.vue";
const { t } = usePortfolio();
const route = useRoute();
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 100;
  background: var(--bg);
  padding: 0 max(6.25%, calc((100% - 1260px) / 2));
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border);
  gap: 24px;
}
.header__nav {
  display: flex;
  gap: 32px;
  font-size: 13px;
}
.header__link {
  position: relative;
  padding: 16px 0;
  color: var(--muted);
}
.header__link:hover,
.header__link.router-link-active,
.header__link--active {
  color: var(--text);
}
.header__link.router-link-active:after,
.header__link--active:after {
  content: "";
  position: absolute;
  bottom: 4px;
  left: 0;
  width: 15px;
  height: 2px;
  background: var(--accent);
}
@media (max-width: 767px) {
  .header {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    grid-template-rows: 48px 44px;
    grid-template-areas: "brand language" "nav nav";
    gap: 8px 16px;
    padding: 16px 5%;
  }
  .header > .brand {
    grid-area: brand;
    justify-self: start;
  }
  .header__language {
    grid-area: language;
  }
  .header__nav {
    grid-area: nav;
    display: grid;
    grid-template-columns: repeat(4, auto);
    width: 100%;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    font-size: 12px;
  }
  .header__link {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    padding: 8px 0;
  }
}
</style>
