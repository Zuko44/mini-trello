<script setup lang="ts">
import { ref, nextTick } from 'vue'
import type { Task } from '@/types/task'

const props = defineProps<{ task: Task }>()
const emits = defineEmits<{
  (e: 'delete', id: string): void
  (e: 'save', payload: { id: string; title: string }): void
}>()

const editing = ref(false)
const editValue = ref('')
const inputEl = ref<HTMLInputElement | null>(null)

function onDblClick() {
  editing.value = true
  editValue.value = props.task.title
  nextTick(() => inputEl.value?.focus())
}

function commit() {
  if (!editing.value) return
  editing.value = false
  emits('save', { id: props.task.id, title: editValue.value })
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'Enter') commit()
  if (e.key === 'Escape') {
    editing.value = false
  }
}

function onDragStart(ev: DragEvent) {
  ev.dataTransfer?.setData('text/plain', props.task.id)
  ev.dataTransfer?.setDragImage?.(document.createElement('div'), 0, 0)
}
</script>

<template>
  <article class="task" draggable="true" @dragstart="onDragStart" @dblclick="onDblClick">
    <button
      class="task__remove"
      aria-label="Remove"
      title="Remove"
      @click.stop="emits('delete', task.id)"
    >
      ×
    </button>

    <template v-if="editing">
      <input
        ref="inputEl"
        class="task__edit"
        v-model="editValue"
        @keydown="onKeyDown"
        @blur="commit"
      />
    </template>
    <template v-else>
      <h4 class="task__title">{{ task.title }}</h4>
    </template>
  </article>
</template>
