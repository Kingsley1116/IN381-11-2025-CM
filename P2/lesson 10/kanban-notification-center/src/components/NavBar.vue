<script setup lang="ts">
import { useNotifications } from "@/composables/useNotifications";

const { unreadCount } = useNotifications();
</script>

<template>
  <nav>
    <RouterLink to="/board">Board</RouterLink> |
    <RouterLink to="/notifications"> Notifications ({{ unreadCount }}) </RouterLink> |
    <RouterLink to="/settings">Settings</RouterLink>
  </nav>
</template>

<style>
.router-link-exact-active {
  font-weight: bold;
  color: red;
}
</style>
