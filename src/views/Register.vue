<template>
  <div class="div">
    <div class="login-window">
      <h4>免费注册</h4>
      <div class="input">
        <el-input placeholder="请输入内容" v-model="user.userName">
          <template slot="prepend">账 号</template>
        </el-input>
      </div>
      <div class="input">
        <el-input placeholder="请输入内容" v-model="user.passWord">
          <template slot="prepend">密 码</template>
        </el-input>
      </div>
      <div class="input">
        <el-input placeholder="请输入内容" v-model="user.passWord2">
          <template slot="prepend">确认密码</template>
        </el-input>
      </div>
      <el-button class="button" type="primary" @click="submit">注册</el-button>
      <p class="p">
        <router-link to="login">已有账号</router-link>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name:'login',
  data(){
    return {
      user:{
        userName:'',
        passWord:'',
        passWord2:''
      }
    }
  },
  methods:{
    submit(){
      if(this.user.userName === ''){
        this.$message('请输入用户名');
      }else if(this.user.passWord === ''){
        this.$message('请输入密码');
      }else if(this.user.passWord !== this.user.passWord2){
        this.$message('两次输入密码不相同');
      }
      this.$axios.post("api/register", this.user).then(result => {
        this.$message(result.data.data);
        if(result.data.code === 1){
          this.$router.push('/login')
        }
      })
    }
  }
}
</script>
<style scoped>
.div{
  background-image: url('../assets/login/register.jpg');
  background-size: 100% 100%;
  height: 100vh;
  position: relative;
}
.login-window{
  position: absolute;
  background-color: #fff;
  right: 150px;
  top: 180px;
  padding: 0 15px 20px 15px;
  border-radius: 5px;
}
.input{
  margin-bottom: 15px;
}
.button{
  width: 100%;
}
.p{
  text-align: right;
}
.p a{
  font-size: 13px;
  text-decoration: none;
}
.p a:hover{
  color: #f40;
}
h4{
  text-align: center
}
</style>

