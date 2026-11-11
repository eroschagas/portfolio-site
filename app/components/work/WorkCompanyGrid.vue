<template>
  <div class="work-companies">
    <WorkCompanyCard
      v-for="(company, index) in companies"
      :key="company.slug"
      :company="company"
      :index="index"
    />
  </div>
</template>

<script setup lang="ts">
import { WorkRepository } from "~/services/WorkRepository";
import WorkCompanyCard from "./WorkCompanyCard.vue";
const companies = new WorkRepository().getCompanies();
</script>

<style scoped lang="scss">
.work-companies {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
  margin-top: 40px;
}
@media (max-width: 767px) {
  .work-companies {
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
    margin-top: 28px;
  }
}
</style>
