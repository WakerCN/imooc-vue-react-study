<template>
  <div v-if="open" class="mask" @click="open = !open">
    <div class="modal" @click.stop>弹窗</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const open = ref<boolean>(true)
</script>

<style scoped lang="less">
.mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background: rgba(0, 0, 0, 0.3);

  .modal {
    background: #fff;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
}
</style>
