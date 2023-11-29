<template>
  <div id="userLoginView">
    <a-form
      style="max-width: 480px; margin: 0 auto"
      label-align="left"
      auto-label-width
      :model="form"
      :layout="layout"
      @submit="handleSubmit"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码不少于 8 位" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item :content-flex="false">
        <a-button type="primary" html-type="submit" style="width: 120px"
          >登录
        </a-button>
        <a-button type="secondary" href="/user/register" style="width: 120px"
          >注册
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { UserControllerService, UserLoginRequest } from "../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
// import { useStore } from "vuex";
import useStore from "@/store";

//表单布局
const layout = ref("vertical");

/**
 * 表单信息
 */
const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);

const router = useRouter();
const store = useStore();
const { user } = store;
/**
 * 提交表单
 */
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  // 登录成功跳转到主页
  if (res.code === 0) {
    // await store.dispatch("user/getLoginUser");
    await user.getLoginUser();
    // 将token保存在localStorage中
    localStorage.setItem("token", res.data.token);
    message.success("登录成功，" + res.message);
    router.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error("登录失败，" + res.message);
  }
};
</script>
