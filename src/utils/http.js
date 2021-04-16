import axios from 'axios'
import requestStatus from '@/store/modules/request-status'

const isDev = import.meta.env.DEV
const devProxyPrefix = import.meta.env['VITE_APP_PROXY_PREFIX']
const regxCustomProxy = new RegExp(import.meta.env['VITE_APP_CUSTOM_PROXY_PATTEN'])
const regxHttp = /^http(s?):\/\//

const RESPONSE_CODE = {
  SUCCESS: '2000',
  INVALID_TOKEN: '4002',
}

function withProxy(url = '') {
  if (regxHttp.test(url)) {
    return url
  }

  if (regxCustomProxy.test(url)) {
    const originRequestUrl = url.replace(regxCustomProxy, '')
    return isDev ? url : originRequestUrl
  } else {
    return isDev ? `${devProxyPrefix}${url}` : url
  }
}

const axiosInstance = axios.create({
  timeout: 10000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
})

axiosInstance.interceptors.request.use((config = {}) => {
  if (config.useLoading) {
    requestStatus.add()
  }

  config.headers['Authorization'] = window.localStorage.getItem('token') || ''
  config.url = withProxy(config.url)

  return config
})

axiosInstance.interceptors.response.use(
  (res) => {
    if (res.config.useLoading) {
      requestStatus.sub()
    }

    if (res?.data?.code !== undefined) {
      switch (res?.data?.code) {
        case RESPONSE_CODE.SUCCESS:
          return res.data
        case RESPONSE_CODE.INVALID_TOKEN:
          return Promise.reject('登录过期')
        default:
          return Promise.reject('请求失败')
      }
    } else {
      return Promise.reject('服务器异常')
    }
  },
  (err) => {
    // 先获取 err 中保存的 config
    // 注意: 通过 'cancel' 取消的请求无法通过这种方式获取 config
    if (err && typeof err.toJSON === 'function') {
      // toJSON 是 axios@0.21.1 以上的版本提供的 api
      // 通过这种方式获取到配置项(config)
      const { useLoading, useError } = err.toJSON().config || {}
      useLoading && requestStatus.sub()
      useError && console.error('网络异常', err)
    }

    return Promise.reject(err)
  }
)

const get = (url, params, config = { useLoading: true, useError: true }) =>
  axiosInstance.get(url, { params, ...config })
const post = (url, data, config = { useLoading: true, useError: true }) => axiosInstance.post(url, data, config)

export { get, post, withProxy }
