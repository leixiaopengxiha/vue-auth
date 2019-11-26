# 路由权限

管理员 用户
商品 商品信息

## npm i mock axios

下载 mock 模拟数据

## 权限流程

1. 后台动态返回路由
2. 要判断单前角色有没有获取过权限列表
3. 导航的数据结构

```js
// 导航的数据结构
[{ name: "a", children: [{ name: "b" }] }, { name: "b" }];
```

### 一、服务端 （服务端返回权限列表）

```js
rules: {
     // 路由权限
    page: {
        home: true,
        home_index: true,
        home_index1: true,
        about: true,
        argu: true,
        count_to: true,
        menu_page: true,
        upload: true,
        form: true,
        folder_tree: true,
        table_page: true,
        render_page: true,
        split_pane: true,
        parent: true,
        child: true,
        named_view: true,
        store: true,
        main: true
    },
    // 组件权限
    component: {
        edit_button: true,
        publish_button: false
    }
}
```

### 二拆分路由 (把公共的路由和权限路由拆分开)，根据路由构建组件

```js
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
// import store from '@/store'
Vue.use(VueRouter);

export const routerMap = [
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: {
      title: "首页"
    },
    children: [
      {
        path: "/home_index",
        name: "home_index",
        meta: {
          title: "首页1"
        },
        component: () => import("@/views/home-index"),
        children: [
          {
            path: "/home_index1",
            name: "home_index1",
            meta: {
              title: "首页2"
            },
            component: () => import("@/views/home-index1")
          }
        ]
      }
    ]
  },

  {
    path: "/count-to",
    name: "count_to",
    meta: {
      title: "计数"
    },
    component: () => import("@/views/count-to.vue")
  },
  {
    path: "/upload",
    name: "upload",
    meta: {
      title: "更新"
    },
    component: () => import("@/views/upload.vue")
  },
  {
    path: "/form",
    name: "form",
    meta: {
      title: "表单"
    },
    component: () => import("@/views/form.vue")
  },

  {
    path: "/store",
    name: "store",
    meta: {
      title: "数据"
    },
    component: () => import("@/views/store.vue")
  }
];
// 大家都能看到的
const routes = [
  {
    path: "/",
    name: "login",
    meta: {
      title: "登录"
    },
    component: () => import("@/views/login.vue")
  },
  {
    path: "*",
    component: () => import("@/views/error_404.vue")
  }
];
// console.log(store.state.route.routeList);
const router = new VueRouter({
  mode: "history",
  routes
});
// console.log(router);

export default router;
```

### 三、判断权限有没有获权限 如果没有就获取

1. 默认设置没有获取过权限，在 vuex 里面设置没有获取过权限

```js
// 在vuex 里面
 state: {
    hasPermisson: false,
  },
```

2. 在路由钩子函数里面判断有没有获取过权限如果没有就获取权限

```js
// 如果是开发环境就使用mock 数据
if (process.env.NODE_ENV === "development") {
  require("./mock");
}
// 路由钩子
router.beforeEach(async (to, from, next) => {
  // 如果没有获取过路由权限，则获取路由权限
  if (!store.state.hasPermisson) {
    // 发送请求获取权限
    let newRouter = await store.dispatch("router/getAuthRoute");
    // vue api 提供的动态路由添加的方法
    router.addRoutes(newRouter);
    next({
      ...to,
      replace: true
    });
  } else {
    next();
  }
});
```

### 四、在 vuex 中获取权限列表并过滤出需要的路由

```js
// 管理路由的vuex
import { getAuth } from "@/api/index";
import { routerMap } from "../../router/index";

// 过滤需要的路由方法 返回有权限的路由
function getAccesRouterList(roters, page) {
  return roters.filter(roter => {
    if (page[roter.name]) {
      // 递归判断子路由权限
      if (roter.children) {
        roter.children = getAccesRouterList(roter.children, page);
      }
      return true;
    }
    return false;
  });
}

const state = {
  // 初始化设置用户没有权限
  // hasPermisson: false,
  menuList: [],
  btnPermission: {
    edit_button: true,
    publish_button: true
  }
};

const mutations = {
  setMenuList(state, routers) {
    state.menuList = routers;
  },
  setComp(state, payload) {
    state.btnPermission.edit_button = payload.edit_button;
    state.btnPermission.publish_button = payload.publish_button;
  }
};

const actions = {
  async getAuthRoute({ commit }) {
    try {
      // 获取后台返回的权限列表
      const {
        rules: { page, component }
      } = await getAuth();
      // 根据权限列表来过滤出我们需要的路由列表
      let needRouter = getAccesRouterList(routerMap, page);
      // 根据权限列表来渲染需要的导航结构
      commit("setComp", component);
      // 设置菜单列表数据
      commit("setMenuList", needRouter);
      // 已经获取到权限 提交到全局
      commit("setPermistion", null, {
        root: true
      });
      return needRouter;
    } catch (e) {
      console.log(e);
    }
  }
};
export default {
  namespaced: true,
  state,
  actions,
  mutations
};
```

---

### 动态添加路由

```js
// 路由钩子
router.beforeEach(async (to, from, next) => {
  // 如果没有获取过路由权限，则获取路由权限
  if (!store.state.hasPermisson) {
    // 发送请求获取权限
    let newRouter = await store.dispatch("router/getAuthRoute");
    // vue api 提供的动态路由添加的方法
    /* + */ router.addRoutes(newRouter);
    // hack 写法
    /* + */ next({ ...to, replace: true });
  } else {
    /* + */ next();
  }
});
```

### 构建菜单组件 （递归组件）

```html
<!-- menuList 组件 -->
<template>
  <div>
    <el-col :span="12">
      <el-menu>
        <template v-for="(menu,i) in menuList">
          <ResuMenu :menu="menu" :kespaths="kespaths" :key="i"></ResuMenu>
        </template>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import ResuMenu from "./ResuMenu";
  export default {
    components: { ResuMenu },
    computed: {
      ...mapState("router", ["menuList"])
    }
  };
</script>
```

```html
<!-- 递归组件 -->
<template>
  <div>
    <template>
      <el-submenu :index="menu.path" v-if="menu.children">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{menu.meta.title}}</span>
        </template>
        <template v-for="(m,i) in menu.children">
          <!-- 递归组价 -->
          <reSubMenu :menu="m" :key="i"></reSubMenu>
        </template>
      </el-submenu>
      <router-link :to="{path: menu.path}" v-else>
        <el-menu-item :index="menu.path">
          <i class="el-icon-menu"></i>
          <span slot="title">{{menu.meta.title}}</span>
        </el-menu-item>
      </router-link>
    </template>
  </div>
</template>
<script>
  export default {
    // 递归组件必须自己给自己起名字用了自己调用自己
    name: "reSubMenu",
    props: {
      menu: {}
    },
    data() {
      return {
        // kespaths: []
      };
    }
  };
</script>
```

### 组件权限 （服务端数据获取的，组件如果较多可以使用自定义指令）

自定义指令

```html
<!--  用法 -->
<p v-has="'edit_button'">编辑</p>
```

```js
// 在main.js里面 自定义指令
Vue.directive("has", {
  //当被绑定的元素插入到 DOM 中时……
  inserted: function(el, binding, vnode) {
    let value = binding.value;
    // 获取虚拟dom let flat =
    vnode.context.$store.state.router.btnPermission[value]; // 删除dom 元素 !flat &&
    el.parentNode.removeChild(el);
  }
});
```
