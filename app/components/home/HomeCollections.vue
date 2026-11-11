<template>
  <section id="explore" class="section projects">
    <p class="eyebrow">{{ t.projectsLabel }}</p>
    <h2>{{ t.projectsTitle }}</h2>
    <div class="projects__grid">
      <HomeCollectionCard
        v-for="(category, index) in categories"
        :key="category.slug"
        :category="category"
        :index="index"
      />
    </div>
  </section>
</template>
<script setup lang="ts">
import HomeCollectionCard from "./HomeCollectionCard.vue";
const { t } = usePortfolio();
const { categories } = useCollections();
</script>
<style scoped lang="scss">
.projects h2 {
  margin-top: 17px;
}
.projects {
  padding-bottom: 85px;
}
.projects__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  margin-top: 34px;
}
@media (max-width: 767px) {
  .projects {
    padding-bottom: 39px;
  }
  .projects__grid {
    grid-template-columns: minmax(0, 1fr);
    margin-top: 25px;
    gap: 16px;
  }
}
</style>
