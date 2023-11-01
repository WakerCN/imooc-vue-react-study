<template>
  <div>
    <ElButton @click="handleClick">Add</ElButton>
  </div>
  <div>Home {{ count }}</div>
  <div>Home {{ doubleCount }}</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const count = computed(() => store.state.count)
const doubleCount = computed(() => store.getters.doubleCount)

const handleClick = () => {
  store.dispatch('increment', 5)
}
</script>

<style scoped></style>
