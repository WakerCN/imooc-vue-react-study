<template>
  <div>
    <input v-margin="10" v-focus style="background: #eee; margin-right: 10px" />
    <input v-margin="10" v-focus style="background: #eee; caret-color: aqua" />
    <div v-margin="10" v-color="color" @click="handleClick">aaa</div>
    <div v-margin="10" v-color="color" @click="handleClick">bbb</div>
    <div v-margin="10" v-color="color" @click="handleClick">ccc</div>
    <div>{{ $testPlugin }}</div>
    <plugin-demo></plugin-demo>
  </div>
</template>

<script setup lang="ts">
import { ref, type Directive } from 'vue'
const color = ref('orange')

const handleClick = () => {
  color.value = 'pink'
}

const vFocus: Directive<HTMLInputElement> = {
  mounted: (el) => {
    el.focus()
  }
}

// const vColor: Directive<HTMLElement, string> = (el, binding) => {
//   el.style.background = binding.value
// }

const vMargin: Directive<HTMLElement, number> = {
  mounted: (el, binding) => {
    el.style.marginBottom = binding.value + 'px'
  }
}
</script>

<style scoped lang="less">
* {
  padding: 10px;
  border-radius: 6px;
}
</style>
