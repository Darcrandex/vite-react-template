import axios from 'axios'
import QueryString from 'qs'

export const http = axios.create({
  baseURL: import.meta.env.DEV ? import.meta.env.VITE_APP_API_PREFIX : import.meta.env.VITE_APP_API_URI,
  paramsSerializer: { serialize: (params) => QueryString.stringify(params, { arrayFormat: 'brackets' }) },
})

http.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('token')
  config.headers = { ...config.headers, Authorization: `Bearer ${token}` }

  return config
})

http.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    // status >=300 时会在这里被拦截
    if (err && typeof err.toJSON === 'function') {
      const error = err.toJSON() || {}
      if (error.status === 401) {
        console.error('登录凭证过期')
      }
    }

    return Promise.reject(err)
  }
)
