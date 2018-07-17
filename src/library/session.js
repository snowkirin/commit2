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
            // closet/current이고
            if (to.path === '/closet/current') {
              // 쿼리문이 있다면
              if (!_.isEmpty(to.query)) {
                const token = to.query.access_token;
                $store.dispatch('login/doFeedbackDirect', token).then(function(res) {
                  if (res.data.result) {
                    $router.options.routes[0].children[7].children[2].meta.requiresAuth = false;
                    next({
                      path: '/closet/current'
                    });
                  } else {
                    const query = to.fullPath.match(/^\/$/) ? {} : { redirect: to.fullPath };
                    next({
                      path: '/login',
                      query,
                    });
                  }
                });
              } else {
                alert('로그인 하셔야만 이용이 가능합니다.');
                const query = to.fullPath.match(/^\/$/) ? {} : { redirect: to.fullPath };
                next({
                  path: '/login',
                  query,
                });
              }
            } else {
              alert('로그인 하셔야만 이용이 가능합니다.');
              const query = to.fullPath.match(/^\/$/) ? {} : { redirect: to.fullPath };
              next({
                path: '/login',
                query,
              });
            }
            return;
          }
        }
        next();
      },
    );
  },
};
