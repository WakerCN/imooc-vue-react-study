import { createRouter, createWebHistory } from 'vue-router'
const HomeView = () => import('@/views/home/HomeView.vue')
const LoginView = () => import('@/views/login/LoginView.vue')
const SignView = () => import('@/views/sign/SignView.vue')
const ApprovalView = () => import('@/views/approval/ApprovalView.vue')
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
        icon: 'house',
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
          }
        },
        {
          path: '/exception',
          name: 'exception',
          component: ExceptionView,
          meta: {
            menu: true,
            title: '异常考勤查询',
            icon: 'info-filled',
            auth: true
          }
        },
        {
          path: '/approval',
          name: 'approval',
          component: ApprovalView,
          meta: {
            menu: true,
            title: '添加考勤审批',
            icon: 'document-checked',
            auth: true
          }
        },
        {
          path: '/check',
          name: 'check',
          component: CheckView,
          meta: {
            menu: true,
            title: '我的考情审批',
            icon: 'finished',
            auth: true
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

export default router
