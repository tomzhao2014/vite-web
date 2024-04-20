import axios, { type AxiosRequestConfig } from 'axios'
import { assign } from 'lodash-es'
import { ElMessage as message } from 'element-plus'
const UN_SUPPORT_DIY_HEADER_REGEX = /^http(s)?:\/\//i
// 请求错误统一处理
import ERRORCODES from '@/enum/error-code'

import { resetInterfacePath } from '@/utils'
// 默认请求失效时间5s
export const AXIOS_TIMEOUT_LIMIT = 5000
import type { NUNBER_STRING as ERROR_CODES_TYPES } from '@/interface'
import { log } from 'console'
// 也可以直接使用 typeof 获取 ERROR_CODES 的接口类型，这个时候需要ERROR_CODES 在同一文件内才有效果
// type ERROR_CODES_TYPES = typeof ERROR_CODES
const ERROR_CODES = ERRORCODES as ERROR_CODES_TYPES 
/**
 * 后台接口公共的返回格式
 * 具体根据实际跟后台约定的定义
 */
export interface ResCommonType<T = unknown> {
  code: number
  data: T
  msg?: string
}


const service = axios.create({
  baseURL: import.meta.env.SYS_PROXY_API,
  timeout: AXIOS_TIMEOUT_LIMIT,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
})



// 请求拦截
service.interceptors.request.use(
  
  (config) => {

  

    /** 重置接口路径 */
    config.url = resetInterfacePath(config.url || '')
    /** 如果不是正常的HTTP请求 */
    if (!UN_SUPPORT_DIY_HEADER_REGEX.test(config.url ?? '')) {
      assign(config.headers, {
        // 'X-RequestFrom': 'person',
      })
    }else{/** 如果是正常的HTTP请求 */
      assign(config.headers, {
        'token': localStorage.getItem('token')|| '',
      })
      /** 下载文件时设置请求头 */   
      if (config?.url?.includes('/DownloadFile')) {
          assign(config.headers, {
            'Accept': 'ext/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Content-Type': 'application/x-www-form-urlencoded',
            'responseType': 'blob'
          })
      }
    }
    return config
  },
  (err) => Promise.reject(err),
)

// 响应拦截
service.interceptors.response.use(
  (response) => {
    if (typeof response.data === 'string') {
      // location.href = '/signIn'
      // return Promise.reject('登录失效')
    }
    /** 统一处理后台返回的错误信息 */
    const data = response.data
    const resCode: keyof ERROR_CODES_TYPES = data.status || data.code
    console.log('ERROR_CODES[resCode]', ERROR_CODES[resCode])
    if (ERROR_CODES[resCode]) {
      return Promise.reject(data)
    }
    return Promise.resolve(data)
  },
  (err) => {
    let errCode: keyof ERROR_CODES_TYPES = 500
    let errMsg = err?.message || '连接到服务器失败'
    if (err?.response) {
      const { code, status } = err.response
      errCode = code || status || 500
      errMsg = ERROR_CODES[errCode]
    }
    console.log('ERROR_CODES[]', errCode, ERROR_CODES[errCode])
    message.error(errMsg)
    return Promise.reject({
      code: errCode,
      msg: errMsg,
      data: err || null,
    })
  },
)

/**
 * 发起GET请求, 泛型 T 定义返回数据 data 项类型, U 定义请求数据类型
 * @param {string} url 请求链接
 * @param {object} params 请求参数
 * @param {object} config 配置
 */
export const get = <U = unknown, T = unknown>(
  url: string,
  params?: U,
  config?: AxiosRequestConfig,
) => service.get<T, T>(
    url, { params: { ...params, t: Date.now() }, ...config },
  )

/**
 * 发起POST请求, 泛型 T 定义返回数据 data 项类型, U 定义请求数据类型
 * @param {string} url 请求链接
 * @param {object} params 请求参数
 * @param {object} config 配置
 */
export const post = <U = unknown, T = unknown>(
  url: string,
  params?: U,
  config: AxiosRequestConfig = {},
) => {
  if (Array.isArray(params)) {
    return service.post<T, T>(url, [...params], config)
  }
  return service.post<T, T>(url, { ...params }, config)
}

/**
 * 发起FormData请求, 泛型 T 定义返回数据 data 项类型, U 定义请求数据类型
 * @param {string} url 请求链接
 * @param {object} params 请求参数
 * @param {object} config 配置
 */
// export const postForm = <U = unknown, T = unknown>(
//   url: string,
//   params?: U,
//   config: AxiosRequestConfig = {},
// ) => axios.post<T, ResCommonType<T>>(url, qs.stringify({ ...params }), config);
export const postForm = <U = unknown, T = unknown>(
  url: string,
  params?: U,
  config: AxiosRequestConfig = {},
) => service.post<T, T>(url, params, config)

/**
 * 文件下载请求, 泛型 T 定义返回数据 data 项类型, U 定义请求数据类型
 * @param {string} url 请求链接
 * @param {object} params 请求参数
 * @param {object} config 配置
 */
// export const postFile = <U = unknown, T = unknown>(
//   url: string,
//   params?: U,
//   config: AxiosRequestConfig = { responseType: 'blob' },
// ) => axios.post<T, ResCommonType<T>>(url, { ...params }, config);

export default {
  get,
  post,
  // postForm,
  // postFile,
}