import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 如果是开发环境就使用mock 数据
if (process.env.NODE_ENV === 'development') {
  require('./mock')
}
// 路由钩子
router.beforeEach(async (to, from, next) => {
  // 如果没有获取过路由权限，则获取路由权限
  if (!store.state.hasPermisson) {
    // 发送请求获取权限
    let newRouter = await store.dispatch('router/getAuthRoute')
    // vue api 提供的动态路由添加的方法
    router.addRoutes(newRouter)
    next({
      ...to,
      replace: true
    })
  } else {
    next()
  }
})
// 定义自定义组件指令
Vue.directive('has', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el, binding, vnode) {
    let value = binding.value
    // 获取虚拟dom
    let flat = vnode.context.$store.state.router.btnPermission[value]
      // 删除dom 元素
      !flat && el.parentNode.removeChild(el)
  }
})

Vue.config.productionTip = false


Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')