<script setup lang="ts">
import { useSettings } from "@/composables/useSettings";

const { theme, userName } = useSettings();
</script>

<template>
  <div>
    <h1>Settings</h1>

    <div>
      <label>User name</label>
      <input v-model="userName" />
    </div>

    <div>
      <label>Theme</label>
      <select v-model="theme">
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  </div>
</template>
