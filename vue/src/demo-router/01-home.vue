<template>
  <div>
    <ElButton @click="handleClick">Add</ElButton>
  </div>
  <div>Home {{ count }}</div>
  <div>Home {{ doubleCount }}</div>
  <br />
  <div>
    <div v-for="(p, index) in percentArr" :key="index">{{ p }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import { getPercentByNums } from '@/utils/percent'

const store = useStore()
const count = computed(() => store.state.count)
const doubleCount = computed(() => store.getters.doubleCount)

const handleClick = () => {
  store.dispatch('increment', 5)
}

const numArr = [211077, 120930, 19420, 14560]
const percentArr = getPercentByNums(numArr)
</script>

<style scoped></style>
