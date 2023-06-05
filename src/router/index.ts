import { createRouter, createWebHistory } from "vue-router";
import { navigationGuard } from "@okta/okta-vue";
import { siteRoutes } from "./../app";
import { useButtonStore } from "@stores/button/buttonStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: siteRoutes as any,
});

// Due to navigation guards mixin issue in vue-router-next, navigation guard logic need to be added manually
router.beforeEach(navigationGuard);

router.beforeEach((to, from, next) => {
  useButtonStore().stopButtonLoading();
  next();
});

export default router;
