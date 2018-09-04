export default {
  setTitle($router) {
    $router.beforeEach((to, from, next) => {
      if (to.meta.title) document.title = to.meta.title;
      next();
    });
  }
};
