<template>
  <div>
    <!-- {{menuList}} -->
    <el-col :span="12">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <template v-for="(menu,i) in menuList">
          <ResuMenu :menu="menu" :kespaths="kespaths" :key="i"></ResuMenu>
        </template>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ResuMenu from './ResuMenu'
export default {
  components: { ResuMenu },
  computed: {
    ...mapState('router', ['menuList'])
  },
  data() {
    return {
      kespaths: ''
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath)
    }
  }
}
</script>