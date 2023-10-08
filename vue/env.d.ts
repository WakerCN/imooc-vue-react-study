/// <reference types="vite/client" />

import { ObjectDirective /* or FunctionDirective */ } from 'vue'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    vColor: ObjectDirective<HTMLElement, string>
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $testPlugin: string
  }
}

export {}
