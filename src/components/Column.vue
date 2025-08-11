<script setup lang="ts">
import { ref, computed } from 'vue'
import TaskCard from './TaskCard.vue'
import { useTasksStore } from '@/stores/tasks'
import type { Task, Status } from '@/types/task'

const props = defineProps<{ title: string; status: Status; filter: string }>()

const tasksStore = useTasksStore()
const newTitle = ref('')
const dragOver = ref(false)

function add() {
  tasksStore.addTask(props.status, newTitle.value)
  newTitle.value = ''
}

function remove(id: string) {
  tasksStore.deleteTask(id)
}

function save(payload: { id: string; title: string }) {
  tasksStore.updateTaskTitle(payload.id, payload.title)
}

function allowDrop(ev: DragEvent) {
  ev.preventDefault()
  dragOver.value = true
}

function onDragLeave() {
  dragOver.value = false
}

function onDrop(ev: DragEvent) {
  ev.preventDefault()
  dragOver.value = false
  const id = ev.dataTransfer?.getData('text/plain')
  if (id) tasksStore.moveTask(id, props.status)
}

const items = computed<Task[]>(() => {
  const q = props.filter.trim().toLowerCase()
  return tasksStore.tasks
    .filter((t) => t.status === props.status)
    .filter((t) => (q ? t.title.toLowerCase().includes(q) : true))
})
</script>

<template>
  <section
    class="column"
    :class="{ 'column--dragover': dragOver }"
    @dragover="allowDrop"
    @dragleave="onDragLeave"
    @drop="onDrop"
  >
    <h3 class="column__title">{{ title }}</h3>

    <div class="column__add">
      <input
        class="column__input"
        v-model="newTitle"
        :placeholder="`Add to ${title}`"
        @keydown.enter="add"
      />
      <button class="column__btn" @click="add">Add</button>
    </div>

    <div class="column__droppable">
      <p v-if="!items.length" class="column__empty">No tasks</p>
      <TaskCard v-for="t in items" :key="t.id" :task="t" @delete="remove" @save="save" />
    </div>
  </section>
</template>
