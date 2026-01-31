<script setup lang="ts">
import type { Notification } from "@/types";

defineProps<{
  notification: Notification;
}>();

defineEmits<{
  (e: "remove"): void;
  (e: "mark-read"): void;
}>();
</script>

<template>
  <div class="item" :class="{ unread: !notification.read }">
    <div class="message">
      {{ notification.message }}
    </div>

    <div class="meta">
      <span>{{ new Date(notification.time).toLocaleString() }}</span>

      <div class="actions">
        <button v-if="!notification.read" @click="$emit('mark-read')">Mark read</button>
        <button @click="$emit('remove')">✕</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.unread {
  background: #f5f7ff;
  font-weight: 500;
}

.meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #666;
}

.actions button {
  margin-left: 6px;
}
</style>
