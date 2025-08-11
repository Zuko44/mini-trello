import { defineStore } from 'pinia'
import { ref } from 'vue'
import { nanoid } from 'nanoid'
import type { Task, Status } from '@/types/task'

export const useTasksStore = defineStore(
  'tasks',
  () => {
    const tasks = ref<Task[]>([])

    function addTask(status: Status, title: string) {
      const trimmed = title.trim()
      if (!trimmed) return
      tasks.value.push({ id: nanoid(), title: trimmed, status })
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
