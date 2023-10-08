<template>
  <div class="demo">
    <button @click="handleToggle">切换</button>
    <AnimationBounce>
      <div v-if="switcher" class="box box1" />
      <div v-else class="box box2" />
    </AnimationBounce>
  </div>
</template>

<script setup lang="ts">
import AnimationBounce from '@/transition/AnimationBounce.vue'
// import TransitionFade from '@/transition/TransitionFade.vue'
import { ref } from 'vue'
const switcher = ref<boolean>(true)
const handleToggle = () => {
  switcher.value = !switcher.value
}
</script>

<style scoped lang="less">
.demo {
  .box {
    width: 200px;
    height: 50px;

    &.box1 {
      background: palegoldenrod;
    }

    &.box2 {
      background: palegreen;
    }
  }
}
</style>
