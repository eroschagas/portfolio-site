<template>
  <section class="hero">
    <div class="hero__content">
      <p class="eyebrow"><i></i>{{ t.eyebrow }}</p>
      <p class="hero__hello">
        {{ t.hello }} {{ profile.name }}. <span>↗</span>
      </p>
      <h1>
        {{ t.headline }}<br /><span>{{ t.accent }}</span>
      </h1>
      <p class="hero__description">{{ t.intro }}</p>
      <div class="hero__actions">
        <a class="button" href="#explore">{{ t.explore }} <span>↗</span></a
        ><a class="text-link" href="#about">{{ t.aboutLink }} ↓</a>
      </div>
    </div>
    <HomeCodeArtwork />
    <a href="#about" class="hero__scroll"
      >↓ <span>{{ t.scroll }}</span></a
    >
  </section>
</template>

<script setup lang="ts">
import HomeCodeArtwork from "./HomeCodeArtwork.vue";
import { profile } from "~/data/profile";
const { t } = usePortfolio();
</script>

<style scoped lang="scss">
.hero {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
  align-items: center;
  gap: 36px;
  min-height: 660px;
  padding: 85px 0 110px;
}
.hero__content {
  min-width: 0;
}
.hero__hello {
  font-size: 21px;
  margin: 32px 0 15px;
}
.hero__hello span {
  color: var(--accent);
  margin-left: 7px;
}
.hero h1 {
  font-size: clamp(39px, 4.25vw, 62px);
  line-height: 1.13;
  letter-spacing: -2.7px;
  font-weight: 500;
}
.hero h1 > span {
  color: var(--accent);
}
.hero__description {
  max-width: 465px;
  font-size: 15px;
  line-height: 1.85;
  color: var(--muted);
  margin: 25px 0 30px;
}
.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 26px;
  align-items: center;
  font-size: 12px;
}
.hero__scroll {
  position: absolute;
  bottom: 37px;
  font-size: 19px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--muted);
}
.hero__scroll span {
  font-size: 9px;
  letter-spacing: 2px;
}
@media (min-width: 1600px) {
  .hero {
    min-height: 740px;
  }
  .hero h1 {
    font-size: 62px;
  }
}
@media (max-width: 1000px) {
  .hero {
    gap: 22px;
    min-height: 610px;
  }
  .hero h1 {
    font-size: 42px;
  }
  .hero__actions {
    gap: 16px;
  }
  .hero__description {
    font-size: 14px;
  }
}
@media (max-width: 767px) {
  .hero {
    grid-template-columns: minmax(0, 1fr);
    padding: 48px 0 80px;
    gap: 28px;
    min-height: 0;
  }
  .hero h1 {
    font-size: clamp(36px, 7vw, 52px);
    letter-spacing: -1.7px;
  }
  .hero__hello {
    margin-top: 25px;
    font-size: 19px;
  }
  .hero__description {
    max-width: 440px;
  }
  .hero__actions {
    gap: 21px;
  }
  .hero__scroll {
    bottom: 23px;
  }
}
@media (max-width: 480px) {
  .hero__actions {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
  .hero__actions .text-link {
    justify-content: center;
  }
}
</style>
