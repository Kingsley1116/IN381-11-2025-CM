<script setup lang="ts">
import { ref } from 'vue'
import PostsTab from './components/PostsTab.vue'
import AlbumsTab from './components/AlbumsTab.vue'

const currentTab = ref(PostsTab)
</script>

<template>
  <h1>Dynamic Vue Component</h1>

  <div class="btn-container">
    <button @click="currentTab = PostsTab">Posts</button>
    <button @click="currentTab = AlbumsTab">Albums</button>
  </div>

  <keep-alive>
    <component :is="currentTab" />
  </keep-alive>
</template>

<style scoped>
h1 {
  margin: 0;
}
.btn-container button {
  width: 100px;
  height: 40px;
  border-radius: 9999px;
  margin: 20px 20px;
}
</style>
