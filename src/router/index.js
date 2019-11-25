import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import store from '@/store'
Vue.use(VueRouter)
export const routerMap = [{
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      title: '首页',
    },
    children: [

      {
        path: 'home_index',
        name: 'home_index',
        meta: {
          title: '首页可视对讲上课',
        },
        component: () => import('@/views/home-index'),
      },
      {
        path: 'home_index1',
        name: 'home_index1',
        meta: {
          title: '首页撒大声地',
        },
        component: () => import('@/views/home-index1'),
      },
    ],
  },

  {
    path: '/count-to',
    name: 'count_to',
    meta: {
      title: 'count_to',
    },
    component: () => import('@/views/count-to.vue'),
  },
  {
    path: '/upload',
    name: 'upload',
    meta: {
      title: 'upload',
    },
    component: () => import('@/views/upload.vue'),
  },
  {
    path: '/form',
    name: 'form',
    meta: {
      title: 'form',
    },
    component: () => import('@/views/form.vue'),
  },

  {
    path: '/store',
    name: 'store',
    meta: {
      title: 'sotre',
    },
    component: () => import('@/views/store.vue'),
  },
];
// 大家都能看到的
const routes = [{
    path: '/',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/login.vue')
  },
  {
    path: '*',
    component: () => import('@/views/error_404.vue')
  }
]
// console.log(store.state.route.routeList);
const router = new VueRouter({
  mode: 'history',
  routes
})
// console.log(router);

export default router