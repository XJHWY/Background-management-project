import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTime } from '@/utils/auth'
const request = axios.create({
  baseURL: 'http://liufusong.top:8899/api/private/v1/',
  timeout: 5000
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (response.data.meta.status === 200 || response.data.meta.status === 201) {
    return response
  } else {
    Message.error(response.data.meta.msg)
    return Promise.reject(new Error(response.data.meta.msg))
  }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  const token = store.state.user.token
  const time = Date.now() - getTime()
  if (token) {
    if (time > 7200000) {
      store.dispatch('user/logout')
    }
    config.headers.Authorization = token
  }
  return config
})
export default request
