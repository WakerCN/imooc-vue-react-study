import { rootStore, type StateAll } from '@/store'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { ElMessage } from 'element-plus'

interface Data {
  [index: string]: unknown
}

interface HandleResponse {
  errcode: number
  errmsg: string
  data: unknown
}

interface HTTP {
  get: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<HandleResponse>
  post: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<HandleResponse>
  put: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<HandleResponse>
  patch: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<HandleResponse>
  delete: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<HandleResponse>
}

const instance = axios.create({
  baseURL: 'http://api.h5ke.top',
  timeout: 5000
})

/* 请求拦截
=========================================== */
instance.interceptors.request.use(
  (config) => {
    const token = (rootStore.state as StateAll).user.token
    config.headers['Authorization'] = token
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/* 响应拦截
=========================================== */
instance.interceptors.response.use(
  (response) => {
    if (response.data.errmsg === 'token error') {
      ElMessage.error('登录已过期，请重新登录')
      setTimeout(() => {
        rootStore.commit('user/clearToken')
        window.location.href = '/login'
      }, 1000)
    }
    if (response.data.errcode !== 0) {
      return Promise.reject(response.data)
    } else {
      return response.data
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

/** 请求统一封装，保持一致参数 */
export const http: HTTP = {
  get: (url, data, config) => instance.get(url, { params: data, ...config }),
  post: (url, data, config) => instance.post(url, data, config),
  put: (url, data, config) => instance.put(url, data, config),
  patch: (url, data, config) => instance.patch(url, data, config),
  delete: (url, data, config) => instance.delete(url, { params: data, ...config })
}
