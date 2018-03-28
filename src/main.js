import 'es6-promise/auto';

import Vue from 'vue';
import VueLocalStorage from 'vue-localstorage';
import VeeValidate, { Validator } from 'vee-validate';
import ko from 'vee-validate/dist/locale/ko';
import moment from 'moment';
import VueMomentJS from 'vue-momentjs';
import VueGlobalConst from '@/library/VueGlobalConst';
import VueCommon from '@/library/VueCommon';
import sess from '@/library/session';
import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

moment.locale('ko');

Vue.use(VueMomentJS, moment);

Vue.use(VueLocalStorage);
Vue.use(VueLocalStorage, {
  name: 'zuly',
  bind: true,
});

Vue.use(VueGlobalConst);
Vue.use(VueCommon);
Vue.use(VeeValidate);
Validator.localize('ko', ko);

sess.setRouterSession(router, store);

// eslint-disable-line no-new
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store,
});
