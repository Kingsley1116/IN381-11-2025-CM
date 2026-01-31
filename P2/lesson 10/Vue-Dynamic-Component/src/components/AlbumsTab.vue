<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'

interface Album {
  id: number
  title: string
  userId: number
}

const searchText = ref('')
const albums = ref<Album[]>([])

onMounted(async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/albums')
  if (res.ok) {
    albums.value = await res.json()
  }
})

const filteredAlbums = computed(() => {
  if (!searchText.value) return albums.value

  const keyword = searchText.value.toLowerCase()

  return albums.value.filter((album) => album.title.toLowerCase().includes(keyword))
})
</script>

<template>
  <input type="text" v-model="searchText" placeholder="Search albums..." />
  <ul>
    <li v-for="album in filteredAlbums" :key="album.id">
      <strong>{{ album.title }}</strong>
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
