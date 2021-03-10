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
        redirect: "/default"
      },
      {
        path: "/default",
        name: "default",
        component: () => import(/* webpackChunkName: "user" */ "./views/About")
      },
      {
        path: "/blog/edit",
        name: "edit",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/blog/Edit")
      },
      {
        path: "blog/draft",
        name: "draft",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/blog/Draft")
      }
    ]
  },
  {
    path: "/account",
    component: () =>
      import(/* webpackChunkName: "layout" */ "./layouts/BasicLayout"),
    children: [
      {
        path: "/account/center",
        name: "center",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/account/center")
      },
      {
        path: "/account/settings",
        name: "settings",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/account/settings"),
        children: [
          {
            path: "/account/settings",
            redirect: "/account/settings/basic"
          },
          {
            path: "/account/settings/basic",
            name: "BasicSettings",
            meta: { title: "基本设置" },
            component: () =>
              import(
                /* webpackChunkName: "user" */ "./views/account/settings/BasicSettings"
              )
          },
          {
            path: "/account/settings/security",
            name: "SecuritySettings",
            meta: { title: "安全设置" },
            component: () =>
              import(
                /* webpackChunkName: "user" */ "./views/account/settings/Security"
              )
          },
          {
            path: "/account/settings/wallet",
            name: "MyWallet",
            meta: { title: "我的钱包" },
            component: () =>
              import(
                /* webpackChunkName: "user" */ "./views/account/settings/MyWallet"
              )
          },
          {
            path: "/account/settings/notification",
            name: "NotificationSettings",
            meta: { title: "消息通知" },
            component: () =>
              import(
                /* webpackChunkName: "user" */ "./views/account/settings/Notification"
              )
          }
        ]
      }
    ]
  },
  {
    path: "/admin",
    component: () =>
      import(/* webpackChunkName: "layout" */ "./layouts/AdminLayout")
  },
  {
    path: "*",
    component: () =>
      import(/* webpackChunkName: "exception" */ "./views/exception/404")
  }
];

const router = new VueRouter({
  // mode: "history",
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
