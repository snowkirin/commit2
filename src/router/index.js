import Vue from 'vue';
import Router from 'vue-router';

import Index from '../views/Home.vue';
import Main from '@/components/main/Index.vue';

import LoginIndex from '@/components/login/Index.vue';
import Login from '@/components/login/Login.vue';
import FindId from '@/components/login/FindId.vue';
import FindPwd from '@/components/login/FindPwd.vue';
import Success from '@/components/login/Success.vue';
import PwdSuccess from '@/components/login/PwdSuccess.vue';

import Join from '@/components/join/Index.vue';
import JoinSize from '@/components/join/Size.vue';
import JoinPreferredStyle from '@/components/join/PreferredStyle.vue';
import JoinSignUp from '@/components/join/SignUp.vue';
import JoinSignUpFirst from '@/components/join/signup/first.vue';
import JoinSignUpSecond from '@/components/join/signup/second.vue';
import JoinAddInfo from '@/components/join/AddInfo.vue';

import Closet from '@/components/closet/Index.vue';
import ClosetTomorrow from '@/components/closet/detail/Tomorrow.vue';
import ClosetCurrent from '@/components/closet/detail/Current.vue';
import ClosetPast from '@/components/closet/detail/Past.vue';
import ClosetCustomerService from '@/components/closet/detail/CustomerService.vue';
import ClosetNotice from '@/components/closet/detail/Notice.vue';
import ClosetMypageIndex from '@/components/closet/detail/MypageIndex.vue'
import ClosetMypageSecurity from '@/components/closet/detail/MypageSecurity.vue';
import ClosetMypage from '@/components/closet/detail/Mypage.vue';
import ClosetStyleInfo from '@/components/closet/detail/StyleInfo.vue';
import ClosetCoupon from '@/components/closet/detail/Coupon.vue';

import PageNotFound from '@/components/common/PageNotFound.vue';

Vue.use(Router);

const router = new Router({
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
        title: 'ZULY'
      },
      children: [
        {
          path: '/',
          name: 'Zuly_Main',
          component: Main,
          meta: {
            title: 'ZULY'
          }
        },
        {
          path: '/login',
          component: LoginIndex,
          children: [
            {
              path: '',
              name: 'Login',
              component: Login
            },
            {
              path: '/find/id',
              name: 'Login_FindId',
              component: FindId
            },
            {
              path: '/find/id/complete',
              name: 'Login_FindIdSuccess',
              component: Success
            },
            {
              path: '/find/password',
              name: 'Login_FindPwd',
              component: FindPwd
            },
            {
              path: '/find/password/complete',
              name: 'Login_FindPwdSuccess',
              component: PwdSuccess
            }
          ]
        },
        {
          path: '/join',
          name: 'Join',
          component: Join,
          children: [
            {
              path: 'size',
              name: 'Join_Size',
              component: JoinSize
            },
            {
              path: 'preferred-style',
              name: 'Join_PreferredStyle',
              component: JoinPreferredStyle
            },
            {
              path: 'signup',
              name: 'Join_Signup',
              component: JoinSignUp,
              children: [
                {
                  path: '1',
                  name: 'Join_SignupFirst',
                  component: JoinSignUpFirst,
                  alias: ''
                },
                {
                  path: '2',
                  name: 'Join_SignupSecond',
                  component: JoinSignUpSecond
                }
              ]
            },
            {
              path: 'addinfo',
              name: 'Join_AddInfo',
              component: JoinAddInfo
            }
          ]
        },
        {
          path: '/closet',
          component: Closet,
          children: [
            {
              path: '',
              name: 'Closet_Tomorrow',
              component: ClosetTomorrow,
              meta: { requiresAuth: false }
            },
            {
              path: 'tomorrow',
              name: 'Closet_Tomorrow',
              component: ClosetTomorrow,
              meta: { requiresAuth: false }
            },
            {
              path: 'current',
              name: 'Closet_Current',
              component: ClosetCurrent,
              meta: { requiresAuth: false }
            },
            {
              path: 'past',
              name: 'Closet_Past',
              component: ClosetPast,
              meta: { requiresAuth: true }
            },
            {
              path: 'cs',
              name: 'Closet_CustomerService',
              component: ClosetCustomerService,
              meta: { requiresAuth: true }
            },
            {
              path: 'notice',
              name: 'Closet_Notice',
              component: ClosetNotice,
              meta: { requiresAuth: true }
            },
            {
              path: 'security',
              name: 'Closet_MypageIndex',
              component: ClosetMypageIndex,
              meta: { requiresAuth: true },
              children: [
                {
                  path: '',
                  name: 'Closet_Security',
                  component: ClosetMypageSecurity,
                  meta: { requiresAuth: true },
                },

                {
                  path: 'mypage',
                  name: 'Closet_Mypage',
                  component: ClosetMypage,
                  meta: { requiresAuth: true }
                }
              ]
            },
            /*{
              path: 'security',
              name: 'Closet_Security',
              component: ClosetMypageSecurity,
              meta: { requiresAuth: true },
              children: [
                {
                  path: 'mypage',
                  name: 'Closet_Mypage',
                  component: ClosetMypage,
                  meta: { requiresAuth: true }
                }
              ]
            },*/
            {
              path: 'style',
              name: 'Closet_StyleInfo',
              component: ClosetStyleInfo,
              meta: { requiresAuth: true }
            },
            {
              path: 'coupon',
              name: 'Closet_Coupon',
              component: ClosetCoupon,
              meta: { requiresAuth: true }
            }
          ]
        },
        {
          path: '*',
          component: PageNotFound
        }
      ]
    }
  ]
});

// router.beforeResolve((to, from, next) => {
//   if (to.name) {
//     NProgress.start();
//   }
//   next();
// });
//
// router.afterEach((to, from) => {
//   NProgress.done();
// });

export default router;
