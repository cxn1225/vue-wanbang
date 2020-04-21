<template>
  <div class="box">
    <div class="block">
      <span class="span">选择评分:</span>
      <el-rate
        v-model="value"
        :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
      </el-rate>
    </div>
    <br>
    <div style="width: 50%">
      <span class="span">填写评论:</span>
      <el-input
        type="textarea"
        :rows="5"
        maxlength="100"
        placeholder="最多输入100字"
        v-model="textarea">
      </el-input>
      <p></p>
      <el-button class="bnt" @click="submit" type="primary">提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data(){
    return {
      textarea: '',
      value: 0
    }
  },
  props: {
    shopData: {
      type: Object,
      require: true
    },
  },
  methods: {
    submit(){
      if(this.value === 0){
        this.$message('请选择评分')
      } else if (!this.textarea) {
        this.$message('请输入您的评价')
      } else {
        let data = {
          commentId: this.shopData.commentId,
          name: localStorage.getItem('userName'),
          context: this.textarea,
          time: this.$moment(new Date()).format("YYYY-DD-MM"),
          rate: this.value,
          userId: Number(localStorage.getItem('userId'))
        }
        this.$axios.post('api/addCommentId', data).then(result => {
          if(result.status === 200){
            this.$message(result.data.data)
            setTimeout(() => {
              this.$emit('submit');
            }, 1000)
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.box{
  padding: 20px 50px;
}
.span{
  margin-bottom: 10px;
  display: inline-block;
}
</style>
