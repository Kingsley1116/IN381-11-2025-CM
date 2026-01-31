import { createRouter, createWebHistory } from "vue-router";
import Board from "@/pages/Board-page.vue";
import Notifications from "@/pages/Notifications-page.vue";
import Settings from "@/pages/Settings-page.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/board",
      name: "board",
      component: Board,
    },
    {
      path: "/notifications",
      name: "notifications",
      component: Notifications,
    },
    {
      path: "/settings",
      name: "settings",
      component: Settings,
    },
  ],
});

export default router;
