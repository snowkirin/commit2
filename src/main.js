import 'es6-promise/auto';

import Vue from 'vue';
import VueSession from 'vue-session';
import VueLocalStorage from 'vue-localstorage';
import VeeValidate, { Validator } from 'vee-validate';
import ko from 'vee-validate/dist/locale/ko';
import VueCommon from '@/library/VueCommon';
import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(VueLocalStorage);
Vue.use(VueLocalStorage, {
  name: 'zuly',
  bind: true,
});

Vue.use(VueSession);
Vue.use(VueCommon);

Vue.use(VeeValidate);
Validator.localize('ko', ko);

// eslint-disable-line no-new
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store,
});
