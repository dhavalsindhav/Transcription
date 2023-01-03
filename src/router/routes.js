function masterRoutes(path, pathname, folder, createFile, dashboardFile) {
  return {
    path: `/${path}`,
    meta: {
      requiresAuth: true,
      transition: "slide-right",
    },
    children: [
      {
        path: "",
        name: `${pathname}-dashboard`,
        component: () =>
          import(
            /* webpackChunkName:  "[request]" */
            /* webpackMode: "lazy" */
            /* webpackInclude: /\.vue$/ */
            `src/pages/${folder}/${dashboardFile}.vue`
          ),
      },
      {
        path: "create",
        name: `create-${pathname}`,
        component: () =>
          import(
            /* webpackChunkName:"[request]" */
            /* webpackMode: "lazy" */
            /* webpackInclude: /\.vue$/ */
            `src/pages/${folder}/${createFile}.vue`
          ),
        meta: {
          requiresAuth: true,
          transition: "slide-left",
        },
      },
      {
        path: "edit/:slug",
        name: `edit-${pathname}`,
        component: () =>
          import(
            /* webpackChunkName: "[request]" */
            /* webpackMode: "lazy" */
            /* webpackInclude: /\.vue$/ */
            `src/pages/${folder}/${createFile}.vue`
          ),
        meta: {
          requiresAuth: true,
          transition: "slide-left",
        },
      },
    ],
  };
}

function reportRoutes(path, pathname, folder, dashboardFile) {
  return {
    path: `/${path}`,
    meta: {
      requiresAuth: true,
      transition: "slide-right",
    },
    children: [
      {
        path: "",
        name: `${pathname}-dashboard`,
        component: () =>
          import(
            /* webpackChunkName:  "[request]" */
            /* webpackMode: "lazy" */
            /* webpackInclude: /\.vue$/ */
            `src/pages/${folder}/${dashboardFile}.vue`
          ),
      },
    ],
  };
}

const routes = [
  {
    path: "/",
    component: () =>
      import(
        /* webpackChunkName: "default-layout" */
        /* webpackMode: "lazy" */
        /* webpackInclude: /\.vue$/ */
        "layouts/DefaultLayout.vue"
      ),
    children: [
      {
        path: "/",
        name: "sign-in",
        component: () =>
          import(
            /* webpackChunkName: "sign-in" */
            /* webpackMode: "lazy" */
            /* webpackInclude: /\.vue$/ */
            "src/pages/auth/LoginPage.vue"
          ),
        meta: {
          requireGuest: true,
        },
      },


    ],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      // User Routes
      masterRoutes("user", "user", "user", "CreateUserPage", "UserDashboard"),
      // Hospital Routes
      masterRoutes("hospital", "hospital", "hospital", "CreateHospitalPage", "HospitalDashboard"),
      {
        path: "/",
        name: "home",
        component: () =>
          import(
            /* webpackChunkName: "home" */
            /* webpackMode: "lazy" */
            /* webpackInclude: /\.vue$/ */
            "src/pages/HomePage.vue"
          ),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/:slug",
        name: "component",
        component: () =>
          import(
            /* webpackChunkName: "[request]"  */
            /* webpackMode: "lazy" */
            /* webpackInclude: /\.vue$/ */
            "src/pages/dynamicComponents.vue"
          ),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },


  // Always leave this as last one,
  // but you can also remove it

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;