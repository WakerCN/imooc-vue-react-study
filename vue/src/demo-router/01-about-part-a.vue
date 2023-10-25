<template>
  <div>About - AAA -- id: {{ $route.params.id }}</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

onMounted(() => {
  route.meta
  console.log('%c 🌰 route.meta', 'font-size:16px;color:#666666;background:#C5AEDA', route.meta)
})
</script>

<style scoped></style>
