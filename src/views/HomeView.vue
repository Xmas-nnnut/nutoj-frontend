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
            <a-button>Action</a-button>
          </template>
          <a-tab-pane key="1" title="Tab 1">
            <a-typography>
              <a-typography-title :heading="6">这里是通知1</a-typography-title>
              <a-typography-paragraph>
                通过2种方式来实现代码沙箱，其中Java原生代码沙箱和Docker代码沙箱这两种实现方式的核心业务流程是相同的，都需要经历以下几个步骤：
              </a-typography-paragraph>
              <a-typography-paragraph>
                1.把用户的代码保存为文件 编译代码，得到class文件 执行Java代码
              </a-typography-paragraph>
              <a-typography-paragraph>
                2.收集整理输出结果 文件清理，释放空间 错误处理，提升程序健壮性
              </a-typography-paragraph>
              <a-typography-paragraph>
                3.区别在于：Java原生代码沙箱是通过Runtime.exec执行命令行操作来执行代码，并通过Process对象的流来获取输出结果，不够安全；
              </a-typography-paragraph>
              <a-typography-paragraph>
                Docker代码沙箱是通过创建隔离的Java容器并且通过exec命令在容器内执行Java代码和获取输出，更加安全。
              </a-typography-paragraph>
            </a-typography>
          </a-tab-pane>
          <a-tab-pane key="2" title="Tab 2"> 这里是通知2</a-tab-pane>
          <a-tab-pane key="3" title="Tab 3"> 这里是通知3</a-tab-pane>
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
      <div class="calendar">
        <es-calendar theme="light" v-model="date" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MdViewer from "@/components/MdViewer.vue";

const images = [
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp",
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp",
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp",
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/24e0dd27418d2291b65db1b21aa62254.png~tplv-uwbnlip3yd-webp.webp",
];

const date = ref(new Date());
</script>

<style scoped>
#homeView {
  display: flex;
}

.left {
  width: 75%;
  padding-right: 1%;
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
