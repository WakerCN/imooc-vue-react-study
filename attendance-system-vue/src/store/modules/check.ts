/*
 * @Author       : 魏威
 * @Date         : 2023-11-14 15:02
 * @LastEditTime : 2023-11-22 15:44
 * @LastEditors  : Waker
 * @Description  : strore -- vuex -- 审批处理
 */
import { http } from '@/services/https'
import type { Module } from 'vuex'
import type { RootState, StateAll } from '..'

export interface CheckInfo {
  /** 状态 */
  state: string
  /** 事件 */
  time: string[]
  /** 申请人 */
  applicantname: string
  /** 审批人 */
  approvername: string
  /** 审批事由 */
  reason: string
  /** 备注 */
  note: string
}

type CheckList = Array<CheckInfo>
export interface CheckState {
  list: CheckList
}

export const checkStore: Module<CheckState, RootState> = {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    updateList: (state, payload) => {
      state.list = payload
    }
  },
  actions: {
    getList: async (context) => {
      const userInfo = (context.rootState as StateAll).user.infos
      const result = await http.get('/checks/apply', { applicantid: userInfo!._id })
      if (result.errcode === 0) {
        context.commit('updateList', result.rets)
      }
    },
    addApply: async (context, payload) => {
      return await http.post('/checks/apply', payload)
    }
  }
}
