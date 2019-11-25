import Vue from 'vue'
import Vuex from 'vuex'
import route from './modules/router'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 初始化设置用户没有权限
    hasPermisson: false
  },
  mutations: {},
  actions: {},
  modules: {
    route
  }
})