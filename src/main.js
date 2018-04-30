import 'es6-promise/auto';

import Vue from 'vue';
import VueLocalStorage from 'vue-localstorage';
import VeeValidate, { Validator } from 'vee-validate';
import ko from 'vee-validate/dist/locale/ko';
import moment from 'moment';
import VueMomentJS from 'vue-momentjs';
import VueAnalytics from 'vue-analytics';
import VueGlobalConst from '@/library/VueGlobalConst';
import VueCommon from '@/library/VueCommon';
import html from '@/library/htmlinjection';
import sess from '@/library/session';
import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

const isDev = process.env.NODE_ENV === 'development';

moment.locale('ko');

Vue.use(VueMomentJS, moment);

Vue.use(VueLocalStorage);
Vue.use(VueLocalStorage, {
  name: 'zuly',
  bind: true,
});

console.log(process.env.GA_ID);

Vue.use(VueAnalytics, {
  id: process.env.GA_ID,
  router,
  debug: {
    enabled: !isDev,
    sendHitTask: isDev,
  },
  commands: {
    trackName(name = 'unknown') {
      this.$ga.event('randomClicks', 'click', 'name', name);
    },
  },
});

Vue.use(VueGlobalConst);
Vue.use(VueCommon);
Vue.use(VeeValidate);
Validator.localize('ko', ko);

html.setTitle(router);
sess.setRouterSession(router, store);

// eslint-disable-line no-new
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store,
});
