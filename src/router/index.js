import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/Layout'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login/login.vue'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  }
]

const router = new VueRouter({
  routes
})

export default router
