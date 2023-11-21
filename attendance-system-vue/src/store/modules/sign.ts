/*
 * @Author       : 魏威
 * @Date         : 2023-11-14 15:02
 * @LastEditTime : 2023-11-20 17:52
 * @LastEditors  : Waker
 * @Description  : store -- vuex -- 签到处理
 */
import { http } from '@/services/https'
import type { Module } from 'vuex'
import type { RootState, StateAll } from '..'

interface SignInfo {
  [index: string]: unknown
}

export interface SignState {
  infos?: SignInfo
}

export const signStore: Module<SignState, RootState> = {
  namespaced: true,
  state: {},
  mutations: {
    updateInfos(state, infos) {
      state.infos = infos
    }
  },
  actions: {
    getInfos: async (context, payload) => {
      const res = await http.get(`/signs/time`, payload)
      if (res.errcode === 0) {
        context.commit('updateInfos', res.infos)
      }
      return res
    },
    sign: async (context) => {
      const userid = (context.rootState as StateAll).user.infos!._id
      const res = await http.put(`/signs/time`, { userid })
      if (res.errcode === 0) {
        context.commit('updateInfos', res.infos)
      }
    }
  }
}
