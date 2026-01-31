<script setup lang="ts">
import NotificationItem from "@/components/NotificationItem.vue";
import { useNotifications } from "@/composables/useNotifications";

const { unreadCount, markAllAsRead, removeNotification, notifications } = useNotifications();
</script>

<template>
  <div style="display: flex; justify-content: space-between">
    <h2>Notifications ({{ unreadCount }})</h2>
    <button @click="markAllAsRead">Mark All As Read</button>
  </div>
  <NotificationItem
    v-for="n in notifications"
    :key="n.id"
    :notification="n"
    @remove="removeNotification(n.id)"
    @mark-read="n.read = true"
  />
</template>
