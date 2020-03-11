<template>
  <div class="head">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#ff5000"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item class="title">万 邦 电 商</el-menu-item>
      <el-menu-item index="1"><router-link to='/'>首页</router-link></el-menu-item>
      <el-menu-item index="2" v-if="!isLogin"><router-link to='login'>登录</router-link></el-menu-item>
      <el-menu-item index="2" v-if="isLogin"><a @click="noLogin">注销</a></el-menu-item>
      <el-menu-item index="3"><router-link to='register'>注册</router-link></el-menu-item>
      <el-menu-item index="3"><router-link to='shopcar'>购物车</router-link></el-menu-item>
      <el-menu-item index="3"><router-link to='feedback'>意见反馈</router-link></el-menu-item>
    </el-menu>
  </div>
</template>

<script>

export default {
  name: 'app-head',
  data(){
    return {
      isLogin:JSON.parse(localStorage.getItem('isLogin'))
    }
  },
  methods:{
    noLogin(){
      localStorage.setItem('isLogin', false)
      window.location.reload()
    }
  }
}
</script>
<style scoped>
.head{
  position: fixed;
  width: 1519px;
  z-index: 20;
}
.title{
  width: 1000px;
  font-weight: 800;
  font-size: 22px;
  padding-left: 50px;
}
.el-menu-demo a{
  text-decoration: none;
  display: inline-block;
  height: 60px;
}
</style>
