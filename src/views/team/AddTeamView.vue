<template>
  <div id="addTeamView">
    <h2>创建队伍</h2>
    <a-divider size="0" />
    <a-form label-align="left" :model="form" :style="{ width: '800px' }">
      <a-form-item field="name" tooltip="请输入队名" label="队伍名称">
        <a-input v-model="form.name" placeholder="请输入队名..." />
      </a-form-item>
      <a-form-item
        field="description"
        tooltip="描述不超过n个字"
        label="队伍描述"
      >
        <a-textarea
          v-model="form.description"
          placeholder="请输入描述..."
          :max-length="{ length: 100, errorOnly: true }"
          :style="{ height: '200px' }"
          allow-clear
          show-word-limit
        />
      </a-form-item>
      <a-form-item field="expireTime" label="队伍过期时间">
        <a-date-picker
          v-model="form.expireTime"
          placeholder="请选择队伍过期时间"
        />
      </a-form-item>
      <a-form-item
        field="maxNum"
        label="队伍最多人数"
        :rules="[{ type: 'number', min: 1, message: '队伍人数不得少于1人' }]"
      >
        <a-slider v-model="form.maxNum" :max="10" />
      </a-form-item>
      <a-form-item field="status" label="队伍状态">
        <a-radio-group v-model="form.status">
          <a-radio value="0">公开</a-radio>
          <a-radio value="1">私有</a-radio>
          <a-radio value="2">加密</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        field="password"
        label="密码"
        v-if="Number(form.status) === 2"
      >
        <a-input-password
          v-model="form.password"
          :style="{ width: '320px' }"
          placeholder="请输入密码"
          allow-clear
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" style="min-width: 200px" @click="doSubmit"
          >创建队伍
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { TeamControllerService } from "@/generated";
import message from "@arco-design/web-vue/es/message";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
// 如果页面地址包含 update，视为更新页面
const updatePage = route.path.includes("update");

let form = ref({
  name: "",
  description: "",
  expireTime: "",
  maxNum: 1,
  status: 0,
  password: "",
});

/**
 * 根据队伍 id 获取老的数据
 */
const loadData = async () => {
  const id = route.query.id;
  if (!id) {
    return;
  }
  const res = await TeamControllerService.getTeamByIdUsingGet(id as any);
  if (res.code === 0) {
    form.value = res.data as any;
    message.error("加载成功，" + res.message);
    console.log(form.value);
  } else {
    message.error("加载失败，" + res.message);
  }
};

onMounted(() => {
  loadData();
});

const doSubmit = async () => {
  console.log(form.value);
  // 区分更新还是创建
  if (updatePage) {
    const res = await TeamControllerService.updateTeamUsingPost(form.value);
    if (res.code === 0) {
      message.success("更新成功");
      await router.push({
        path: `/manage/team`,
        replace: true,
      });
    } else {
      message.error("更新失败，" + res.message);
    }
  } else {
    const res = await TeamControllerService.addTeamUsingPost(form.value);
    if (res.code === 0) {
      message.success("创建成功");
      await router.push({
        path: `/teams`,
        replace: true,
      });
    } else {
      message.error("创建失败，" + res.message);
    }
  }
};
</script>

<style scoped>
#addTeamView {
}
</style>
