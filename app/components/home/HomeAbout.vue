<template>
  <section id="about" class="section about">
    <p class="eyebrow">{{ t.aboutLabel }}</p>
    <div class="about__grid">
      <h2>{{ t.aboutTitle }}</h2>
      <div>
        <p>{{ t.about }}</p>
        <p class="about__note">{{ t.note }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = usePortfolio();
</script>

<style scoped lang="scss">
.about__grid > * {
  min-width: 0;
}
.about__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 90px;
  margin-top: 26px;
}
.about__grid h2 {
  max-width: 350px;
}
.about__grid p {
  font-size: 14px;
  line-height: 1.9;
  color: var(--muted);
}
.about__grid .about__note {
  font-size: 12px;
  margin-top: 18px;
  color: #c2c9b8;
}
@media (max-width: 1000px) {
  .about__grid {
    gap: 40px;
  }
}
@media (max-width: 767px) {
  .about__grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 22px;
    margin-top: 20px;
  }
  .about__grid h2 {
    max-width: 100%;
  }
}
</style>
