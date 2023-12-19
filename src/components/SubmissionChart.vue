<template>
  <div id="submissionChart">
    <calendar-heatmap
      end-date="2023-12-12"
      :values="timeValue"
      :max="5"
      tooltip-unit="submits"
      :range-color="['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']"
    />
  </div>
</template>

<script setup lang="ts">
import { CalendarHeatmap } from "vue3-calendar-heatmap";
import { ref } from "vue";

const timeValue = ref([
  { date: "2023-08-02", count: 0 },
  { date: "2023-08-03", count: 1 },
  { date: "2023-08-04", count: 2 },
  { date: "2023-08-05", count: 3 },
  { date: "2023-08-06", count: 4 },
  { date: "2023-08-07", count: 5 },
  { date: "2023-08-08", count: 6 },
]);
</script>
<style scoped>
#submissionChart {
  width: 116vh;
}
</style>
