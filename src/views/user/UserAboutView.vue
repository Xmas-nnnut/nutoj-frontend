<template>
  <div id="userInfoView">
    <div class="left">
      <a-divider size="0" />
      <a-card hoverable>
        <a-avatar :size="180" shape="square" style="margin-left: 8vh">
          <img alt="avatar" src="../../assets/SilverWolf.png" />
        </a-avatar>
      </a-card>
      <a-divider size="0" />
      <a-card title="我的信息" hoverable>
        <a-descriptions :data="data" size="large" column="1" bordered />
        <template #extra>
          <a-button
            status="success"
            type="primary"
            size="mini"
            style="margin: 10px"
            @click="toHome"
            >返回首页
          </a-button>
          <a-button
            status="normal"
            type="primary"
            size="mini"
            @click="openModalForm"
            >修改信息
          </a-button>
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
            <a-input
              v-model="updateForm.userName"
              placeholder="请输入用户名称"
            />
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
      <a-divider size="0" />
      <a-card hoverable>
        <span>
          <a-typography-title :heading="6"> 给个评分吧！</a-typography-title>
        </span>
        <span><a-rate grading /></span>
        <a-divider size="0" />
      </a-card>
      <a-divider size="0" />
    </div>
    <div class="right">
      <a-divider size="0" />
      <a-card hoverable title="提交信息">
        <template #extra>
          <a-button type="text" @click="toMySubmit">查看详情</a-button>
        </template>
        <div>
          <submission-chart />
        </div>
      </a-card>
      <a-divider size="0" />
      <a-card hoverable>
        <a-divider size="0" />
        <a-timeline mode="alternate">
          <a-timeline-item label="2017-03-10"
            >The first milestone
          </a-timeline-item>
          <a-timeline-item label="2018-05-12"
            >The second milestone
          </a-timeline-item>
          <a-timeline-item label="2020-09-30"
            >The third milestone
          </a-timeline-item>
        </a-timeline>
      </a-card>
      <a-divider size="0" />
    </div>
  </div>
</template>
<script setup lang="ts">
// import { useStore } from "vuex";
import useStore from "@/store";
import {
  FileControllerService,
  UserControllerService,
  UserUpdateMyRequest,
} from "../../generated";
import { ref } from "vue";
import { FileItem, Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
import moment from "moment";
import SubmissionChart from "@/components/SubmissionChart.vue";

const router = useRouter();
const file = ref();
/**
 * 获取用户信息
 */
const store = useStore();
const { user } = store;
let loginUser = user.loginUser;

const data = [
  {
    label: "用户名称：",
    value: loginUser.userName,
  },
  // {
  //   label: "账号名称：",
  //   value: loginUser.userAccount,
  // },
  {
    label: "我的简介：",
    value: loginUser.userProfile !== "" ? loginUser.userProfile : "暂无简介",
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
  // {
  //   label: "当前状态：",
  //   value: loginUser.userState !== "" ? loginUser.userState : "暂无简介",
  // },
  //
  // {
  //   label: "创建时间：",
  //   value: moment(loginUser.createTime).format("YYYY-MM-DD HH:mm:ss"),
  // },
  // {
  //   label: "修改时间：",
  //   value: moment(loginUser.updateTime).format("YYYY-MM-DD HH:mm:ss"),
  // },
];

const visible = ref(false);
const updateForm = ref<UserUpdateMyRequest>({
  ...user?.loginUser,
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
 * 跳转题目提交信息
 * @param team
 */
const toMySubmit = () => {
  router.push({
    path: "/my/questions_submit",
  });
};

/**
 * 回到首页
 * @param question
 */
const toHome = () => {
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
  display: flex;
}

.left {
  width: 30%;
  padding-right: 6vh;
}

.right {
  width: 70%;
}
</style>
