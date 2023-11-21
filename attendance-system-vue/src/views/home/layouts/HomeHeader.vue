<template>
  <div class="home-header">
    <div class="logo-area"><img :src="LogoSrc" class="logo" :width="60" /><span>册府</span></div>
    <div class="user-operate-area">
      <ElBadge :value="2">
        <ElIcon :size="30" class="unread-msg"><BellFilled /></ElIcon>
      </ElBadge>
      <ElDropdown>
        <template #default>
          <div class="user">
            <ElAvatar class="avatar" :src="head" />
            <span class="user-name">{{ name }}</span>
          </div>
        </template>
        <template #dropdown>
          <ElDropdownMenu>
            <ElDropdownItem>个人信息</ElDropdownItem>
            <ElDropdownItem @click="handleLogout">退出登录</ElDropdownItem>
          </ElDropdownMenu>
        </template>
      </ElDropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import LogoSrc from '@/assets/image/logo.svg'
import { useStore } from '@/store'
import { ElMessage } from 'element-plus'
import { computed } from 'vue'
const store = useStore()
const emptyHead = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
const infos = store.state.user.infos
const head = computed(() => (infos?.head as string) || emptyHead)
const name = computed(() => (infos?.name as string) || '未登录')
const handleLogout = () => {
  store.commit('user/clearToken')
  setTimeout(() => {
    ElMessage.info({ message: '正在退出...' })
    window.location.replace('/login')
  }, 500)
}
</script>

<style scoped lang="scss">
.home-header {
  @include flex-center(space-between);
  > .logo-area {
    height: 100%;
    line-height: 60px;
    display: inline-block;

    font-size: 32px;
    font-family: 'aliDfdk';
    @include flex-center();

    > .logo {
      height: 50px;
      margin-right: 10px;
    }
  }

  > .user-operate-area {
    @include flex-center();

    > * {
      margin-left: 16px;
    }
    .user {
      outline: none;
      height: 30px;
      padding: 10px;
      border-radius: 8px;
      @include flex-center();
      @include transition();

      &:hover {
        background: rgba($color: #ffffff, $alpha: 0.5);
        backdrop-filter: blur(10px);
      }
      > .avatar {
        height: 40px;
        margin-right: 10px;
      }
      > .user-name {
        display: inline-block;
        @include ellipsis();
        width: 64px;
      }
    }
  }
}
</style>
