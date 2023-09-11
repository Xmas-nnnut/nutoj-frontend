<template>
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
  <a-typography>
    <a-typography-title :heading="5">这里是首页</a-typography-title>
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
</template>

<script setup lang="ts">
const images = [
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp",
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp",
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp",
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/24e0dd27418d2291b65db1b21aa62254.png~tplv-uwbnlip3yd-webp.webp",
];
</script>
