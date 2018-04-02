import Vue from 'vue';
import Router from 'vue-router';

const Index = () => import('@/components/Index');
const Main = () => import('@/components/main/Index');
const Login = () => import('@/components/login/Index');
const FindId = () => import('@/components/login/FindId');
const FindPwd = () => import('@/components/login/FindPwd');
const Success = () => import('@/components/login/Success');
const PwdSuccess = () => import('@/components/login/PwdSuccess');
const Join = () => import('@/components/join/Index');
const JoinSize = () => import('@/components/join/Size');

const JoinBlouse = () => import('@/components/join/clothes/Blouse');
const JoinTshirt = () => import('@/components/join/clothes/Tshirt');
const JoinSkirt = () => import('@/components/join/clothes/Skirt');
const JoinKintVest = () => import('@/components/join/clothes/KnitVest');
const JoinShirt = () => import('@/components/join/clothes/Shirt');
const JoinPants = () => import('@/components/join/clothes/Pants');
const JoinOnePiece = () => import('@/components/join/clothes/OnePiece');

const JoinPatterns = () => import('@/components/join/Patterns');
const JoinMaterial = () => import('@/components/join/Material');
const JoinStyling = () => import('@/components/join/Styling');
const JoinRequirement = () => import('@/components/join/Requirement');
const JoinColors = () => import('@/components/join/Colors');
const JoinSignUp = () => import('@/components/join/SignUp');
const JoinSignUpFirst = () => import('@/components/join/signup/first');
const JoinSignUpSecond = () => import('@/components/join/signup/second');

const Closet = () => import('@/components/closet/Index');
const ClosetTomorrow = () => import('@/components/closet/detail/Tomorrow');
const ClosetCurrent = () => import('@/components/closet/detail/Current');
const ClosetPast = () => import('@/components/closet/detail/past');
const ClosetCustomerService = () => import('@/components/closet/detail/CustomerService');
const ClosetNotice = () => import('@/components/closet/detail/notice');
const ClosetMypageSecurity = () => import('@/components/closet/detail/MypageSecurity');
const ClosetMypage = () => import('@/components/closet/detail/Mypage');
const ClosetStyleInfo = () => import('@/components/closet/detail/StyleInfo');

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
      component: Index,
      children: [
        { path: '/', name: 'IndexMain', component: Main },
        { path: '/login', component: Login },
        { path: '/find/id', component: FindId },
        { path: '/find/id/complete', component: Success },
        { path: '/find/password', component: FindPwd },
        { path: '/find/password/complete', component: PwdSuccess },
        {
          path: '/join',
          name: 'Join',
          component: Join,
          children: [
            { path: 'size', component: JoinSize },
            { path: 'blouse', component: JoinBlouse },
            { path: 'tshirt', component: JoinTshirt },
            { path: 'skirt', component: JoinSkirt },
            { path: 'knitvest', component: JoinKintVest },
            { path: 'shirt', component: JoinShirt },
            { path: 'pants', component: JoinPants },
            { path: 'onepiece', component: JoinOnePiece },
            { path: 'patterns', component: JoinPatterns },
            { path: 'material', component: JoinMaterial },
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
          component: Closet,
          children: [
            { path: '', name: 'ClosetTomorrow', component: ClosetTomorrow },
            { path: 'tomorrow', component: ClosetTomorrow },
            { path: 'current', component: ClosetCurrent },
            { path: 'past', component: ClosetPast },
            { path: 'cs', component: ClosetCustomerService },
            { path: 'notice', component: ClosetNotice },
            { path: 'security', component: ClosetMypageSecurity },
            { path: 'mypage', component: ClosetMypage },
            { path: 'style', component: ClosetStyleInfo },
          ],
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
  ],
});
