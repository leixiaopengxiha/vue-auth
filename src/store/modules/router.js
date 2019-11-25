// 管理路由的vuex
import {
    getAuth
} from '@/api/index'
import {
    routerMap
} from '../../router/index'
// 过滤需要的路由方法

function getAccesRouterList(roters, page) {
    return roters.filter((roter) => {
        if (page[roter.name]) {
            // 递归判断子路由权限
            if (roter.children) {
                roter.children = getAccesRouterList(roter.children, page)
            }
            return true
        }
        return false
    })
}
const state = {
    // 初始化设置用户没有权限
    // hasPermisson: false,
}
const mutations = {

}

const actions = {
    async getAuthRoute({
        commit
    }) {
        try {
            // 获取后台返回的权限列表
            const {
                rules: {
                    page,
                    component
                }
            } = await getAuth()
            // 根据权限列表来过滤出我们需要的路由列表
            let needRouter = getAccesRouterList(routerMap, page)
            // 已经获取到权限 提交到全局
            commit('setPermistion', null, {
                root: true
            })
            return needRouter
        } catch (e) {
            console.log(e);
        }
    }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations
}