<template>
  <div class="myPieChart">
    <div id="pieChart" style="width: 300px; height: 300px"></div>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts/core";
import {
  TooltipComponent,
  TooltipComponentOption,
  LegendComponent,
  LegendComponentOption,
} from "echarts/components";
import { PieChart, PieSeriesOption } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { onMounted } from "vue";

const doInit = async () => {
  echarts.use([
    TooltipComponent,
    LegendComponent,
    PieChart,
    CanvasRenderer,
    LabelLayout,
  ]);

  type EChartsOption = echarts.ComposeOption<
    TooltipComponentOption | LegendComponentOption | PieSeriesOption
  >;

  // 基于准备好的dom，初始化echarts实例
  let chartDom = document.getElementById("pieChart")!;
  let myChart = echarts.init(chartDom);

  // 指定图表的配置项和数据
  let option: EChartsOption;
  option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "0%",
      left: "center",
    },
    series: [
      {
        name: "统计数据",
        type: "pie",
        top: "25%",
        radius: ["50%", "90%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "Wrong Answer" },
          { value: 735, name: "Accepted" },
          { value: 580, name: "Compilation Error" },
          { value: 484, name: "Runtime Error" },
          { value: 300, name: "Time Limit Exceeded" },
        ],
      },
    ],
  };
  // 使用刚指定的配置项和数据显示图表。
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
.myPieChart {
}
</style>
