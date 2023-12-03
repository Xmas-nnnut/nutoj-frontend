import { useUserStore } from "@/store/user";

const useStore = () => ({
  user: useUserStore(),
});

export default useStore;

// import { createStore } from "vuex";
//
// import user from "@/store/user";
//
// export default createStore({
//   state: {},
//   getters: {},
//   mutations: {},
//   actions: {},
//   modules: {
//     user,
//   },
// });
