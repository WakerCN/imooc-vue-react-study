/*
 * @Author       : 魏威
 * @Date         : 2023-11-14 15:02
 * @LastEditTime : 2023-11-14 15:02
 * @LastEditors  : Waker
 * @Description  : store -- vuex -- 消息处理
 */
import type { Module } from 'vuex'
import type { RootState } from '..'

export interface NewsState {}

export const newsStore: Module<NewsState, RootState> = {}
