import { createStore } from 'vuex'

const store = createStore({
  state: {
    count: 0
  },
  actions: {
    increment(context, payload) {
      setTimeout(() => {
        context.commit('increment', payload)
      }, 500)
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
  }
})

export default store
