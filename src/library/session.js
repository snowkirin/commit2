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
      // if route requires auth and user isn't authenticated
      if (!$store.state.login.isLogin) {
        if (to.path === '/closet/current') {
          if (!_.isEmpty(to.query.access_token)) {
            const token = to.query.access_token;
            await $store
              .dispatch('subscriptions/getFeedbacksDirect', token)
              .then(res => {
                // 유저이름 넣기
                $store.state.login.Authentication.userName =
                  res.data.info.user_name;
              });
          }
          else {
            alert('로그인 하셔야만 이용이 가능합니다.');
            const query = to.fullPath.match(/^\/$/) ? {} : { redirect: to.fullPath };
            next({
              path: '/login',
              query,
            });
          }
          next();
        }
        if (to.path === '/closet/tomorrow') {
          if (!_.isEmpty(to.query.access_token)) {
            console.log('Tomorrow');
          }
          else {
            alert('로그인 하셔야만 이용이 가능합니다.');
            const query = to.fullPath.match(/^\/$/) ? {} : { redirect: to.fullPath };
            next({
              path: '/login',
              query,
            });
          }
          next();
        }
      }
      next();
    });
  }
};
