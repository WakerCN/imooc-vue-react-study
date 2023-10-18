<template>
  <div style="font-size: 80px">
    <div style="text-align: center;">
      {{ count }}
    </div>
    <div>钉钉进步体</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const count = ref<number>(0)

onMounted(() => {
  setInterval(() => {
    count.value++
  }, 1000)
})
</script>

<style scoped></style>
