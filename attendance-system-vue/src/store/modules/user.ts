/*
 * @Author       : 魏威
 * @Date         : 2023-11-14 15:02
 * @LastEditTime : 2023-11-15 17:57
 * @LastEditors  : Waker
 * @Description  : store -- vuex -- 用户处理
 */

import type { Module } from 'vuex'
import type { RootState } from '..'
import { http } from '@/services/https'

interface Infos {
  [index: string]: unknown
}

export interface UserState {
  token?: string
  infos?: Infos
}

export const userStore: Module<UserState, RootState> = {
  namespaced: true,
  state: {},
  mutations: {
    updateToken(state, payload) {
      state.token = payload
    },
    clearToken(state) {
      state.token = undefined
    },
    updateInfos(state, payload) {
      state.infos = payload
    }
  },
  actions: {
    login(context, payload) {
      return http.post('/users/login', payload)
    },
    getInfos() {
      return http.get('/users/infos')
    }
  }
}
