<template>
  <div class="box">
    <div class="wrap">
      <div class="box-list"></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 800px;
  width: 800px;
  background: pink;

  > .wrap {
    width: 400px;
    height: 400px;
    background: palegoldenrod;
  }
}
</style>
