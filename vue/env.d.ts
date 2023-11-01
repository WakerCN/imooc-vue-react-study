/// <reference types="vite/client" />

import { ObjectDirective /* or FunctionDirective */ } from 'vue'
import 'vue-router'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // 声明自己的 store state
  interface State {
    count: number
  }
  export interface ComponentCustomProperties {
    vColor: ObjectDirective<HTMLElement, string>
    // 为 `this.$store` 提供类型声明
    $store: Store<State>
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
    auth?: boolean
  }
}

export {}
