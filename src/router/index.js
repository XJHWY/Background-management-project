import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
  {
    path: '/login',
    component: () => import('@/views/login/login')
  },
  {
    path: '/404',
    component: () => import('@/views/404/404')
  },
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/Layout/index.vue'),
    children: [
      {
        path: 'users',
        component: () => import('@/views/second/users/users')
      },
      {
        path: 'roles',
        component: () => import('@/views/second/permissions/roles')
      },
      {
        path: 'rights',
        component: () => import('@/views/second/permissions/rights')
      },
      {
        path: 'orders',
        component: () => import('@/views/second/order/orders')
      },
      {
        path: 'goods',
        component: () => import('@/views/second/goods/goods')
      },
      {
        path: 'categories',
        component: () => import('@/views/second/goods/categories')
      },
      {
        path: 'params',
        component: () => import('@/views/second/goods/params')
      },
      {
        path: 'orders',
        component: () => import('@/views/second/order/orders')
      },
      {
        path: 'home',
        component: () => import('@/views/index')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
