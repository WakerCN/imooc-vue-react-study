/*
 * @Author       : 魏威
 * @Date         : 2023-11-14 15:02
 * @LastEditTime : 2023-11-14 15:56
 * @LastEditors  : Waker
 * @Description  : strore -- vuex -- 审批处理
 */
import type { Module } from 'vuex'
import type { RootState } from '..'

export interface CheckState {}

export const checkStore: Module<CheckState, RootState> = {}
