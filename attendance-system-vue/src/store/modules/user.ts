/*
 * @Author       : 魏威
 * @Date         : 2023-11-14 15:02
 * @LastEditTime : 2023-11-14 16:12
 * @LastEditors  : Waker
 * @Description  : store -- vuex -- 用户处理
 */

import type { Module } from 'vuex'
import type { RootState } from '..'
import { http } from '@/services/https'

export interface UserState {}

export const userStore: Module<UserState, RootState> = {
  namespaced: true,
  state: {},
  actions: {
    login() {
      return http.post('/users/login', { email: 'huangrong@imooc.com', pass: 'huangrong' })
    }
  }
}
