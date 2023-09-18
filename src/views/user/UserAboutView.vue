<template>
  <div id="userInfoView">
    <a-row justify="center" style="margin: 15px">
      <a-col style="text-align: center">
        <a-descriptions-item>
          <!--      <a-avatar :size="100" shape="circle">-->
          <!--        <img alt="头像" :src="loginUser.userAvatar" />-->
          <!--      </a-avatar>-->
          <a-avatar
            :size="80"
            shape="circle"
            :style="{ backgroundColor: '#168CFF' }"
          >
            {{ store.state.user?.loginUser.userName ?? "未登录" }}
          </a-avatar>
        </a-descriptions-item>
      </a-col>
    </a-row>
    <a-card title="我的信息">
      <a-descriptions :data="data" size="large" column="1" bordered />
      <template #extra>
        <a-badge status="success" text="在线" />
      </template>
    </a-card>
    <a-modal
      width="30%"
      :visible="visible"
      placement="right"
      @ok="handleOk"
      @cancel="closeModel"
      unmountOnClose
    >
      <!--      <div style="text-align: center">-->
      <!--        <a-upload-->
      <!--          action="/"-->
      <!--          :fileList="file ? [file] : []"-->
      <!--          :show-file-list="false"-->
      <!--          @change="onChange"-->
      <!--          :custom-request="uploadAvatar"-->
      <!--        >-->
      <!--          <template #upload-button>-->
      <!--            <div-->
      <!--              class="arco-upload-list-picture custom-upload-avatar"-->
      <!--              v-if="updateForm.userAvatar"-->
      <!--            >-->
      <!--              <a-avatar :size="70" shape="circle">-->
      <!--                <img alt="头像" :src="userAvatarImg" />-->
      <!--              </a-avatar>-->
      <!--              <div class="arco-upload-list-picture-mask">-->
      <!--                <IconEdit />-->
      <!--              </div>-->
      <!--            </div>-->
      <!--          </template>-->
      <!--        </a-upload>-->
      <!--      </div>-->
      <a-form
        :model="loginUser"
        label-align="right"
        title="个人信息"
        style="max-width: 480px; margin: 0 auto"
      >
        <a-form-item field="用户名称" label="账号 :">
          <a-input v-model="updateForm.userName" placeholder="请输入用户名称" />
        </a-form-item>
        <!--        <a-form-item field="邮箱" label="邮箱 :">-->
        <!--          <a-input v-model="updateForm.email" placeholder="请输入邮箱" />-->
        <!--        </a-form-item>-->
        <!--        <a-form-item field="电话" label="电话 :">-->
        <!--          <a-input v-model="updateForm.phone" placeholder="请输入电话号码" />-->
        <!--        </a-form-item>-->
        <a-form-item field="userProfile" label="简介 :">
          <a-textarea
            v-model="updateForm.userProfile"
            placeholder="请输入简介"
          />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-row justify="center" style="margin: 5px">
      <a-col style="text-align: center">
        <a-button
          status="success"
          size="small"
          type="primary"
          style="margin: 10px"
        >
          <a-link @click="toIndex">返回首页</a-link>
        </a-button>
        <a-button
          status="normal"
          size="medium"
          type="primary"
          style="margin: 10px"
          @click="openModalForm"
          >修改信息
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>
<script setup lang="ts">
import { useStore } from "vuex";
import {
  FileControllerService,
  UserControllerService,
  UserUpdateMyRequest,
} from "../../../generated";
import { ref } from "vue";
import { FileItem, Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
import moment from "moment";

const router = useRouter();
const file = ref();
/**
 * 获取用户信息
 */
const store = useStore();
let loginUser = store.state.user.loginUser;

const data = [
  {
    label: "用户名称：",
    value: loginUser.userName,
  },
  {
    label: "账号名称：",
    value: loginUser.userAccount,
  },
  {
    label: "我的简介：",
    value: loginUser.userProfile,
  },
  {
    label: "用户角色：",
    value: loginUser.userRole === "user" ? "普通用户" : "管理员",
  },
  // {
  //   label: "邮箱：",
  //   value: loginUser.email !== "" ? loginUser.email : "未填写",
  // },
  // {
  //   label: "电话：",
  //   value: loginUser.phone !== "" ? loginUser.phone : "未填写",
  // },
  {
    label: "当前状态：",
    value: loginUser.userState !== "" ? loginUser.userState : "暂无简介",
  },

  {
    label: "创建时间：",
    value: moment(loginUser.createTime).format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    label: "修改时间：",
    value: moment(loginUser.updateTime).format("YYYY-MM-DD HH:mm:ss"),
  },
];

const visible = ref(false);
const updateForm = ref<UserUpdateMyRequest>({
  ...store.state.user?.loginUser,
});

// 从表单中获取的用户头像
// let userAvatarImg = updateForm.value.userAvatar;

/**
 * 上传头像
 */
// const uploadAvatar = async () => {
//   const res = await FileControllerService.uploadOssFileUsingPost(
//     file?.value.file
//   );
//   if (res.code === 0) {
//     userAvatarImg = res.data;
//     Message.success("上传成功，点击确认即可修改头像");
//   } else {
//     Message.error("上传失败！" + res.data);
//   }
// };
/**
 * 打开弹窗
 */
const openModalForm = () => {
  visible.value = true;
};
/**
 * 确定修改按钮
 */
const handleOk = async () => {
  const res = await UserControllerService.updateMyUserUsingPost({
    ...updateForm.value,
    // userAvatar: userAvatarImg,
  });
  if (res.code === 0) {
    Message.success("更新成功！");
    visible.value = false;
    location.reload();
  } else {
    Message.error("更新失败！", res.msg);
  }
};
const closeModel = () => {
  visible.value = false;
};
/**
 * 回到首页
 * @param question
 */
const toIndex = () => {
  router.push({
    path: `/`,
  });
};
const onChange = async (_: never, currentFile: FileItem) => {
  file.value = {
    ...currentFile,
  };
};
</script>

<style scoped>
#userInfoView {
  margin: 0 auto;
  padding: 10px;
  max-width: 820px;
}
</style>
