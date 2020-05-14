<template>
  <el-row>
    <el-col :span="12" class="box1">
      <img src="@images/feedBack/bj.png" width="480px" height="320px" alt="">
    </el-col>
    <el-col :span="12" class="box2">
      <div>
        <h2>意见反馈</h2>
        <h4>感谢你的反馈，我们会积极改善，做出更好的服务的</h4>
        <el-input v-model="title" placeholder="请输入主题"></el-input>
        <p></p>
        <el-input
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
          v-model="textarea">
        </el-input>
        <el-button class="bnt" @click="submit" type="primary">提交</el-button>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'feedback',
  data(){
    return {
      textarea: '',
      title: ''
    }
  },
  beforeRouteEnter: (to, from, next) => {
    if(localStorage.getItem('userId')){
      next()
    }else {
      next('/login')
    }
  },
  methods: {
    submit(){
      if(!this.title){
        this.$message('请输入标题')
      } else if(!this.textarea){
        this.$message('请输入内容')
      } else {
        this.$axios.post('api/addFeedBack', { userId: Number(localStorage.getItem('userId')), textarea: this.textarea, title: this.title, date: this.$moment(new Date()).format("YYYY-MM-DD"), userName: localStorage.getItem('userName') }).then(result => {
          if(result.status === 200){
            this.$message('提交成功')
            this.title = ''
            this.textarea = ''
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.box1{
  padding: 100px;
  padding-top: 50px;
}
.box2{
  padding: 50px 50px 0 20px;
}
.bnt{
  margin-top: 20px;
  float: right;
}
</style>
