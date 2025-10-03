import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/views/pages/main/MainPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainPage,
    },
    {
      path: '/rerender',
      name: 'rerender',
      component: () => import('@/views/pages/rerender/RerenderPage.vue'),
    },
    {
      path: '/computed-method',
      name: 'computed-method',
      component: () => import('@/views/pages/computed-method/ComputedMethodPage.vue'),
    },
    {
      path: '/debounce-throttle',
      name: 'debounce-throttle',
      component: () => import('@/views/pages/debounce-throttle/DebounceThrottlePage.vue'),
    },
    {
      path: '/lazy',
      name: 'lazy',
      component: () => import('@/views/pages/lazy-load/LazyLoadPage.vue'),
    },
    {
      path: '/virtual',
      name: 'virtual',
      component: () => import('@/views/pages/virtual-list/VirtualListPage.vue'),
    },
  ],
})

export default router
