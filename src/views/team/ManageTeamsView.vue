<template>
  <div id="manageTeamsView">
    <div class="left">
      <h2>我创建的队伍</h2>
      <a-divider size="0" />
      <a-list>
        <a-list-item v-for="team in dataCreatList" :key="team.id">
          <a-list-item-meta :title="team.name" :description="team.description">
            <template #avatar>
              <a-avatar shape="square">
                <img alt="avatar" src="../../assets/SilverWolf.png" />
              </a-avatar>
            </template>
          </a-list-item-meta>
          <template #actions>
            <span>
              <a-tooltip content="加密队伍">
                <span v-if="team.status === 1" class="icon-hover">
                  <icon-lock />
                </span>
              </a-tooltip>
              <a-tooltip content="私密队伍">
                <span v-if="team.status === 2" class="icon-hover">
                  <icon-eye-invisible />
                </span>
              </a-tooltip>
            </span>
            <a-tooltip content="分享队伍">
              <span class="icon-hover" @click="doShareTeam(team.id)">
                <IconShareInternal />
              </span>
            </a-tooltip>
            <a-dropdown trigger="hover">
              <span class="icon-hover">
                <IconMore />
              </span>
              <template #content>
                <a-doption @click="toTeamPage(team)">
                  <icon-edit />
                  修改队伍
                </a-doption>
                <a-doption>
                  <icon-export @click="doQuitTeam(team.id)" />
                  退出队伍
                </a-doption>
                <a-doption>
                  <icon-delete @click="doDeleteTeam(team.id)" />
                  解散队伍
                </a-doption>
              </template>
            </a-dropdown>
          </template>
          <template #extra>
            <div class="captain" style="padding-top: 4%">
              <a-divider direction="vertical" />
              <a-avatar-group :size="42" :max-count="3">
                <a-avatar :style="{ backgroundColor: '#7BC616' }">A</a-avatar>
                <a-avatar :style="{ backgroundColor: '#14C9C9' }">B</a-avatar>
                <a-avatar :style="{ backgroundColor: '#168CFF' }">C</a-avatar>
                <a-avatar :style="{ backgroundColor: '#FF7D00' }"
                  >Arco
                </a-avatar>
                <a-avatar :style="{ backgroundColor: '#FFC72E' }"
                  >Design
                </a-avatar>
              </a-avatar-group>
            </div>
          </template>
        </a-list-item>
      </a-list>
      <div v-if="totalCreat == 0">
        <a-result
          :status="null"
          title="没有数据捏"
          subtitle="抱歉，您还没有创建任何队伍"
        >
          <template #icon>
            <IconFaceSmileFill />
          </template>
          <template #extra>
            <a-space>
              <a-button type="secondary">我要刷新</a-button>
              <a-button type="primary">我去创建</a-button>
            </a-space>
          </template>
        </a-result>
      </div>
    </div>
    <a-divider direction="vertical" />
    <div class="right">
      <h2>我加入的队伍</h2>
      <a-divider size="0" />
      <a-list>
        <a-list-item v-for="team in dataJoinList" :key="team.id">
          <a-list-item-meta :title="team.name" :description="team.description">
            <template #avatar>
              <a-avatar shape="square">
                <img alt="avatar" src="../../assets/SilverWolf.png" />
              </a-avatar>
            </template>
          </a-list-item-meta>
          <template #actions>
            <span>
              <a-tooltip content="加密队伍">
                <span v-if="team.status === 1" class="icon-hover">
                  <icon-lock />
                </span>
              </a-tooltip>
              <a-tooltip content="私密队伍">
                <span v-if="team.status === 2" class="icon-hover">
                  <icon-eye-invisible />
                </span>
              </a-tooltip>
            </span>
            <a-tooltip content="分享队伍">
              <span class="icon-hover" @click="doShareTeam(team.id)">
                <IconShareInternal />
              </span>
            </a-tooltip>
            <a-tooltip content="退出队伍">
              <span class="icon-hover" @click="doQuitTeam(team.id)">
                <icon-export />
              </span>
            </a-tooltip>
          </template>
          <template #extra>
            <div class="captain" style="padding-top: 4%">
              <a-divider direction="vertical" />
              <a-avatar :size="42" :style="{ backgroundColor: '#14a9f8' }"
                >Arco
              </a-avatar>
              <a-divider direction="vertical" />
              <a-typography-text>队长名</a-typography-text>
            </div>
          </template>
        </a-list-item>
      </a-list>
      <div v-if="totalJoin == 0">
        <a-result
          :status="null"
          title="没有数据捏"
          subtitle="抱歉，您还没有加入任何队伍"
        >
          <template #icon>
            <IconFaceSmileFill />
          </template>
          <template #extra>
            <a-space>
              <a-button type="secondary">我要刷新</a-button>
              <a-button type="primary">我去加入</a-button>
            </a-space>
          </template>
        </a-result>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { Team, TeamControllerService, TeamQueryRequest } from "../../generated";
import message from "@arco-design/web-vue/es/message";
import * as querystring from "querystring";
import { useRouter } from "vue-router";
import moment from "moment";
import useStore from "@/store";

const dataCreatList = ref([]);
const dataJoinList = ref([]);
const totalCreat = ref(0);
const totalJoin = ref(0);

/**
 * 获取登录用户信息
 */
const store = useStore();
const { user } = store;
let loginUser = user.loginUser;

const searchParams = ref<TeamQueryRequest>({
  id: Number(loginUser.id),
  // searchText: "",
  // pageSize: 6,
  // current: 1,
});

const loadData = async () => {
  // const resCreate = await TeamControllerService.listMyCreateTeamsUsingPost(
  //   searchParams.value
  // );
  // const resJoin = await TeamControllerService.listMyJoinTeamsUsingPost(
  //   searchParams.value
  // );
  const resJoin = {
    code: 0,
    data: {
      records: [
        {
          id: "1",
          name: "测试",
          description: "测试",
          maxNum: 5,
          expireTime: "2024-01-01T00:00:00.000+00:00",
          userId: "123",
          status: 1,
          password: "",
          createTime: "2023-11-21T21:44:58.000+00:00",
          updateTime: "2023-11-21T21:44:58.000+00:00",
          isDelete: 0,
        },
        {
          id: "2",
          name: "测试",
          description: "测试",
          maxNum: 5,
          expireTime: "2024-01-01T00:00:00.000+00:00",
          userId: "1693169086479011842",
          status: 2,
          password: "",
          createTime: "2023-11-21T21:44:58.000+00:00",
          updateTime: "2023-11-21T21:44:58.000+00:00",
          isDelete: 0,
        },
        {
          id: "3",
          name: "测试",
          description: "测试",
          maxNum: 5,
          expireTime: "2024-01-01T00:00:00.000+00:00",
          userId: "1693169086479011842",
          status: 0,
          password: "",
          createTime: "2023-11-21T21:44:58.000+00:00",
          updateTime: "2023-11-21T21:44:58.000+00:00",
          isDelete: 0,
        },
        {
          id: "4",
          name: "测试",
          description: "测试",
          maxNum: 5,
          expireTime: "2024-01-01T00:00:00.000+00:00",
          userId: "1693169086479011842",
          status: 0,
          password: "",
          createTime: "2023-11-21T21:44:58.000+00:00",
          updateTime: "2023-11-21T21:44:58.000+00:00",
          isDelete: 0,
        },
        {
          id: "5",
          name: "测试",
          description: "测试",
          maxNum: 5,
          expireTime: "2024-01-01T00:00:00.000+00:00",
          userId: "1693169086479011842",
          status: 0,
          password: "",
          createTime: "2023-11-21T21:44:58.000+00:00",
          updateTime: "2023-11-21T21:44:58.000+00:00",
          isDelete: 0,
        },
        {
          id: "6",
          name: "测试",
          description: "测试",
          maxNum: 5,
          expireTime: "2024-01-01T00:00:00.000+00:00",
          userId: "1693169086479011842",
          status: 0,
          password: "",
          createTime: "2023-11-21T21:44:58.000+00:00",
          updateTime: "2023-11-21T21:44:58.000+00:00",
          isDelete: 0,
        },
      ],
      total: "9",
      size: "6",
      current: "1",
      orders: [],
      optimizeCountSql: true,
      searchCount: true,
      countId: null,
      maxLimit: null,
      pages: "2",
    },
    message: "ok",
  };
  const resCreate = {
    code: 0,
    data: {
      records: [
        {
          id: "1",
          name: "测试",
          description: "测试",
          maxNum: 5,
          expireTime: "2024-01-01T00:00:00.000+00:00",
          userId: "123",
          status: 1,
          password: "",
          createTime: "2023-11-21T21:44:58.000+00:00",
          updateTime: "2023-11-21T21:44:58.000+00:00",
          isDelete: 0,
        },
        {
          id: "2",
          name: "测试",
          description: "测试",
          maxNum: 5,
          expireTime: "2024-01-01T00:00:00.000+00:00",
          userId: "1693169086479011842",
          status: 2,
          password: "",
          createTime: "2023-11-21T21:44:58.000+00:00",
          updateTime: "2023-11-21T21:44:58.000+00:00",
          isDelete: 0,
        },
        {
          id: "3",
          name: "测试",
          description: "测试",
          maxNum: 5,
          expireTime: "2024-01-01T00:00:00.000+00:00",
          userId: "1693169086479011842",
          status: 0,
          password: "",
          createTime: "2023-11-21T21:44:58.000+00:00",
          updateTime: "2023-11-21T21:44:58.000+00:00",
          isDelete: 0,
        },
        {
          id: "4",
          name: "测试",
          description: "测试",
          maxNum: 5,
          expireTime: "2024-01-01T00:00:00.000+00:00",
          userId: "1693169086479011842",
          status: 0,
          password: "",
          createTime: "2023-11-21T21:44:58.000+00:00",
          updateTime: "2023-11-21T21:44:58.000+00:00",
          isDelete: 0,
        },
        {
          id: "5",
          name: "测试",
          description: "测试",
          maxNum: 5,
          expireTime: "2024-01-01T00:00:00.000+00:00",
          userId: "1693169086479011842",
          status: 0,
          password: "",
          createTime: "2023-11-21T21:44:58.000+00:00",
          updateTime: "2023-11-21T21:44:58.000+00:00",
          isDelete: 0,
        },
        {
          id: "6",
          name: "测试",
          description: "测试",
          maxNum: 5,
          expireTime: "2024-01-01T00:00:00.000+00:00",
          userId: "1693169086479011842",
          status: 0,
          password: "",
          createTime: "2023-11-21T21:44:58.000+00:00",
          updateTime: "2023-11-21T21:44:58.000+00:00",
          isDelete: 0,
        },
      ],
      total: "9",
      size: "6",
      current: "1",
      orders: [],
      optimizeCountSql: true,
      searchCount: true,
      countId: null,
      maxLimit: null,
      pages: "2",
    },
    message: "ok",
  };
  if (resCreate.code === 0) {
    dataCreatList.value = resCreate.data.records;
    totalCreat.value = resCreate.data.total;
  } else {
    message.error("加载创建列表失败，" + resCreate.message);
  }
  if (resJoin.code === 0) {
    dataJoinList.value = resJoin.data.records;
    totalJoin.value = resJoin.data.total;
  } else {
    message.error("加载加入列表失败，" + resJoin.message);
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
#manageTeamsView {
  display: flex;
}

#manageTeamsView .left {
  flex: 1;
  margin-right: 1%;
}

#manageTeamsView .right {
  flex: 1;
  margin-left: 1%;
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
