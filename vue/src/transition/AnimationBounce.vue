<template>
  <transition name="bounce" mode="out-in">
    <slot></slot>
  </transition>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.bounce-enter-active {
  animation: bounce 0.5s;
}

.bounce-leave-active {
  animation: bounce 0.5s reverse;
}

@keyframes bounce {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
