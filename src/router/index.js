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
      path: "/preferred-style",
      name: "preferred-style",
      component: () => import("@/views/PreferredStyle.vue")
    },
    {
      path: "/size-info",
      name: "size-info",
      component: () => import("@/views/SizeInfo.vue")
    },
    {
      path: "/tomorrow",
      name: "tomorrow",
      component: () => import("@/views/Tomorrow.vue")
    },
    {
      path: "/order-info",
      name: "order-info",
      component: () => import("@/views/OrderInfo.vue")
    },
    {
      path: "/add-info",
      name: "add-info",
      component: () => import("@/views/AddInfo.vue")
    }
  ]
});
