<template>
  <div id="basicBarChart">
    <div id="barChart" style="width: 170vh; height: 80vh"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts/core";
import {
  TitleComponent,
  DatasetComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from "echarts/components";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { onMounted, ref } from "vue";
import { RecordControllerService } from "@/generated";
import message from "@arco-design/web-vue/es/message";

const doInit = async () => {
  const dataList = ref([]);
  const res = await RecordControllerService.listRecordVoByPageUsingPost({
    pageSize: 5,
    current: 1,
    sortField: "acceptedNum",
    sortOrder: "descend",
  });
  if (res.code === 0) {
    dataList.value = res.data.records;
    console.log(dataList.value);
  } else {
    message.error("加载失败，" + res.message);
  }

  echarts.use([
    TitleComponent,
    DatasetComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    BarChart,
    CanvasRenderer,
  ]);

  var chartDom = document.getElementById("barChart");
  var myChart = echarts.init(chartDom);
  var option;

  option = {
    title: {
      text: "排行榜",
    },
    legend: {},
    tooltip: {},
    dataset: {
      dimensions: ["userId", "submitNum", "acceptedNum"],
      source: dataList.value,
    },
    xAxis: { type: "category" },
    yAxis: {},
    series: [{ type: "bar" }, { type: "bar" }],
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
