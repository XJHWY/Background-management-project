import request from '@/utils/request'

// 用户数据列表
export const userInfoApi = (params) => request({
  url: '/users',
  method: 'GET',
  params
})
