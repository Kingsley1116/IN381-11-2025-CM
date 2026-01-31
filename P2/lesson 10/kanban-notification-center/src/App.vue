<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import { useSettings } from "@/composables/useSettings";

const { theme } = useSettings();
</script>

<template>
  <div :class="theme">
    <NavBar />
    <RouterView />
  </div>
</template>

<style>
.light {
  background: #ffffff;
  color: #111;
}

.dark {
  background: #121212;
  color: #eee;
}
</style>
