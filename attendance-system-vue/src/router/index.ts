import { rootStore, type StateAll } from '@/store'
import _ from 'lodash'
import { createRouter, createWebHistory, type NavigationGuardWithThis } from 'vue-router'
const HomeView = () => import('@/views/home/HomeView.vue')
const LoginView = () => import('@/views/login/LoginView.vue')
const SignView = () => import('@/views/sign/SignView.vue')
const ApplyView = () => import('@/views/apply/ApplyView.vue')
const CheckView = () => import('@/views/check/CheckView.vue')
const ExceptionView = () => import('@/views/exception/ExceptionView.vue')

/* 声明路由meta信息
=========================================== */
declare module 'vue-router' {
  interface RouteMeta {
    menu?: boolean
    title?: string
    icon?: string
    auth?: boolean
  }
}

const beforeSign: NavigationGuardWithThis<any> = async (to, from, next) => {
  const userInfos = (rootStore.state as StateAll).user.infos
  const signInfos = (rootStore.state as StateAll).sign.infos
  if (_.isEmpty(signInfos)) {
    await rootStore.dispatch('sign/getInfos', { userid: userInfos?._id })
    next()
  } else {
    next()
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      redirect: '/sign',
      meta: {
        menu: true,
        title: '考勤管理',
        icon: 'odometer',
        auth: true
      },
      children: [
        {
          path: '/sign',
          name: 'sign',
          component: SignView,
          meta: {
            menu: true,
            title: '在线打卡签到',
            icon: 'aim',
            auth: true
          },
          beforeEnter: beforeSign
        },
        {
          path: '/exception',
          name: 'exception',
          component: ExceptionView,
          meta: {
            menu: true,
            title: '异常考勤查询',
            icon: 'monitor',
            auth: true
          },
          beforeEnter: async (to, from, next) => {
            const userInfos = (rootStore.state as StateAll).user.infos
            const signInfos = (rootStore.state as StateAll).sign.infos
            const checkList = (rootStore.state as StateAll).check.applyList
            if (_.isEmpty(signInfos)) {
              await rootStore.dispatch('sign/getInfos', { userid: userInfos?._id })
              if (_.isEmpty(checkList)) {
                await rootStore.dispatch('check/getApplyList')
              }
            }
            next()
          }
        },
        {
          path: '/apply',
          name: 'apply',
          component: ApplyView,
          meta: {
            menu: true,
            title: '添加考勤审批',
            icon: 'document-checked',
            auth: true
          },
          beforeEnter: async (to, from, next) => {
            await rootStore.dispatch('check/getApplyList')
            next()
          }
        },
        {
          path: '/check',
          name: 'check',
          component: CheckView,
          meta: {
            menu: true,
            title: '我的考勤审批',
            icon: 'finished',
            auth: true
          },
          beforeEnter: async (to, from, next) => {
            await rootStore.dispatch('check/getCheckList')
            next()
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})

router.beforeEach(async (to, form, next) => {
  const { token, infos } = (rootStore.state as StateAll).user
  if (to.meta.auth && _.isEmpty(infos)) {
    if (token) {
      const res = await rootStore.dispatch('user/getInfos')
      if (res.errcode === 0) {
        rootStore.commit('user/updateInfos', res.infos)
        next()
      }
    } else {
      next({ name: 'login' })
    }
  } else {
    if (token && to.name === 'login') {
      next({ name: 'home' })
    } else {
      next()
    }
  }
})

export default router
