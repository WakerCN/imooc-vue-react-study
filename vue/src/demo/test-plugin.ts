import { type Plugin } from 'vue'

export const testPlugin: Plugin = {
  install(app) {
    app.config.globalProperties.$testPlugin = 'testPlugin'
    app.component('plugin-demo', {
      template: `<div>plugin-demo</div>`
    })
  }
}
