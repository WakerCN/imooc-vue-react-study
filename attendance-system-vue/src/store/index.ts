import { type InjectionKey } from 'vue'
import { useStore as baseUseStore, createStore, type Store } from 'vuex'
import { checkStore, type CheckState } from './modules/check'
import { newsStore, type NewsState } from './modules/news'
import { signStore, type SignState } from './modules/sign'
import { userStore, type UserState } from './modules/user'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence<RootState>({
  storage: window.localStorage,
  reducer: (state) => ({
    user: { token: (state as StateAll).user.token }
  })
})

export interface RootState {}

export interface StateAll extends RootState {
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
  },
  plugins: [vuexLocal.plugin]
})

export const useStore = () => {
  return baseUseStore(key)
}
