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
router.beforeEach((to, from, next) => {

  // 如果没有获取过路由权限，则获取路由权限
  if (!store.state.hasPermisson) {
    console.log('sd');
    // 发送请求获取权限
    store.dispatch('route/getAuthRoute')
    next()
  }
})
Vue.config.productionTip = false

Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')