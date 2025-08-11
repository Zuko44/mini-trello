import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Task, Status } from '@/types/task'

//уникальный идентификатор для каждой задачи
function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

export const useTasksStore = defineStore(
  'tasks',
  () => {
    const tasks = ref<Task[]>([])

    function addTask(status: Status, title: string): void {
      const trimmed = title.trim()
      if (!trimmed) return
      tasks.value.push({ id: uid(), title: trimmed, status })
    }

    function updateTaskTitle(id: string, title: string): void {
      const next = title.trim()
      if (!next) return
      const t = tasks.value.find((t) => t.id === id)
      if (t) t.title = next
    }

    function deleteTask(id: string): void {
      tasks.value = tasks.value.filter((t) => t.id !== id)
    }

    function moveTask(id: string, nextStatus: Status): void {
      const t = tasks.value.find((t) => t.id === id)
      if (t) t.status = nextStatus
    }

    return { tasks, addTask, updateTaskTitle, deleteTask, moveTask }
  },
  {
    persist: true,
  },
)
