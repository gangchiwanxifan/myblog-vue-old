import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import "./components/NProgress/nprogress.less";

Vue.use(VueRouter);

const routes = [
  {
    path: "/user",
    hideInMenu: true,
    // component: { render: h => h("router-view") },
    component: () =>
      import(/* webpackChunkName: "layout" */ "./layouts/UserLayout"),
    children: [
      {
        path: "/user",
        redirect: "/user/login"
      },
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/User/Login")
      },
      {
        path: "/user/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/User/Register")
      },
      {
        path: "/user/result",
        name: "registerResult",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/User/RegisterResult")
      }
    ]
  },
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "layout" */ "./layouts/BasicLayout"),
    children: [
      {
        path: "/",
        redirect: "/dashboard"
      },
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import(/* webpackChunkName: "user" */ "./views/About")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

NProgress.configure({ showSpinner: false }); // NProgress Configuration

router.beforeEach((to, from, next) => {
  if (to.path != from.path) {
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
