import { createStore } from "vuex";

import user from "@/store/user";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user,
  },
});

// import { useUserStore } from "@/store/user";
//
// export default function useStore() {
//   return {
//     user: useUserStore(),
//   };
// }
