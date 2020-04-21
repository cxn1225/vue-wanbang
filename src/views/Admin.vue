<template>
  <div class="box">
    <el-tabs value='first'>
      <el-tab-pane label="商品管理" name="first">
        <ShopAdmin />
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import ShopAdmin from '@components/ShopAdmin'
export default {
  name:'admin',
  beforeRouteEnter: (to, from, next) => {
    if(localStorage.getItem('isLogin') === '1'){
      next()
    }else {
      next('/login')
    }
  },
  components: {
    ShopAdmin
  }
}
</script>
<style scoped>
.box{
  padding: 20px 50px;
}
</style>

