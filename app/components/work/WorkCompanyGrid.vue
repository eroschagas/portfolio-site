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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 34px;
}
@media (max-width: 767px) {
  .work-companies {
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
    margin-top: 28px;
  }
}
</style>
