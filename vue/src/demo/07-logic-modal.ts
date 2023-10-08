import logicModal from '@/demo/07-logic-modal.vue'
import { createApp } from 'vue'

const modal = () => {
  const div = document.createElement('div')
  createApp(logicModal).mount(div)
  document.body.appendChild(div)
}

export { modal }
