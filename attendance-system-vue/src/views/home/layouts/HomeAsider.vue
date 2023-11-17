<template>
  <el-menu
    class="app-asider"
    background-color="rgba(255,255,255,0)"
    router
    :default-active="$route.path"
    :default-openeds="['/']"
  >
    <el-sub-menu v-for="item in menus" :key="item.path" :index="item.path">
      <template #title>
        <el-icon>
          <component :is="item.meta?.icon" />
        </el-icon>
        <span>{{ item.meta?.title }}</span>
      </template>
      <el-menu-item v-for="subMenu in item.children" :key="subMenu.path" :index="subMenu.path">
        <template #title>
          <el-icon>
            <component :is="subMenu.meta?.icon" />
          </el-icon>
          <span>
            {{ subMenu.meta?.title }}
          </span>
        </template>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import _ from 'lodash'
import { useRouter, type RouteRecordName } from 'vue-router'

const store = useStore()
const router = useRouter()

const permission = store.state.user.infos?.permission

const menus = _.cloneDeep(router.options.routes).filter((route) => {
  route.children = route.children?.filter(
    (r) => r.meta?.menu && (permission as Array<RouteRecordName | undefined>).includes(r.name)
  )
  return route.meta?.menu && (permission as Array<RouteRecordName | undefined>).includes(route.name)
})
</script>

<style scoped lang="scss">
.app-asider {
  border-right: none;
  .el-menu-item.is-active {
    border-right: 4px solid var(--el-menu-active-color);
  }
}
</style>
