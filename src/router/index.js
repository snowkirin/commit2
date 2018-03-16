import Vue from 'vue';
import Router from 'vue-router';

const Index = () => import('@/components/Index');
const Main = () => import('@/components/main/Index');
const Login = () => import('@/components/login/Index');
const FindId = () => import('@/components/login/FindId');
const Join = () => import('@/components/join/Index');
const JoinSize = () => import('@/components/join/Size');
const JoinClothes = () => import('@/components/join/Clothes');
const JoinPatterns = () => import('@/components/join/Patterns');
const JoinStyling = () => import('@/components/join/Styling');
const JoinRequirement = () => import('@/components/join/Requirement');
const JoinColors = () => import('@/components/join/Colors');
const JoinSignUp = () => import('@/components/join/SignUp');
const JoinSignUpFirst = () => import('@/components/join/signup/first');
const JoinSignUpSecond = () => import('@/components/join/signup/second');
const Closet = () => import('@/components/closet/Index');
const ClosetTomorrow = () => import('@/components/closet/detail/Tomorrow');


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
            { path: 'clothes', component: JoinClothes },
            { path: 'patterns', component: JoinPatterns },
            { path: 'styling', component: JoinStyling },
            { path: 'requirement', component: JoinRequirement },
            {
              path: 'signup',
              component: JoinSignUp,
              children: [
                { path: '1', component: JoinSignUpFirst, alias: '' },
                { path: '2', component: JoinSignUpSecond },
              ],
            },
            { path: 'colors', component: JoinColors },
          ],
        },
        {
          path: '/closet',
          name: 'Closet',
          component: Closet,
          children: [
            { path: '', component: ClosetTomorrow },
            { path: 'tomorrow', component: ClosetTomorrow },
          ],
        },
      ],
    },
  ],
});
