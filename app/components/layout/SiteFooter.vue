<template>
  <footer class="footer">
    <div>
      <NuxtLink class="brand" to="/">e<span>.</span></NuxtLink>
      <p>{{ t.footer }}</p>
    </div>
    <div class="footer__links">
      <template v-for="social in profile.socials" :key="social.name"
        ><a
          v-if="social.url"
          :href="social.url"
          target="_blank"
          rel="noopener noreferrer"
          >{{ social.name }} ↗</a
        ><span v-else>{{ social.name }} · {{ t.soon }}</span></template
      >
    </div>
    <p>
      © {{ new Date().getFullYear() }} {{ profile.name }}<br />{{ t.built }}
    </p>
  </footer>
</template>

<script setup lang="ts">
import { profile } from "~/data/profile";
const { t } = usePortfolio();
</script>
