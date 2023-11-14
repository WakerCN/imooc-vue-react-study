import { createStore } from 'vuex'

import VuexPersistence from 'vuex-persist'

interface AppStore {
  count: number
  msg: string
}

const vuexLocal = new VuexPersistence<AppStore>({
  key: 'pageState',
  reducer: (state) => ({ count: state.count }),
  storage: window.localStorage
})

const store = createStore<AppStore>({
  state: {
    count: 0,
    msg: 'Hello vue-persist'
  },
  actions: {
    increment(context, payload) {
      setTimeout(() => {
        context.commit('increment', payload)
      }, 1000)
    }
  },
  mutations: {
    increment(state, payload) {
      state.count += payload
    }
  },
  getters: {
    doubleCount(state) {
      return state.count * 2
    }
  },
  plugins: [vuexLocal.plugin]
})

export default store
