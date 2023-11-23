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
  _id: string
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

type ApplyList = Array<CheckInfo>
type CheckList = Array<CheckInfo>

export interface CheckState {
  applyList: ApplyList
  checkList: CheckList
}

export const checkStore: Module<CheckState, RootState> = {
  namespaced: true,
  state: {
    applyList: [],
    checkList: []
  },
  mutations: {
    updateApplyList: (state, payload) => {
      state.applyList = payload
    },
    updateCheckList: (state, payload) => {
      state.checkList = payload
    }
  },
  actions: {
    /** 获取申请列表 */
    getApplyList: async (context) => {
      const userInfo = (context.rootState as StateAll).user.infos
      const result = await http.get('/checks/apply', { applicantid: userInfo!._id })
      if (result.errcode === 0) {
        context.commit('updateApplyList', result.rets)
      }
    },
    /** 添加审批申请 */
    addApply: async (context, payload) => {
      return await http.post('/checks/apply', payload)
    },
    /** 获取审批列表 */
    getCheckList: async (context) => {
      const userInfo = (context.rootState as StateAll).user.infos
      const result = await http.get('/checks/apply', { approverid: userInfo!._id })
      if (result.errcode === 0) {
        context.commit('updateCheckList', result.rets)
      }
    },
    /** 审批 */
    apply: async (context, payload) => {
      return await http.put('checks/apply', payload)
    }
  }
}
