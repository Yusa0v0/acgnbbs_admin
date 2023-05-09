import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style




router.beforeEach((to, from, next) => {
  // 检查路由是否需要进行身份验证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 检查用户是否已登录，这里假设已登录
    const isAuthenticated = localStorage.getItem("logined")
    if (!isAuthenticated) {
      // 如果用户未登录，则重定向到登录页面
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      // 如果用户已登录，则允许导航
      next()
    }
  } else {
    // 如果路由不需要进行身份验证，则允许导航
    next()
  }
})



router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
