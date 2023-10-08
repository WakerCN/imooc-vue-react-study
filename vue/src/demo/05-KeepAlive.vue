<template>
  <div style="width: 600px">
    <button @click="handleComponent(kpComp1)">comp1</button>
    <button @click="handleComponent(kpComp2)">comp2</button>
    <keep-alive>
      <component :is="curComponent" />
    </keep-alive>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, shallowRef } from 'vue'
import FallbackComponent from '@/fallback/FallbackLoading.vue'

const kpComp1 = defineAsyncComponent({
  loader: () => import('@/demo/05-kp-comp1.vue'),
  loadingComponent: FallbackComponent
})
const kpComp2 = defineAsyncComponent({
  loader: () => import('@/demo/05-kp-comp2.vue'),
  loadingComponent: FallbackComponent
})

const curComponent = shallowRef(kpComp1)

const handleComponent = (comp: any) => {
  curComponent.value = comp
}
</script>

<style scoped></style>
