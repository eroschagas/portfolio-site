<template>
  <div class="work-period" :aria-label="t.workContent.period">
    <time :datetime="props.period.getStartDateTime()">{{
      props.period.start
    }}</time>
    <span>—</span>
    <span v-if="props.period.isCurrent">{{ t.workContent.present }}</span>
    <time v-else :datetime="props.period.getEndDateTime()">{{
      props.period.end
    }}</time>
  </div>
</template>

<script setup lang="ts">
import { WorkPeriod } from "~/models/WorkPeriod";
const props = defineProps({ period: { type: WorkPeriod, required: true } });
const { t } = usePortfolio();
</script>

<style scoped lang="scss">
.work-period {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  color: var(--accent);
  font-size: 12px;
  line-height: 1.5;
}
</style>
