import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// import store from "./store";
import ArcoVue from "@arco-design/web-vue";
import "bytemd/dist/index.css";
import "@arco-design/web-vue/dist/arco.css";
import "@/plugins/axios";
import "@/access";
// 额外引入图标库
import ArcoVueIcon from "@arco-design/web-vue/es/icon";
import { Modal } from "@arco-design/web-vue";
import "highlight.js/styles/darcula.css";
// 引入日历组件
import "es-calendar/lib/style.css";
import Calendar from "es-calendar";

const store = createPinia();
store.use(piniaPluginPersistedstate);

createApp(App)
  .use(store)
  .use(router)
  .use(ArcoVue)
  .use(ArcoVueIcon)
  .use(Modal)
  .component("es-calendar", Calendar)
  .mount("#app");
