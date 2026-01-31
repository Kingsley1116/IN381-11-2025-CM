import { computed, onMounted, ref, watch } from "vue";
import type { Notification } from "@/types";

const notifications = ref<Notification[]>([]);

export function useNotifications() {
  const unreadCount = computed(() => notifications.value.filter((n) => !n.read).length);

  const addNotification = (message: string) => {
    notifications.value.unshift({
      id: crypto.randomUUID(),
      message,
      time: Date.now(),
      read: false,
    });
  };

  const markAllAsRead = () => {
    notifications.value.forEach((n) => (n.read = true));
  };

  const removeNotification = (id: string) => {
    notifications.value = notifications.value.filter((n) => n.id !== id);
  };

  watch(
    notifications,
    (val) => {
      localStorage.setItem("kanban-notifications", JSON.stringify(val));
    },
    { deep: true },
  );

  // 👉 讀
  onMounted(() => {
    const saved = localStorage.getItem("kanban-notifications");
    if (saved) {
      notifications.value = JSON.parse(saved);
    }
  });

  return {
    notifications,
    unreadCount,
    addNotification,
    markAllAsRead,
    removeNotification,
  };
}
