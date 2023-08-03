// initial state
import { StoreOptions } from "vuex";

export default {
  namespaced: true,
  //存储的状态信息
  state: () => ({
    loginUser: {
      userName: "未登录",
      role: "notLogin",
    },
  }),
  //执行异步操作，并且触发mutation的更改
  actions: {
    getLoginUser({ commit, state }, payload) {
      // todo 改为远程请求获取登录信息
      commit("updateUser", { userName: "xqj", role: "admin" });
    },
  },
  //定义对变量进行增删改（更新）的方法
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
