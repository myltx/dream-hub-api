import { useLogto } from '@logto/vue'
import { defineNuxtRouteMiddleware, navigateTo } from '#app'

export default defineNuxtRouteMiddleware((to) => {
  const publicPages = ['/auth/login', '/auth/callBack', '/'] // 定义无需登录的页面
  if (publicPages.includes(to.path)) {
    return
  }

  const { isAuthenticated } = useLogto()

  if (!isAuthenticated.value) {
    return navigateTo('/auth/login')
  }
})
