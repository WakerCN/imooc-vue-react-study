import { key, rootStore } from '@/store/index'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import '@/assets/styles/base.scss'
import '@/assets/styles/normalize.css'

const app = createApp(App)

/* 注册Element icon组件
=========================================== */
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus, {
  locale: zhCn
})

app.use(router)

app.use(rootStore, key)

app.mount('#app')
