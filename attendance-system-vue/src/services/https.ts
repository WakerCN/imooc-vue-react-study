import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

interface Data {
  [index: string]: unknown
}

interface HTTP {
  get: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
  post: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
  put: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
  patch: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
  delete: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
}

const instance = axios.create({
  baseURL: 'http://api.h5ke.top',
  timeout: 5000
})

/* 请求拦截
=========================================== */
instance.interceptors.request.use(
  (config) => {
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
    return response
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
