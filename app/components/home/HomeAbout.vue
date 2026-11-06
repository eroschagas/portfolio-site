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
