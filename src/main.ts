import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
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

const store = createPinia();

createApp(App)
  .use(ArcoVue)
  .use(store)
  .use(router)
  .use(ArcoVueIcon)
  .use(Modal)
  .mount("#app");
