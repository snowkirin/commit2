// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'semantic-ui-css/semantic.min.css';
import Vue from 'vue';
import SuiVue from 'semantic-ui-vue';
import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(SuiVue);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store,
});
