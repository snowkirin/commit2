import { Base64 } from 'js-base64';

export default {
  setRouterSession($router, $store) {
    $router.beforeEach(async (to, from, next) => {
      const actToken = document.cookie.match(
        new RegExp(`${process.env.VUE_APP_TOKEN_NAME}=([^;]+)`)
      );
      if (actToken)
        $store.commit(
          'login/LOGIN_SUCCESS',
          JSON.parse(Base64.decode(actToken[1].split('.')[1])).user
        );
      else $store.commit('login/LOGOUT');
      if (to.matched.some(record => record.meta.requiresAuth)) {
        // 인증이 필요한 페이지에 들어갔을 경우
        if (!$store.state.login.isLogin) {
          // Login 상태가 아니라면
          alert('로그인 하셔야만 이용이 가능합니다.');
          const query = to.fullPath.match(/^\/$/)
            ? {}
            : { redirect: to.fullPath };
          next({
            path: '/login',
            query
          });
        } else {
          // Login 상태라면
          next();
        }
      } else {
        // 인증이 없어도 되는 페이지가 들어갔는데
        if (!$store.state.login.isLogin) {
          if (to.path === '/closet/current') {
            if (!_.isEmpty(to.query.access_token)) {
              const token = to.query.access_token;
              await $store
                .dispatch('subscriptions/getCurrentFeedbacksDirect', token)
                .then(res => {
                  // 유저이름 넣기
                  if (res.data.result) {
                    $store.state.login.Authentication.userName =
                      res.data.info.user_name;
                  } else {
                    alert('올바른 경로로 접속하지 않으셨습니다.');
                    const query = to.fullPath.match(/^\/$/)
                      ? {}
                      : { redirect: to.fullPath };
                    next({
                      path: '/login',
                      query
                    });
                    return;
                  }
                });
              next();
              return;
            } else {
              alert('로그인 하셔야만 이용이 가능합니다.');
              const query = to.fullPath.match(/^\/$/)
                ? {}
                : { redirect: to.fullPath };
              next({
                path: '/login',
                query
              });
              return;
            }
          }
          if (to.path === '/closet/tomorrow') {
            if (!_.isEmpty(to.query.access_token)) {
              const token = to.query.access_token;
              console.log(token);
              await $store.dispatch('subscriptions/getTomorrowDirect', token)
                .then(res => {
                  console.log(res);
                  $store.state.login.Authentication.userName = res.data.info.name;
                })
              next();
            } else {
              alert('로그인 하셔야만 이용이 가능합니다.');
              const query = to.fullPath.match(/^\/$/)
                ? {}
                : { redirect: to.fullPath };
              next({
                path: '/login',
                query
              });
            }
          }
        } else {
          next();
        }
        next();
      }
    });
  }
};
