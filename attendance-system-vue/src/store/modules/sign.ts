/*
 * @Author       : 魏威
 * @Date         : 2023-11-14 15:02
 * @LastEditTime : 2023-11-14 15:17
 * @LastEditors  : Waker
 * @Description  : store -- vuex -- 签到处理
 */
import type { Module } from 'vuex'
import type { RootState } from '..'

export interface SignState {}

export const signStore: Module<SignState, RootState> = {}
