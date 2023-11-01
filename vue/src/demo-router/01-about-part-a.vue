<template>
  <div>About - AAA -- id: {{ $route.params.id }}</div>
  <div>Count {{ $store.state.count }}</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

onMounted(() => {
  route.meta
})
</script>

<style scoped></style>
