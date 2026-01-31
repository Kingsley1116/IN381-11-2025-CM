<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import type { Card } from "@/types";
import CardItem from "@/components/CardItem.vue";
import { useNotifications } from "@/composables/useNotifications";
import { useSettings } from "@/composables/useSettings";

const { addNotification } = useNotifications();
const { userName } = useSettings();

const cards = ref<Card[]>([]);
const newTitle = ref("");

const todoCards = computed(() => cards.value.filter((c) => c.status === "todo"));
const doingCards = computed(() => cards.value.filter((c) => c.status === "doing"));
const doneCards = computed(() => cards.value.filter((c) => c.status === "done"));

function addCard() {
  if (!newTitle.value.trim()) return;

  cards.value.push({
    id: crypto.randomUUID(),
    title: newTitle.value,
    userName: userName.value,
    createdAt: Date.now(),
    status: "todo",
  });

  newTitle.value = "";
}

watch(
  cards,
  (newCards) => {
    localStorage.setItem("kanban-cards", JSON.stringify(newCards));
  },
  { deep: true },
);

onMounted(() => {
  const saved = localStorage.getItem("kanban-cards");
  if (saved) {
    cards.value = JSON.parse(saved);
  }
});

function moveCard(card: Card, direction: "left" | "right") {
  if (direction === "right") {
    if (card.status === "todo") card.status = "doing";
    else if (card.status === "doing") card.status = "done";
  } else {
    if (card.status === "done") card.status = "doing";
    else if (card.status === "doing") card.status = "todo";
  }
  addNotification(`「${card.title}」 moved to ${card.status.toUpperCase()}`);
}
</script>

<template>
  <div>
    <h1>Board</h1>

    <input v-model="newTitle" placeholder="New task" />
    <button @click="addCard">Add</button>

    <div style="display: flex; gap: 30px">
      <div>
        <h2>Todo</h2>
        <CardItem
          v-for="card in todoCards"
          :key="card.id"
          :card="card"
          @move="(dir) => moveCard(card, dir)"
        />
      </div>
      <div>
        <h2>Doing</h2>
        <CardItem
          v-for="card in doingCards"
          :key="card.id"
          :card="card"
          @move="(dir) => moveCard(card, dir)"
        />
      </div>
      <div>
        <h2>Done</h2>
        <CardItem
          v-for="card in doneCards"
          :key="card.id"
          :card="card"
          @move="(dir) => moveCard(card, dir)"
        />
      </div>
    </div>
  </div>
</template>
