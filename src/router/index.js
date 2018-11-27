import Vue from 'vue';
import NProgress from 'nprogress';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('@/views/Main'),
      name: 'Main'
    },
    {
      path: '/login',
      component: () => import('@/views/Login'),
      name: 'Login'
    },
    {
      // 찾기
      path: '/find',
      component: () => import('@/views/Find'),
      name: 'Find',
      children: [
        {
          // 아이디찾기
          path: 'id-inquiry',
          component: () => import('@/components/find/FindId'),
          alias: ''
        },
        {
          path: 'id-success',
          component: () => import('@/components/find/IdSuccess')
        },
        {
          // 비밀번호찾기
          path: 'pw-inquiry',
          component: () => import('@/components/find/FindPwd')
        },
        {
          path: 'pw-success',
          component: () => import('@/components/find/PwdSuccess')
        }
      ]
    },
    {
      path: '/join',
      component: () => import('@/views/Join.vue'),
      children: [
        {
          path: '',
          component: () => import('@/components/join/Size'),
          name: 'Join_Size'
        },
        {
          path: 'preferred-style',
          component: () => import('@/components/join/PreferredStyle'),
          name: 'Join_Preferred-Style'
        },
        {
          path: 'user-info',
          component: () => import('@/components/join/UserInfo'),
          name: 'Join_User-Info'
        },
        {
          path: 'payment-info',
          component: () => import('@/components/join/PaymentInfo'),
          name: 'Join_Payment-Info'
        },
        {
          path: 'add-info',
          component: () => import('@/components/join/AddInfo'),
          name: 'Join_Add-Info'
        }
      ]
    },
    {
      path: '/closet',
      component: () => import('@/views/Closet.vue'),
      name: 'Closet',
      children: [
        {
          // 내일의 옷장
          path: 'tomorrow',
          component: () => import('@/views/Closet_Tomorrow'),
          name: 'Tomorrow'
        },
        {
          // 현재의 옷장
          path: 'current',
          component: () => import('@/views/Closet_Current'),
          name: 'Current'
        },
        {
          // 과거의 옷장
          path: 'past',
          component: () => import('@/views/Closet_Past'),
          name: 'Past',
          meta: { requiresAuth: true }
        },
        {
          // 스타일 정보
          path: 'style-info',
          component: () => import('@/views/Closet_Style-Info'),
          name: 'StyleInfo',
          meta: { requiresAuth: true }
        },
        {
          // 나의 정보 관리
          path: 'my-info',
          component: () => import('@/views/Closet_My-Info'),
          meta: { requiresAuth: true },
          children: [
            {
              path: '',
              component: () =>
                import('@/components/closet/MyInfo/MypageSecurity')
            },
            {
              path: 'mypage',
              component: () => import('@/components/closet/MyInfo/Mypage')
            }
          ]
        },
        {
          // 구독 정보
          path: 'subscribe-info',
          component: () => import('@/views/Closet_Subscribe-Info'),
          meta: { requiresAuth: true },
          children: [
            {
              path: '',
              component: () =>
                import('@/components/closet/SubscribeInfo/Information')
            },
            {
              path: 'restart',
              component: () =>
                import('@/components/closet/SubscribeInfo/Restart')
            }
          ]
        },
        {
          // FAQ
          path: 'faq',
          component: () => import('@/views/Closet_Faq'),
          name: 'Faq'
        },
        {
          // 공지사항
          path: 'notice',
          component: () => import('@/views/Closet_Notice'),
          name: 'Notice',
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '*',
      component: () => import('@/views/404')
    }

    /*{
      path: '/',
      component: Index,
      meta: {
        title: '줄라이'
      },
      children: [
        {
          path: '/',
          name: 'Zuly_Main',
          component: Main,
          meta: {
            title: '줄라이'
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
              name: 'Closet_Tomorrow_Default',
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
              component: ClosetMypageIndex,
              meta: { requiresAuth: true },
              children: [
                {
                  path: '',
                  name: 'Closet_Security',
                  component: ClosetMypageSecurity,
                  meta: { requiresAuth: true }
                },

                {
                  path: 'mypage',
                  name: 'Closet_Mypage',
                  component: ClosetMypage,
                  meta: { requiresAuth: true }
                }
              ]
            },
            {
              path: 'subscription',
              component: ClosetSubscription,
              meta: { requiresAuth: true },
              children: [
                {
                  path: '',
                  name: 'Closet_Subscription_Info',
                  component: ClosetSubscriptionInfo,
                  meta: { requiresAuth: true }
                },
                {
                  path: 'restart',
                  name: 'Closet_Subscription_Restart',
                  component: ClosetSubscriptionRestart,
                  meta: { requiresAuth: true }
                }
              ]
            },
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
            },
            {
              path: 'faq',
              name: 'Closet_Faq',
              component: () => import('@/components/closet/detail/Faq.vue'),
              meta: { requiresAuth: false }
            }
          ]
        },
        {
          path: '*',
          component: PageNotFound
        }
      ]
    }*/
  ]
});

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
