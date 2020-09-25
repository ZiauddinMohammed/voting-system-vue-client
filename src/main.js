import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Routes from "./routes";
import store from "./store";

import {
  BootstrapVue,
  IconsPlugin,
  LayoutPlugin,
  CardPlugin,
  ListGroupPlugin,
  ButtonPlugin,
  NavPlugin,
  SidebarPlugin,
  BadgePlugin,
  TablePlugin,
  FormPlugin,
  FormGroupPlugin,
  FormInputPlugin,
  AlertPlugin,
  SpinnerPlugin
} from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(LayoutPlugin);
Vue.use(CardPlugin);
Vue.use(ButtonPlugin);
Vue.use(ListGroupPlugin);
Vue.use(SidebarPlugin);
Vue.use(BadgePlugin);
Vue.use(NavPlugin);
Vue.use(TablePlugin);
Vue.use(FormPlugin);
Vue.use(FormGroupPlugin);
Vue.use(FormInputPlugin);
Vue.use(AlertPlugin);
Vue.use(SpinnerPlugin);
Vue.config.productionTip = false;

const router = new VueRouter({
  routes: Routes,
  history:true
});

new Vue({
  render: h => h(App),
  router: router,
  store,
}).$mount("#app");
