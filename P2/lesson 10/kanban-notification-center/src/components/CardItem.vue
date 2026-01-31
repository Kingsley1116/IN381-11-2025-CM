<script setup lang="ts">
import type { Card } from "@/types";
defineProps<{
  card: Card;
}>();

defineEmits<{
  (e: "move", direction: "left" | "right"): void;
}>();
</script>

<template>
  <div class="card">
    <div class="card-title">{{ card.title }}</div>

    <div class="card-meta">
      <p>{{ card.userName }}</p>
      <p>{{ new Date(card.createdAt).toLocaleString() }}</p>
    </div>

    <div class="card-actions">
      <button @click="$emit('move', 'left')">←</button>
      <button @click="$emit('move', 'right')">→</button>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: #fff;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-weight: 600;
  margin-bottom: 6px;
}

.card-meta {
  font-size: 12px;
  color: #666;
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.card-actions {
  display: flex;
  justify-content: space-between;
}

.card-actions button {
  border: none;
  background: #eee;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
}

.card-actions button:hover {
  background: #ddd;
}
</style>
