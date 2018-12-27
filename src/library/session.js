import { Base64 } from 'js-base64';

export default {
  setRouterSession($router, $store) {
    $router.beforeEach(async (to, from, next) => {
      const actToken = document.cookie.match(
        new RegExp(`${process.env.VUE_APP_TOKEN_NAME}=([^;]+)`)
      );
      if (actToken) {
        const tokenDecode = JSON.parse(Base64.decode(actToken[1].split('.')[1]))
          .user;
        $store.commit('login/LOGIN_SUCCESS', tokenDecode);
      } else $store.commit('login/LOGOUT_SUCCESS');
      if (to.matched.some(record => record.meta.requiresAuth)) {
        // 인증이 필요한 페이지에 들어갔을 경우
        if (!$store.state.login.isAuthenticated) {
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
        if (!$store.state.login.isAuthenticated) {
          if (to.path === '/closet/tomorrow') {
            if (!_.isEmpty(to.query.access_token)) {
              const token = to.query.access_token;
              console.log(token);
              try {
                await $store.dispatch(
                  'closet/FETCH_TOMORROW_DIRECT_DATA',
                  token
                );
                // $store.state.login.User.displayName = result.info.name;
                // $store.state.login.User.userId = result.info.member_id;
                next();
              } catch {
                alert('올바르지 않는 접속입니다.');
                const query = to.fullPath.match(/^\/$/);
                next({
                  path: '/login',
                  query
                });
              }
            } else {
              alert('로그인 하셔야만 이용이 가능합니다.');
              // const query = to.fullPath.match(/^\/$/)
              //   ? {}
              //   : { redirect: to.fullPath };
              next({
                path: '/login'
                // query
              });
            }
          }

          if (to.path === '/closet/current') {
            if (!_.isEmpty(to.query.access_token)) {
              const token = to.query.access_token;
              await $store.dispatch(
                'closet/FETCH_CURRENT_FEEDBACK_DIRECT_DATA',
                token
              );
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
