import axios from 'axios'
import { Message } from 'element-ui'
const request = axios.create({
  baseURL: 'http://liufusong.top:8899/api/private/v1/',
  timeout: 5000
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (response.data.meta.msg === '登录成功') {
    return response
  } else {
    Message.error(response.data.meta.msg)
    return Promise.reject(new Error(response.data.meta.msg))
  }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
export default request
