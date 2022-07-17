import request from '@/utils/request'
// 初始查询商品列表
export const getCategoriesApi = (params) => request({
  url: '/categories',
  method: 'GET',
  params
})
// 添加商品列表
export const addCategoryApi = (data) => request({
  url: '/categories',
  method: 'POST',
  data
})
// 根据id查询分类
export const getCategoryByIdApi = (id, params) => request({
  url: `categories/${id}/attributes`,
  method: 'GET',
  params
})

// 添加动态参数
export const addCategoryAttrApi = (id, data) => request({
  url: `categories/${id}/attributes`,
  method: 'POST',
  data
})

// 删除动态参数
export const deleteCategoryAttrApi = (id, attrId) => request({
  url: `categories/${id}/attributes/${attrId}`,
  method: 'DELETE'
})
