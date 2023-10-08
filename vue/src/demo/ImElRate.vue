<template>
  <ul class="im-el-rate-list">
    <li
      v-for="i in max"
      :key="i"
      :class="itemClass(i)"
      @mouseenter="$emit('update:modelValue', i)"
      @mouseleave="$emit('update:modelValue', initValue)"
      @click="initValue = i"
    />
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  max: {
    type: Number,
    default: 5
  },

  modelValue: {
    type: Number,
    required: false
  }
})
const initValue = ref(props.modelValue || 0)

defineEmits(['update:modelValue'])

const itemClass = (index: number) => {
  return {
    'im-el-rate-list-item': true,
    iconfont: true,
    'icon-collection_fill': true,
    active: index <= (props?.modelValue || 0)
  }
}
</script>

<style scoped lang="less">
.im-el-rate-list {
  display: flex;

  &-item {
    font-size: 30px;
    margin-right: 10px;
    &.active {
      color: pink;
    }
  }
}
</style>
