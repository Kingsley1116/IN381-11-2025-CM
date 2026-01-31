<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

const searchText = ref('')
const posts = ref<Post[]>([])

onMounted(async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  if (res.ok) {
    posts.value = await res.json()
  }
})

const filteredPosts = computed(() => {
  if (!searchText.value) return posts.value

  const keyword = searchText.value.toLowerCase()

  return posts.value.filter(
    (post) =>
      post.title.toLowerCase().includes(keyword) || post.body.toLowerCase().includes(keyword),
  )
})
</script>

<template>
  <input type="text" v-model="searchText" placeholder="Search posts..." />
  <ul>
    <li v-for="post in filteredPosts" :key="post.id">
      <strong>{{ post.title }}</strong>
      <p>{{ post.body }}</p>
    </li>
  </ul>
</template>

<style scoped>
input {
  padding: 10px 0;
  width: 50%;
  font-size: 18px;
}
</style>
