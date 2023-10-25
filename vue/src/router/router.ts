import { type RouterOptions, createRouter, createWebHistory } from 'vue-router'
import Home from '@/demo-router/01-home.vue'
import About from '@/demo-router/01-about.vue'
import AboutPartA from '@/demo-router/01-about-part-a.vue'
import AboutPartB from '@/demo-router/01-about-part-b.vue'

const routes: RouterOptions['routes'] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      isAdmin: false
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    children: [
      {
        path: 'part-a/:id',
        name: 'AboutPartA',
        component: AboutPartA,
        meta: {
          test: 'test-meta'
        }
      },
      {
        path: 'part-b',
        name: 'AboutPartB',
        component: AboutPartB
      }
    ],
    meta: {
      isAdmin: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
