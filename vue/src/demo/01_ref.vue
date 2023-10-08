<template>
  <div>
    <h1 ref="headerRef1">header1</h1>
    <h3 ref="headerRef2" @click="onClick">header2</h3>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, ref } from 'vue'
const instance = getCurrentInstance()
const headerRef1 = ref(null)
const headerRef2 = ref(null)

const onClick = () => {
  console.log('%c 🍤 instance', 'font-size:16px;color:#2eafb0', instance?.refs)
}
</script>

<style lang="scss" scoped></style>
