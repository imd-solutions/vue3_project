import NotFound from "@components/NotFound.vue";

// Export the components with the path and meta information.
export default [
  {
    path: "/",
    redirect: "/security",
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];
