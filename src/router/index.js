import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "main",
      component: () => import("@/views/Main.vue")
    },
    {
      path: "/product-view",
      name: "product-view",
      component: () => import("@/views/ProductView.vue")
    },
    {
      path: '/join',
      redirect: '/join/size-info',
      component: () => import('@/views/Join.vue'),
      children: [
        {
          path: "size-info",
          name: "size-info",
          component: () => import("@/views/SizeInfo.vue")
        },
        {
          path: "preferred-style",
          name: "preferred-style",
          component: () => import("@/views/PreferredStyle.vue")
        },
        {
          path: "user-info",
          name: "user-info",
          component: () => import("@/views/UserInfo.vue")
        },
      ]
    },
    {
      path: '/closet',
      component: () => import('@/views/Closet.vue'),
      redirect: '/closet/tomorrow',
      children: [
        {
          path: "tomorrow",
          name: "tomorrow",
          component: () => import("@/views/Tomorrow.vue")
        },
        {
          path: "history",
          name: "history",
          component: () => import("@/views/History.vue")
        },
      ]
    },
    {
      path: "/add-info",
      name: "add-info",
      component: () => import("@/views/AddInfo.vue")
    }
  ]
});
