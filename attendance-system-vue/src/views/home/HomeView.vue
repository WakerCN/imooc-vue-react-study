<!--
 * @Author       : 魏威
 * @Date         : 2023-11-14 10:30
 * @LastEditTime : 2023-11-21 11:41
 * @LastEditors  : Waker
 * @Description  : HOME 首页，整个项目布局也在此渲染
-->

<template>
  <ElContainer class="main-layout">
    <ElHeader class="header">
      <HomeHeader />
    </ElHeader>
    <ElContainer class="bottom-main">
      <ElAside width="240px" class="asider">
        <HomeAsider />
      </ElAside>
      <ElContainer class="main">
        <ElBreadcrumb class="bread" separator="/">
          <ElBreadcrumbItem v-for="b in breads" :key="b.name">
            <span>{{ b.meta.title }}</span>
          </ElBreadcrumbItem>
        </ElBreadcrumb>
        <div class="main-content">
          <RouterView />
        </div>
      </ElContainer>
    </ElContainer>
  </ElContainer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import HomeAsider from './layouts/HomeAsider.vue'
import HomeHeader from './layouts/HomeHeader.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const breads = computed(() => route.matched)
</script>

<style scoped lang="scss">
.main-layout {
  width: 100%;
  height: 100%;
  background: url('../../assets/image/loginBg.svg');

  > .header {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 2;
    @include forsted-glass();
    user-select: none;
  }

  > .bottom-main {
    height: calc(100% - 60px);

    > .asider {
      z-index: 1;
      user-select: none;

      box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.1);
      @include forsted-glass();
    }

    > .main {
      height: 100%;
      width: 100%;
      padding: 20px;
      flex-direction: column;
      overflow-y: auto;

      > .bread {
        margin-bottom: 20px;
      }

      > .main-content {
        height: calc(100% - 14px);
        @include border-radius();
      }
    }
  }
}
</style>
