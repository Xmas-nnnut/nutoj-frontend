<template>
  <div id="teamsView">
    <a-form
      :model="searchParams"
      layout="inline"
      style="justify-content: flex-start; align-content: center; margin: 10px"
    >
      <a-form-item field="title" label="名称" style="min-width: 240px">
        <a-input v-model="searchParams.searchText" placeholder="请输入名称" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSubmit">搜索</a-button>
      </a-form-item>
    </a-form>
    <a-divider size="0" />
    <div
      :style="{
        boxSizing: 'border-box',
        width: '100%',
      }"
    >
      <a-row
        :gutter="[24, 24]"
        justify="space-around"
        :style="{ marginBottom: '20px' }"
      >
        <a-col v-for="team in dataList" :key="team.id" :span="8">
          <a-card :bordered="true" hoverable>
            <template #actions>
              <span>
                <a-tooltip content="私密队伍">
                  <span v-if="team.status === 1" class="icon-hover">
                    <icon-eye-invisible />
                  </span>
                </a-tooltip>
                <a-tooltip content="加密队伍">
                  <span v-if="team.status === 2" class="icon-hover">
                    <icon-lock />
                  </span>
                </a-tooltip>
              </span>
              <a-divider direction="vertical" />

              <a-tooltip content="加入队伍">
                <span class="icon-hover" @click="doJoinTeam(team)">
                  <icon-user-add />
                </span>
              </a-tooltip>

              <a-tooltip content="分享队伍">
                <span class="icon-hover" @click="doShareTeam(team.id)">
                  <IconShareInternal />
                </span>
              </a-tooltip>
            </template>
            <template #cover>
              <div
                :style="{
                  height: '204px',
                  overflow: 'hidden',
                }"
              >
                <img
                  :style="{ width: '100%', transform: 'translateY(-25%)' }"
                  alt="dessert"
                  src="../../assets/SilverWolf.png"
                />
              </div>
            </template>
            <a-card-meta :title="team.name" :description="team.description">
              <template #avatar>
                <div
                  :style="{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#1D2129',
                  }"
                >
                  <a-avatar :size="24" :style="{ marginRight: '8px' }">
                    A
                  </a-avatar>
                  <a-typography-text>队长名</a-typography-text>
                </div>
              </template>
            </a-card-meta>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <div class="pagination-wrapper">
      <a-pagination
        :pageSize="searchParams.pageSize"
        :current="searchParams.current"
        :showTotal="true"
        :total="total"
        @change="onChange"
      />
    </div>
    <a-divider size="0" />
    <a-modal
      v-model:visible="visible"
      title="加入队伍"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          padding-bottom: 5%;
        "
      >
        您确定要加入改队伍吗？
      </div>
      <a-form :model="form" v-if="visibleTable">
        <a-form-item field="password" label="请输入密码：">
          <a-input-password
            v-model="form.password"
            :style="{ width: '80%' }"
            placeholder="加入加密队伍需要密码"
            allow-clear
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect, reactive } from "vue";
import { Team, TeamControllerService, TeamQueryRequest } from "../../generated";
import message from "@arco-design/web-vue/es/message";
import * as querystring from "querystring";
import { useRouter } from "vue-router";
import moment from "moment";
import useStore from "@/store";
import { toFormData } from "axios";

const visible = ref(false);
const visibleTable = ref(false);
const dataList = ref([]);
const total = ref(0);
const searchParams = ref<TeamQueryRequest>({
  searchText: "",
  pageSize: 6,
  current: 1,
});
const password = ref("");
const form = reactive({
  password: "",
});
const teamId = ref();

// /**
//  * 获取登录用户信息
//  */
// const store = useStore();
// const { user } = store;
// let loginUser = user.loginUser;

const loadData = async () => {
  // todo
  const res = await TeamControllerService.listTeamsByPageUsingPost(
    searchParams.value
  );
  // const res = {
  //   code: 0,
  //   data: {
  //     records: [
  //       {
  //         id: "1",
  //         name: "测试",
  //         description: "测试",
  //         maxNum: 5,
  //         expireTime: "2024-01-01T00:00:00.000+00:00",
  //         userId: "123",
  //         status: 1,
  //         password: "",
  //         createTime: "2023-11-21T21:44:58.000+00:00",
  //         updateTime: "2023-11-21T21:44:58.000+00:00",
  //         isDelete: 0,
  //       },
  //       {
  //         id: "2",
  //         name: "测试",
  //         description: "测试",
  //         maxNum: 5,
  //         expireTime: "2024-01-01T00:00:00.000+00:00",
  //         userId: "1693169086479011842",
  //         status: 2,
  //         password: "",
  //         createTime: "2023-11-21T21:44:58.000+00:00",
  //         updateTime: "2023-11-21T21:44:58.000+00:00",
  //         isDelete: 0,
  //       },
  //       {
  //         id: "3",
  //         name: "测试",
  //         description: "测试",
  //         maxNum: 5,
  //         expireTime: "2024-01-01T00:00:00.000+00:00",
  //         userId: "1693169086479011842",
  //         status: 0,
  //         password: "",
  //         createTime: "2023-11-21T21:44:58.000+00:00",
  //         updateTime: "2023-11-21T21:44:58.000+00:00",
  //         isDelete: 0,
  //       },
  //       {
  //         id: "4",
  //         name: "测试",
  //         description: "测试",
  //         maxNum: 5,
  //         expireTime: "2024-01-01T00:00:00.000+00:00",
  //         userId: "1693169086479011842",
  //         status: 0,
  //         password: "",
  //         createTime: "2023-11-21T21:44:58.000+00:00",
  //         updateTime: "2023-11-21T21:44:58.000+00:00",
  //         isDelete: 0,
  //       },
  //       {
  //         id: "5",
  //         name: "测试",
  //         description: "测试",
  //         maxNum: 5,
  //         expireTime: "2024-01-01T00:00:00.000+00:00",
  //         userId: "1693169086479011842",
  //         status: 0,
  //         password: "",
  //         createTime: "2023-11-21T21:44:58.000+00:00",
  //         updateTime: "2023-11-21T21:44:58.000+00:00",
  //         isDelete: 0,
  //       },
  //       {
  //         id: "6",
  //         name: "测试",
  //         description: "测试",
  //         maxNum: 5,
  //         expireTime: "2024-01-01T00:00:00.000+00:00",
  //         userId: "1693169086479011842",
  //         status: 0,
  //         password: "",
  //         createTime: "2023-11-21T21:44:58.000+00:00",
  //         updateTime: "2023-11-21T21:44:58.000+00:00",
  //         isDelete: 0,
  //       },
  //     ],
  //     total: "9",
  //     size: "6",
  //     current: "1",
  //     orders: [],
  //     optimizeCountSql: true,
  //     searchCount: true,
  //     countId: null,
  //     maxLimit: null,
  //     pages: "2",
  //   },
  //   message: "ok",
  // };
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
    console.log(dataList);
  } else {
    message.error("加载失败，" + res.message);
  }
};

/**
 * 监听 searchParams 变量，改变时触发页面重新加载
 */
watchEffect(() => {
  loadData();
});

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});

const onChange = (current: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: current,
  };
  console.log("change");
};

const handleClick = (team: Team) => {
  visible.value = true;
};

const handleOk = async () => {
  console.log(form);
  const res = await TeamControllerService.joinTeamUsingPost({
    teamId: teamId.value,
    password: form.password,
  });
  console.log(res);
  // const res = {
  //   code: 0,
  // };
  if (res.code === 0) {
    message.success("加入成功");
    visible.value = false;
  } else {
    message.error("加入失败");
  }
};
const handleCancel = () => {
  visible.value = false;
};

/**
 * 加入队伍
 * @param team
 * @param password
 */
const doJoinTeam = (team: Team) => {
  visible.value = true;
  const teamStatus = team.status;
  visibleTable.value = teamStatus === 2;
  teamId.value = team.id;
};

const doShareTeam = async (id: number) => {
  // const res = await TeamControllerService.addTeamUsingPost(id);
  const res = {
    code: 0,
  };
  if (res.code === 0) {
    message.success("分享成功");
  } else {
    message.error("分享失败");
  }
};

const router = useRouter();

/**
 * 跳转到队伍页面
 * @param team
 */
const toTeamPage = (team: Team) => {
  router.push({
    path: `/view/team/${team.id}`,
  });
};

/**
 * 确认搜索，重新加载数据
 */
const doSubmit = () => {
  // 重置搜索页号
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};
</script>

<style scoped>
#teamsView {
}

.icon-hover {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  transition: all 0.1s;
}

.icon-hover:hover {
  background-color: rgb(var(--gray-2));
}

.pagination-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
