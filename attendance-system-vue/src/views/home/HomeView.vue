<template>
  <div>
    Home
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store'

const store = useStore()

store.dispatch('user/login').then((res) => {
  console.log('%c 🧀 res.data ', 'font-size:16px;color:#666666;background:#F8C28E', res.data)
})
</script>

<style scoped lang="scss"></style>
