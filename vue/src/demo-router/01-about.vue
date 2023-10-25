<template>
  <div>
    About
    <ElButton @click="handleClick('111')">A1</ElButton>
    <ElButton @click="handleClick('222')">A2</ElButton>
    <RouterLink to="/about/part-b" style="padding: 10px">B</RouterLink>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

onMounted(() => {
  route.meta
  console.log('%c 🍌 route.meta', 'font-size:16px;color:#666666;background:#D9D9D9', route.meta)
})

const handleClick = async (id: string) => {
  await router.push({
    name: 'AboutPartA',
    params: { id }
  })
}
</script>

<style scoped></style>
