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
  // 递归组件必须自己给自己起名字
  name: 'reSubMenu',
  props: {
    menu: {}
  },
  data() {
    return {
      // kespaths: []
    }
  }
}
</script>