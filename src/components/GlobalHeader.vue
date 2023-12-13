<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img class="logo" src="../assets/mlm.png" />
            <div class="title">坚果 oj</div>
          </div>
        </a-menu-item>

        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>

        <a-sub-menu key="1">
          <template #icon>
            <icon-apps></icon-apps>
          </template>
          <template #title>题目</template>
          <a-menu-item v-for="item in questionRoutes" :key="item.path">
            {{ item.name }}
          </a-menu-item>
        </a-sub-menu>

        <a-sub-menu key="2">
          <template #icon>
            <icon-user-group></icon-user-group>
          </template>
          <template #title>队伍</template>
          <a-menu-item v-for="item in teamRoutes" :key="item.path">
            {{ item.name }}
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-col>
    <a-col
      flex="100px"
      div="true"
      style="background-color: #fefefe; position: relative; padding: 14px 20px"
    >
      <div style="text-align: center">
        <a-dropdown trigger="hover">
          <a-avatar :size="50" :style="{ backgroundColor: '#168CFF' }">
            {{ user?.loginUser.userName ?? "未登录" }}
          </a-avatar>
          <template #content>
            <template v-if="user?.loginUser.userRole !== ACCESS_ENUM.NOT_LOGIN">
              <a-doption>
                <template #icon>
                  <icon-idcard />
                </template>
                <template #default>
                  <a-anchor-link href="/about">个人信息</a-anchor-link>
                </template>
              </a-doption>
              <a-doption>
                <template #icon>
                  <icon-poweroff />
                </template>
                <template #default>
                  <a-anchor-link @click="logout">退出登录</a-anchor-link>
                </template>
              </a-doption>
            </template>
            <template v-else>
              <a-doption>
                <template #icon>
                  <icon-user />
                </template>
                <a-anchor-link href="/user/login">用户登录</a-anchor-link>
              </a-doption>
              <a-doption>
                <template #icon>
                  <icon-user-add />
                </template>
                <a-anchor-link href="/user/register">用户注册</a-anchor-link>
              </a-doption>
            </template>
          </template>
        </a-dropdown>
      </div>
    </a-col>
  </a-row>
</template>
<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRoute, useRouter } from "vue-router";
import { computed, ref } from "vue";
import useStore from "@/store";
import checkAccess from "@/access/checkAccess";
import { UserControllerService } from "../generated";
import ACCESS_ENUM from "@/access/accessEnum";

const router = useRouter();

// 展示在菜单的路由数组
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    // 根据权限过滤菜单
    if (!checkAccess(user.loginUser, item?.meta?.access as string)) {
      return false;
    }
    if (item.meta?.group !== "无分组") {
      return false;
    }
    return true;
  });
});
const questionRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    // 根据权限过滤菜单
    if (!checkAccess(user.loginUser, item?.meta?.access as string)) {
      return false;
    }
    if (item.meta?.group !== "题目") {
      return false;
    }
    return true;
  });
});
const teamRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    // 根据权限过滤菜单
    if (!checkAccess(user.loginUser, item?.meta?.access as string)) {
      return false;
    }
    if (item.meta?.group !== "队伍") {
      return false;
    }
    return true;
  });
});
// console.log(visibleRoutes);
// console.log(questionRoutes);
// console.log(teamRoutes);

// 默认主页
const selectedKeys = ref(["/"]);
// 路由跳转后，更新选中的菜单项
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

// 获取已存储的状态变量
const store = useStore();
const { user } = store;
user?.loginUser;

// 获取相关信息

//退出登录
const logout = () => {
  UserControllerService.userLogoutUsingPost();
  // 清除状态保持
  window.localStorage.clear();
  // 状态保持清除后刷新页面
  location.reload();
};
//模拟登录
// setTimeout(() => {
//   store.dispatch("user/getLoginUser", {
//     userName: "xqj",
//     userRole: "admin",
//   });
// }, 3000);
</script>
<style scoped>
#globalHeader {
  box-sizing: border-box;
  width: 100%;
  /*padding: 10px;*/
  /*background-color: var(--color-neutral-2);*/
}

.title-bar {
  display: flex;
  align-items: center;
}

.logo {
  height: 50px;
}

.title {
  color: #444;
  margin-left: 16px;
}
</style>
