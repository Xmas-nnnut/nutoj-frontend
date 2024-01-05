<template>
  <div id="ErrorComponent">
    <a-result status="error" title="加载错误">
      <template #subtitle> 请检查您的网络情况或联系我</template>
      <template #extra>
        <a-space>
          <a-button type="primary" @click="toHome">返回首页</a-button>
        </a-space>
      </template>
    </a-result>
  </div>
</template>
<script setup lang="ts">
import router from "@/router";

/**
 * 回到首页
 * @param question
 */
const toHome = () => {
  router.push({
    path: `/`,
  });
};
</script>
<style scoped>
#ErrorComponent {
}
</style>
