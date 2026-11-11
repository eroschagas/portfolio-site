<template>
  <footer class="footer">
    <div class="footer__content">
      <div>
        <SiteBrand compact />
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
    </div>
  </footer>
</template>

<script setup lang="ts">
import SiteBrand from "./SiteBrand.vue";
import { profile } from "~/data/profile";
const { t } = usePortfolio();
</script>

<style scoped lang="scss">
.footer {
  border-top: 1px solid var(--border);
  width: 100%;
}
.footer__content {
  max-width: 1440px;
  margin: auto;
  padding: 35px 6.25%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
}
.footer p {
  font-size: 10px;
  line-height: 1.9;
  color: var(--muted);
  margin-top: 7px;
}
.footer__links {
  display: flex;
  flex-wrap: wrap;
  gap: 22px;
  font-size: 12px;
}
.footer__links a:hover {
  color: var(--accent);
}
.footer__links a {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
}
.footer__links > span {
  color: var(--muted);
  font-size: 11px;
}
.footer__content > p {
  text-align: right;
}
@media (max-width: 1000px) {
  .footer__content {
    padding-inline: 5%;
  }
  .footer__content {
    flex-wrap: wrap;
  }
}
@media (max-width: 767px) {
  .footer__content {
    flex-direction: column;
    align-items: flex-start;
    gap: 18px;
    padding-block: 28px;
  }
  .footer__content > div:first-child {
    width: 100%;
  }
  .footer__links {
    gap: 16px;
  }
  .footer__content > p {
    text-align: left;
  }
}
</style>
