// 管理路由的vuex
import {
    getAuth
} from '@/api/index'
const state = {}
const actions = {
    async getAuthRoute() {
        try {
            // 获取后台返回的权限列表
            const authList = await getAuth()
            // 根据权限列表来过滤出我们需要的路由列表
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