// initial state
import ACCESS_ENUM from "@/access/accessEnum";
import { UserControllerService } from "../generated";

import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  //存储的状态信息
  state: () => ({
    loginUser: {
      userName: "未登录",
      id: "0",
      userRole: ACCESS_ENUM.NOT_LOGIN,
    },
  }),
  actions: {
    async getLoginUser() {
      // 从远程请求获取登录信息
      const res = await UserControllerService.getLoginUserUsingGet();
      if (res.code === 0) {
        this.updateUser(res.data);
      } else {
        this.updateUser({
          ...this.loginUser,
          userRole: ACCESS_ENUM.NOT_LOGIN,
        });
      }
    },
    //定义对变量进行增删改（更新）的方法
    updateUser(payload: any) {
      this.loginUser = payload;
    },
  },
  // 所有数据持久化
  persist: true,
  // 持久化存储插件其他配置
  // persist: {
  //   // 修改存储中使用的键名称，默认为当前 Store的 id
  //   key: "user",
  //   // 修改为 sessionStorage，默认为 localStorage
  //   storage: window.sessionStorage,
  //   // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
  //   paths: ["loginUser.data"],
  // },
});

// import { StoreOptions } from "vuex";
//
// export default {
//   namespaced: true,
//   //存储的状态信息
//   state: () => ({
//     loginUser: {
//       userName: "未登录",
//     },
//   }),
//   //执行异步操作，并且触发mutation的更改
//   actions: {
//     async getLoginUser({ commit, state }, payload) {
//       // 从远程请求获取登录信息
//       const res = await UserControllerService.getLoginUserUsingGet();
//       if (res.code === 0) {
//         commit("updateUser", res.data);
//       } else {
//         commit("updateUser", {
//           ...state.loginUser,
//           userRole: ACCESS_ENUM.NOT_LOGIN,
//         });
//       }
//     },
//   },
//   //定义对变量进行增删改（更新）的方法
//   mutations: {
//     updateUser(state, payload) {
//       state.loginUser = payload;
//     },
//   },
// } as StoreOptions<any>;
