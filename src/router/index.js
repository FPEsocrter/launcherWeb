import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/admin'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/admin'),
    redirect: '/account_manage',
    children: [
      {
        path: '/account_manage',
        name: 'accountManage',
        meta: {
          title: '账号管理'
        },
        component: () => import('@/views/admin/accountManage/index.vue')
      },
      {
        path: '/browser_add',
        name: 'browserAdd',
        meta: {
          title: '新建浏览器'
        },
        component: () => import('@/views/admin/browser/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
