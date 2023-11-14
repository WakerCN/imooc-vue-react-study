<template>
  <div>
    Home
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { http } from '@/services/https'
http.post('/users/login', { email: 'huangrong@imooc.com', pass: 'huangrong' })
</script>

<style scoped lang="scss"></style>
