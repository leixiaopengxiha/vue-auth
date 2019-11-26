import Vue from 'vue'
import Vuex from 'vuex'
// import route from './modules/router'
Vue.use(Vuex)

const modulesFiles = require.context('./modules', true, /\.js$/)
// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})
// console.log(modules);
export default new Vuex.Store({
  state: {
    hasPermisson: false,
  },
  mutations: {
    setPermistion(state, data) {
      state.hasPermisson = true
    }
  },
  // actions: {},


  modules
  // modules: {
  //   route
  // }
})