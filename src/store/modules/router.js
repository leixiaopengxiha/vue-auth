// 管理路由的vuex
import {
    getAuth
} from '@/api/index'
import {
    routerMap
} from '../../router/index'
// 过滤需要的路由方法
function getAccesRouterList(roters, authList) {
    let aa = roters.filter((roter) => {
        if (authList.rules.page[roter.name]) {
            return true
        }
        return false
    })
    console.log(aa);
}
const state = {}
const actions = {
    async getAuthRoute() {
        try {
            // 获取后台返回的权限列表
            const authList = await getAuth()
            // 根据权限列表来过滤出我们需要的路由列表
            let needRouter = getAccesRouterList(routerMap, authList)
            console.log(authList);
        } catch (e) {
            console.log(e);
        }
    }
}
const mutations = {}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}