import {Base64} from 'js-base64';

export default {
  setRouterSession($router, $store) {
    $router
      .beforeEach(async (to, from, next) => {
          const actToken = document.cookie.match(new RegExp(`${process.env.VUE_APP_TOKEN_NAME}=([^;]+)`));
          if (actToken) $store.commit('login/LOGIN_SUCCESS', JSON.parse(Base64.decode(actToken[1].split('.')[1])).user);
          else $store.commit('login/LOGOUT');
          // if route requires auth and user isn't authenticated
          if (!$store.state.login.isLogin) {
            if (to.path === '/closet/current') {
              if (!_.isEmpty(to.query.access_token)) {
                const token = to.query.access_token;
                await $store.dispatch('subscriptions/getFeedbacksDirect', token)
                  .then(res => {
                    // 유저이름 넣기
                    $store.state.login.Authentication.userName = res.data.info.user_name;
                  })
              }
              next();
            }
            if (to.path === '/closet/tomorrow') {
              next();
            }
          }
          next();
        },
      );
  },
};
