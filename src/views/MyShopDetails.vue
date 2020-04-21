<template>
  <div class="box">
    <el-tabs value='first'>
      <el-tab-pane label="订单信息" name="first">
        <Order :shopData='shopData' />
      </el-tab-pane>
      <el-tab-pane v-if="!isComment" label="追加评论" name="second">
        <Comment @submit='getData' :shopData='shopData' />
      </el-tab-pane>
      <el-tab-pane v-if="isComment" label="追加评论" name="second">
        您已经评论过了哦！！！
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Order from '@components/Order'
import Comment from '@components/Comment'
export default {
  name: '',
  data(){
    return {
      shopId: '',
      shopData: {},
      isComment: false
    }
  },
  created(){
    this.getData()
  },
  methods: {
    getData(){
      this.shopId = this.$route.query.shopId
      Promise.all([
        this.$axios.post("api/getMyShopById", { id: Number(this.shopId) }).then(result => {
          if(result.status === 200){
            this.shopData = result.data.data
          }
        })
      ]).then(res => {
        this.$axios.get(`api/commentListByuserId?commentId=${this.shopData.commentId}&userId=${this.shopData.userId}`).then(result => {
          if(result.status === 200){
            if(result.data.data.length === 0){
              this.isComment = false
            } else {
              this.isComment = true
            }
          }
        })
      })
    },
  },
  components: {
    Order,
    Comment
  }
}
</script>

<style scoped>
.box{
  padding: 20px 0 0 50px ;
}
</style>
