<template>
  <div class="div">
    <div class="login-window">
      <h4>
        密码登录
        <span class="back" @click="backHome">返回>></span>
      </h4>
      <div class="input">
        <el-input placeholder="请输入内容" v-model="user.userName">
          <template slot="prepend">账 号</template>
        </el-input>
      </div>
      <div class="input">
        <el-input type="password" placeholder="请输入内容" v-model="user.passWord">
          <template slot="prepend">密 码</template>
        </el-input>
      </div>
      <div class="select">
        <span>用户类型：</span>
        <el-select v-model="user.type" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <el-button class="button" type="primary" @click="submit">登录</el-button>
      <p class="p">
        <router-link to="/">忘记密码</router-link>&nbsp;
        <router-link to="register">没有账号</router-link>
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
        type:''
      },
      options: [{
        value: '1',
        label: '管理员'
       }, {
        value: '2',
        label: '用户'
      }]
    }
  },
  methods:{
    submit(){
      console.log(localStorage.getItem('isLogin'))
      if(localStorage.getItem('isLogin') !== 'false' && localStorage.getItem('isLogin') !== null){
        this.$message('您已登录');
        return 0
      }
      if(this.user.userName === ''){
        this.$message('请输入用户名');
      }else if(this.user.passWord === ''){
        this.$message('请输入密码');
      }else if(this.user.type === ''){
        this.$message('请选择用户类型');
      }
      this.$axios.post("api/login", this.user).then(result => {
        if(result.data.data.length != 0){   // 登陆成功
          this.$message('欢迎登陆');  

          this.$store.dispatch("setIsLoginAsync", true)  // 改变vuex登录状态

          if(result.data.data[0].type === '1'){   // 判断用户类型
            localStorage.setItem('isLogin', '1')   // 修改本地储存
            this.$router.push('/admin')
            localStorage.setItem('userName', result.data.data[0].name)
          }else if(result.data.data[0].type === '2'){
            this.$store.dispatch("setuserIdAsync", result.data.data[0].id)  // 改变vuex用户id
            localStorage.setItem('isLogin', '2')   // 修改本地储存
            localStorage.setItem('userId', result.data.data[0].id)   // 修改本地储存
            localStorage.setItem('userName', result.data.data[0].name)
            this.$router.push('/')
          }

        }else if(result.data.data.length == 0){   // 登录失败
          this.$message('用户名或密码错误');
        }
      })
    },
    backHome(){
      this.$router.push('/')
    }
  }
}
</script>
<style scoped>
.div{
  background-image: url('../assets/login/bac.jpg');
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
.back{
  position: absolute;
  right: 20px;
  color: #00E;
  font-weight: 100;
  font-size: 14px;
  cursor: pointer;
}
.input, .select{
  margin-bottom: 15px;
  width: 100%;
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
  color: #00E;
}
.p a:hover{
  color: #f40;
}
h4{
  text-align: center
}
</style>

