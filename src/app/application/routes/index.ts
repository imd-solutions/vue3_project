// Import the main site page.
import ApplicationPage from "@components/Application.vue";
import SecurityPage from "@components/Security.vue";

// Import the components from Components index file.
import CustomerSearch from "@application/components/Search.vue";
import Security from "@application/components/customer/Security.vue";
import CustomerHomepage from "@application/components/customer/Home.vue";
import NotFound from "@components/NotFound.vue";

export default [
  {
    path: "/security",
    component: SecurityPage,
    children: [
      {
        path: "",
        component: CustomerSearch,
        name: "search",
      },
      {
        path: "customer/:id",
        component: Security,
        name: "security",
      },
      {
        path: "/:pathMatch(.*)*",
        component: NotFound,
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/application",
    component: ApplicationPage,
    children: [
      {
        path: "customer/:system/:id",
        component: CustomerHomepage,
        name: "customerhome",
      },
      {
        path: "/:pathMatch(.*)*",
        component: NotFound,
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
];
