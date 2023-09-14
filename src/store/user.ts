// initial state
import ACCESS_ENUM from "@/access/accessEnum";
import { UserControllerService } from "../../generated";

import { StoreOptions } from "vuex";

export default {
  namespaced: true,
  //存储的状态信息
  state: () => ({
    loginUser: {
      userName: "未登录",
    },
  }),
  //执行异步操作，并且触发mutation的更改
  actions: {
    async getLoginUser({ commit, state }, payload) {
      // 从远程请求获取登录信息
      const res = await UserControllerService.getLoginUserUsingGet();
      if (res.code === 0) {
        commit("updateUser", res.data);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userRole: ACCESS_ENUM.NOT_LOGIN,
        });
      }
    },
  },
  //定义对变量进行增删改（更新）的方法
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;

// import { defineStore } from "pinia";
//
// export const useUserStore = defineStore("user", {
//   //存储的状态信息
//   state: () => ({
//     loginUser: {
//       userName: "未登录",
//       id: "0",
//       // userAvatar: string,
//       // userProfile: string,
//       userRole: ACCESS_ENUM.NOT_LOGIN,
//     },
//   }),
//   //执行异步操作，并且触发mutation的更改
//   actions: {
//     async getLoginUser() {
//       // 从远程请求获取登录信息
//       const res = await UserControllerService.getLoginUserUsingGet();
//       if (res.code === 0) {
//         this.updateUser(res.data);
//       } else {
//         this.updateUser({
//           ...this.loginUser,
//           userRole: ACCESS_ENUM.NOT_LOGIN,
//         });
//       }
//     },
//     //定义对变量进行增删改（更新）的方法
//     updateUser(payload: any) {
//       this.loginUser = payload;
//     },
//   },
// });
