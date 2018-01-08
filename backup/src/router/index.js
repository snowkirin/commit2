import Vue from 'vue';
import Router from 'vue-router';
import MainContent from '@/components/main/MainContent';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: MainContent,
    },
  ],
});
