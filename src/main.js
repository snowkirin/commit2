import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

import modernizr from "modernizr"; // eslint-disable-line no-unused-vars
// https://github.com/mazipan/vue-tiny-lazyload-img
import VueTinyLazyloadImg from "vue-tiny-lazyload-img";
// Polyfill :  https://github.com/w3c/IntersectionObserver/tree/master/polyfill

import VueScrollShow from "vue-scroll-show";
import VuePlyr from "vue-plyr";
import "vue-plyr/dist/vue-plyr.css";

Vue.use(VueTinyLazyloadImg);
Vue.use(VueScrollShow);
Vue.use(VuePlyr);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
