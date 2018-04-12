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
const ClosetRespView = () => import('@/components/closet/detail/RespView');
const ClosetNotice = () => import('@/components/closet/detail/notice');
const ClosetMypageSecurity = () => import('@/components/closet/detail/MypageSecurity');
const ClosetMypage = () => import('@/components/closet/detail/Mypage');
const ClosetStyleInfo = () => import('@/components/closet/detail/StyleInfo');
const ClosetCoupon = () => import('@/components/closet/detail/Coupon');

const PageNotFound = () => import('@/components/common/PageNotFound');

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
      meta: {
        title: 'ZULY',
      },
      children: [
        { path: '/', name: 'IndexMain', component: Main, meta: { title: 'ZULY' } },
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
            { path: 'size', component: JoinSize, meta: { mobile: true } },
            { path: 'blouse', component: JoinBlouse, meta: { mobile: true } },
            { path: 'tshirt', component: JoinTshirt, meta: { mobile: true } },
            { path: 'skirt', component: JoinSkirt, meta: { mobile: true } },
            { path: 'knitvest', component: JoinKintVest, meta: { mobile: true } },
            { path: 'shirt', component: JoinShirt, meta: { mobile: true } },
            { path: 'pants', component: JoinPants, meta: { mobile: true } },
            { path: 'onepiece', component: JoinOnePiece, meta: { mobile: true } },
            { path: 'patterns', component: JoinPatterns, meta: { mobile: true } },
            { path: 'material', component: JoinMaterial, meta: { mobile: true } },
            { path: 'styling', component: JoinStyling, meta: { mobile: true } },
            { path: 'requirement', component: JoinRequirement, meta: { mobile: true } },
            {
              path: 'signup',
              component: JoinSignUp,
              children: [
                { path: '1', component: JoinSignUpFirst, alias: '' },
                { path: '2', component: JoinSignUpSecond },
              ],
            },
            { path: 'colors', component: JoinColors, meta: { mobile: true } },
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
            { path: 'cs', component: ClosetRespView },
            { path: 'notice', component: ClosetNotice },
            { path: 'security', component: ClosetMypageSecurity },
            { path: 'mypage', component: ClosetMypage },
            { path: 'style', component: ClosetStyleInfo },
            { path: 'coupon', component: ClosetCoupon },
          ],
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
    {
      path: '*',
      component: PageNotFound,
    },
  ],
});
