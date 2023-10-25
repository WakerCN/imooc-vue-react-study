/// <reference types="vite/client" />

import { ObjectDirective /* or FunctionDirective */ } from 'vue'
import 'vue-router'

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

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'vue-router' {
  interface RouteMeta {
    // 是可选的
    isAdmin?: boolean
  }
}

export {}
