import { onMounted, ref, watch } from "vue";
import type { Theme } from "@/types";

const theme = ref<Theme>("light");
const userName = ref("Guest");

export function useSettings() {
  watch(theme, (val) => {
    localStorage.setItem("kanban-theme", val);
  });

  watch(userName, (val) => {
    localStorage.setItem("kanban-username", val);
  });

  onMounted(() => {
    const savedTheme = localStorage.getItem("kanban-theme");
    const savedName = localStorage.getItem("kanban-username");

    if (savedTheme === "light" || savedTheme === "dark") {
      theme.value = savedTheme;
    }

    if (savedName) {
      userName.value = savedName;
    }
  });

  return {
    theme,
    userName,
  };
}
