<script setup lang="ts">
import { ref } from 'vue'
import Column from './Column.vue'

const filter = ref('')
</script>

<template>
  <div class="board">
    <header class="board__header">
      <input class="board__filter" v-model="filter" placeholder="Search tasks by title…" />
    </header>

    <div class="columns">
      <Column title="TODO" status="todo" :filter="filter" />
      <Column title="In Progress" status="inprogress" :filter="filter" />
      <Column title="Done" status="done" :filter="filter" />
    </div>
  </div>
</template>
