<template>
  <div>
    我是首页
    <router-view></router-view>
  </div>
</template>

<script>
// import { getAuth } from '../api/index'
export default {
  created() {
    // getAuth().then(data => {
    //   console.log(data)
    // })
  }
}
</script>