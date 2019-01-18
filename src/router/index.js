import Vue from 'vue';
import NProgress from 'nprogress';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
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
      redirect: '/join/size',
      children: [
        {
          path: 'size',
          component: () => import('@/components/join/Size'),
          name: 'Join_Size'
        },
        {
          path: 'preferred-style',
          component: () => import('@/components/join/PreferredStyle'),
          name: 'Join_Preferred-Style'
        },
        {
          path: 'dress-code',
          component: () => import('@/components/join/DressCode'),
          name: 'Join_Dress-Code'
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
      redirect: '/closet/tomorrow',
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
