import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";
import router from "./router";
import "./utils/recognizer";
import { Custom } from "./plugins/custom";
import "./assets/styles/main.scss";

Vue.config.productionTip = false;

Vue.use(Custom);

Vue.use(require("vue-shortkey"));

new Vue({
  store,
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
