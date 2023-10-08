<template>
  <div>
    <h1>Header</h1>
    <div ref="domRef">{{ message }}</div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
const message = ref('Hello World')
const domRef = ref<HTMLDivElement | null>(null)
onMounted(async () => {
  console.log('%c 🍔 domRef', 'font-size:16px;color:#f5ce50', domRef)
  setTimeout(async () => {
    message.value = 'Waker'
    await nextTick()
    console.log(
      '%c 🌮 domRef.value?.innerHTML',
      'font-size:16px;color:#ffdd4d',
      domRef.value?.innerHTML
    )
  }, 2000)
})
</script>

<style scoped></style>
