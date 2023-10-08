<template>
  <transition name="fade" mode="out-in">
    <slot></slot>
  </transition>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.3s ease;
}
</style>
