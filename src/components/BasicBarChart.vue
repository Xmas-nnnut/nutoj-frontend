<template>
  <div id="basicBarChart">
    <div id="barChart" style="width: 180vh; height: 80vh"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted } from "vue";

const doInit = async () => {
  type EChartsOption = echarts.EChartsOption;

  let chartDom = document.getElementById("barChart")!;
  let myChart = echarts.init(chartDom);
  let option: EChartsOption;

  option = {
    title: {
      text: "排行榜",
    },
    legend: {
      data: ["通过数", "提交数"],
    },
    xAxis: {
      type: "category",
      data: ["Team1", "Team2", "Team3", "Team4", "Team5", "Team6", "Team7"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "通过数",
        type: "bar",
        data: [20, 16, 12, 10, 8, 4, 2],
      },
      {
        name: "提交数",
        type: "bar",
        data: [30, 34, 28, 24, 20, 18, 16],
      },
    ],
  };
  option && myChart.setOption(option);
};
/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  doInit();
});
</script>

<style scoped>
.basicBarChart {
}
</style>
