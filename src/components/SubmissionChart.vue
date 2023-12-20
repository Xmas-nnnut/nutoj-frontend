<template>
  <div id="submissionChart">
    <calendar-heatmap
      :end-date="EndDate"
      :values="timeValue"
      :max="10"
      tooltip-unit="submits"
      :range-color="['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']"
    />
  </div>
</template>

<script setup lang="ts">
import { CalendarHeatmap } from "vue3-calendar-heatmap";
import { onMounted, ref } from "vue";
import { QuestionControllerService } from "@/generated";
import message from "@arco-design/web-vue/es/message";
import useStore from "@/store";

/**
 * 获取登录用户信息
 */
const store = useStore();
const { user } = store;
let loginUser = user.loginUser;

let now = new Date();
let yy = now.getFullYear();
let mm = now.getMonth() + 1;
let dd = now.getDate();
const EndDate: string = yy + "-" + mm + "-" + dd;

const timeValue = ref([]);

const loadData = async () => {
  const res = await QuestionControllerService.listMyDailyCountListUsingPost({
    userId: loginUser.id,
  });
  if (res.code === 0) {
    timeValue.value = res.data;
  } else {
    message.error("加载失败，" + res.message);
  }
};
/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});
</script>
<style scoped>
#submissionChart {
  width: 116vh;
}
</style>
