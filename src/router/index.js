import Vue from 'vue';
import Router from 'vue-router';

const Index = () => import('@/components/Index');
const Main = () => import('@/components/main/Index');
const Login = () => import('@/components/login/Index');
const FindId = () => import('@/components/login/FindId');
const Join = () => import('@/components/join/Index');
const JoinSize = () => import('@/components/join/Size');

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
        { path: '/login', component: Login },
        { path: '/findid', component: FindId },
        {
          path: '/join',
          name: 'Join',
          component: Join,
          children: [
            { path: 'size', component: JoinSize },
          ],
        },
      ],
    },
  ],
});
