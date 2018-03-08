import Vue from 'vue';
import Router from 'vue-router';

const Index = () => import('@/components/Index');
const Main = () => import('@/components/main/Index');

Vue.use(Router);

export default new Router({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        { path: '/', component: Main },
      ],
    },
  ],
});
