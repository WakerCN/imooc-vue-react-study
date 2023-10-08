import { createApp } from 'vue'
import App from './App.vue'

import 'normalize.css/normalize.css'
import '@/styles/main.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// Vuetify
// import 'vuetify/styles'
// import { createVuetify } from 'vuetify'
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'
import { testPlugin } from './demo/test-plugin'

// const vuetify = createVuetify({
//   theme: {
//     defaultTheme: 'dark'
//   },
//   components,
//   directives
// })

const app = createApp(App)

app.use(ElementPlus)
// app.use(vuetify)

app.use(testPlugin)

app.directive('color', (el, binding) => {
  el.style.background = binding.value
})

app.mount('#app')
