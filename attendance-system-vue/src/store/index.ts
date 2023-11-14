import { type InjectionKey } from 'vue'
import { useStore as baseUseStore, createStore, type Store } from 'vuex'
import { checkStore, type CheckState } from './modules/check'
import { newsStore, type NewsState } from './modules/news'
import { signStore, type SignState } from './modules/sign'
import { userStore, type UserState } from './modules/user'

export interface RootState {}

interface StateAll extends RootState {
  user: UserState
  sign: SignState
  news: NewsState
  check: CheckState
}

/* injectKey
=========================================== */
export const key: InjectionKey<Store<StateAll>> = Symbol()

export const rootStore = createStore<RootState>({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user: userStore,
    sign: signStore,
    news: newsStore,
    check: checkStore
  }
})

export const useStore = () => {
  return baseUseStore(key)
}
