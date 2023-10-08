<template>
  <span :class="classNames">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { ref, type PropType } from 'vue'
type ButtonType = 'default' | 'primary' | 'danger'
type ButtonSize = 'small' | 'large'

const props = defineProps({
  type: {
    type: String as PropType<ButtonType>,
    required: false,
    default: 'default'
  },
  size: {
    type: String as PropType<ButtonSize>,
    required: false
  }
})

const { type, size } = props

const classNames = ref({
  ['im-button']: true,
  [`im-button--${type}`]: type,
  [`im-button--${size}`]: size
})
</script>

<style scoped lang="less">
.im-button {
  display: inline;
  padding: 10px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  color: #000;
  background: rgb(193, 147, 74);

  &--primary {
    background: rgb(1, 135, 135);
  }

  &--small {
    font-size: 12px;
  }
  &--large {
    font-size: 20px;
  }
}
</style>
