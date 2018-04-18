import { Base64 } from 'js-base64';

export default {
  setRouterSession($router, $store) {
    $router.beforeEach(
      (to, from, next) => {
        const actToken = document.cookie.match(new RegExp(`${process.env.TOKEN_NAME}=([^;]+)`));

        if (actToken) $store.commit('login/LOGIN_SUCCESS', JSON.parse(Base64.decode(actToken[1].split('.')[1])).user);
        else $store.commit('login/LOGOUT');

        if (to.matched.some(record => record.meta.requiresAuth)) {
          // if route requires auth and user isn't authenticated
          if (!$store.state.login.Authentication.authenticated) {
            alert('로그인 하셔야만 이용이 가능합니다.');
            const query = to.fullPath.match(/^\/$/) ? {} : { redirect: to.fullPath };
            next({
              path: '/login',
              query,
            });

            return;
          }
        }
        next();
      },
    );
  },
};
