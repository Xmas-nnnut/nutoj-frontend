<template>
  <div id="homeView">
    <div class="left">
      <a-divider size="0" />
      <a-carousel
        :autoPlay="true"
        animation-name="card"
        show-arrow="never"
        indicator-position="outer"
        :style="{
          width: '100%',
          height: '240px',
        }"
      >
        <a-carousel-item
          v-for="image in images"
          :key="image"
          :style="{ width: '60%' }"
        >
          <img
            :src="image"
            :style="{
              width: '100%',
            }"
          />
        </a-carousel-item>
      </a-carousel>
      <div class="notice">
        <a-tabs position="top">
          <template #extra>
            <a-button @click="doRefresh">{{ text }}</a-button>
          </template>
          <a-tab-pane key="1" title="Notice 1">
            <MdViewer :value="notice || ''" />
          </a-tab-pane>
          <a-tab-pane key="2" title="Notice 2">
            <a-typography-title :heading="6"> 测试账号：</a-typography-title>
            <a-typography-paragraph copyable> test233</a-typography-paragraph>
            <a-typography-title :heading="6"> 测试密码：</a-typography-title>
            <a-typography-paragraph copyable> 12345678</a-typography-paragraph>
          </a-tab-pane>
          <a-tab-pane key="3" title="Notice 3">
            <a-typography-title :heading="6" delete> 测试</a-typography-title>
            <a-typography-paragraph editable v-model:editText="str">
              {{ str }}
            </a-typography-paragraph>
            <a-typography-paragraph mark> {{ str }}</a-typography-paragraph>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <div class="right" style="display: flex; flex-direction: column">
      <a-divider size="0" />
      <div class="statistic">
        <a-space size="large">
          <a-statistic
            title="提交次数"
            :value="114514"
            show-group-separator
            animation
          />
          <a-statistic
            extra="题库数量"
            :value="2333"
            show-group-separator
            animation
          />
        </a-space>
      </div>
      <a-divider size="1" />
      <div class="pieChart">
        <my-pie-chart></my-pie-chart>
      </div>
      <a-divider size="1" />
      <div class="calendar">
        <es-calendar theme="light" v-model="date" />
      </div>
      <a-divider size="0" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MdViewer from "@/components/MdViewer.vue";
import MyPieChart from "@/components/MyPieChart.vue";

const images = [
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp",
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp",
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp",
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/24e0dd27418d2291b65db1b21aa62254.png~tplv-uwbnlip3yd-webp.webp",
];

const notice =
  "##### 项目介绍 \n\n" +
  "系统使用前后端分离的开发模式，前端由 Vue.js + Arco Design 组件库实现，" +
  "后端基于微服务架构的方法划分为用户管理服务、题库管理服务、代码评测服务、" +
  "队伍管理服务、帖子管理服务和独立的代码沙箱，" +
  "使用 Spring Cloud 框架实现服务之间的通信和服务治理，" +
  "选用 Nacos 作为服务注册中心实现服务发现和注册。\n\n" +
  "##### 项目特色 ~~(bushi~~ \n\n" +
  "- Redis + JWT 实现用户登录鉴权、Redis + Redission 令牌桶算法限流\n\n" +
  "- RabbitMQ 解耦判题服务和题目服务、Docker 代码沙箱\n\n" +
  "- [Markdown 富文本编辑器](https://github.com/bytedance/bytemd) 、" +
  " [Monaco Editor 代码编辑器](https://microsoft.github.io/monaco-editor) 、" +
  " [OpenAPI 前端代码生成器](https://github.com/ferdikoomen/openapi-typescript-codegen) \n\n" +
  "- [ECharts 可视化图表库](https://echarts.apache.org/zh/index.html) 、" +
  " [仿 GitHub 的提交热力图](https://github.com/razorness/vue3-calendar-heatmap) 、" +
  " [仿 Windows 的日历组件](https://github.com/vangleer/es-calendar) \n\n" +
  "- 实现多种设计模式：策略模式、工厂模式、代理模式、模板方法模式\n\n" +
  "##### ~~大概是~~ Todo List: \n\n" +
  "- 实现多种语言代码沙箱 \n\n" +
  "- 实现比赛、评论功能 \n\n" +
  "- 实现死信队列 \n\n" +
  "- 支持图片上传 \n\n" +
  "- 优化题库 \n\n" +
  "- ~~AI判题、第三方判题~~ \n\n" +
  "- ~~开通会员后查看答案~~ \n\n" +
  "";

const str = ref("Click the icon to edit this text.");

const date = ref(new Date());

const count = ref(0);
const text = ref("刷新一下");
const doRefresh = () => {
  count.value++;
  if (count.value == 1) {
    text.value = "刷新完成";
  } else if (count.value == 2) {
    text.value = "状态不错";
  } else if (count.value == 3) {
    text.value = "很好啦";
  } else if (count.value == 4) {
    text.value = "那你点吧";
  } else {
    text.value = "× " + count.value;
  }
};
</script>

<style scoped>
#homeView {
  display: flex;
}

.left {
  width: 75%;
  padding-right: 8vh;
}

.right {
  width: 25%;
  display: flex;
  justify-content: right;
}

.notice {
}

.calendar {
  margin-top: 5%;
  margin-bottom: 5%;
  width: 320px;
  height: 380px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}

.pagination-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
