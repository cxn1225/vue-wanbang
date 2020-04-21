<template>
  <div>
    <div label="商品评价" class="box">
      <div class="remarks-container">
        <div class="remarks-title">
          <span>商品评价</span>
        </div>
        <!-- <div class="remarks-analyse-box">
        </div> -->
        <!-- <div class="remarks-bar">
          <span>追评(121)</span>
          <span>好评(333)</span>
          <span>中评(4141)</span>
          <span>差评(141)</span>
        </div> -->
        <div class="remarks-box" v-for="(item, index) in commentList" :key="index">
          <div class="remarks-user">
            <span class="remarks-user-name">{{item.name}}</span>
          </div>
          <div class="remarks-content-box">
            <p><el-rate v-model="item.rate" disabled></el-rate></p>
            <p class="remarks-content">{{item.context}}</p>
            <p class="remarks-sub">
              <span class="remarks-item">{{item.time}}</span>
            </p>
          </div>
        </div>
        <div v-if="commentList.length === 0" class="remarks-box2">
          暂无评论
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShowGoodsDetail',
   data(){
    return {
      details: {},
      commentList: []
    }
  },
  created(){
    this.details = JSON.parse(localStorage.getItem('details'))
    this.$axios.get(`api/commentList?commentId=${this.details.commentId}`,).then(result => {
      this.commentList = result.data.data
    })
  }
};
</script>

<style scoped>
.box{
  padding: 0 150px;
}
.item-param-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
}
.item-param-box {
  padding: 5px;
  padding-left: 30px;
  width: 240px;
  height: 36px;
  font-size: 14px;
  /* text-align: center; */
  /* background-color: #ccc; */
}
.item-param-title {
  color: #232323;
}
.item-param-content {
  color: #999;
}
.remarks-title {
  padding-left: 15px;
  height: 36px;
  font-size: 16px;
  font-weight: bolder;
  line-height: 36px;
  color: #666666;
  background-color: #F7F7F7;
}
.remarks-analyse-box {
  padding: 15px;
  display: flex;
  align-items: center;
}
.remarks-analyse-goods {
  margin-left: 15px;
  margin-right: 15px;
}
.remarks-analyse-num {
  font-size: 26px;
}
.remarks-analyse-title {
  font-size: 12px;
  line-height: 20px;
}
.remarks-bar {
  padding-left: 15px;
  height: 36px;
  line-height: 36px;
  color: #666666;
  background-color: #F7F7F7;
}
.remarks-bar span {
  margin-right: 15px;
}
.remarks-box {
  padding: 15px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px #ccc dotted;
}
.remarks-box2{
  text-align: center;
  margin-bottom: 50px;
  color: #E4393C;
}
.remarks-user {
  width: 180px;
}
.remarks-user-name {
  padding-left: 15px;
}
.remarks-content-box {
  width: calc(100% - 180px);
}
.remarks-star {
  background-color: #fff;
}
.remarks-content {
  font-size: 14px;
  color: #232323;
  line-height: 28px;
}
.remarks-sub {
  margin-top: 15px;
  color: #ccc;
}
.remarks-time {
  margin-left: 15px;
}
.remarks-page {
  margin: 15px;
  display: flex;
  justify-content:flex-end;
}
/***************商品详情介绍和推荐侧边栏结束***************/
</style>

<style>
/* 改变便签页样式 */
.ivu-tabs-ink-bar {
  background-color: #E4393C !important;
}
.item-tabs > .ivu-tabs > .ivu-tabs-bar .ivu-tabs-tab{
  border-radius: 0px;
  color: #999;
  height: 38px;
  background: #F7F7F7;
}
.item-tabs > .ivu-tabs > .ivu-tabs-bar .ivu-tabs-tab-active{
  color: #fff;
  background-color: #E4393C;
}
.item-tabs > .ivu-tabs > .ivu-tabs-bar .ivu-tabs-tab-active:before{
  content: '';
  display: block;
  width: 100%;
  height: 1px;
  color: #fff;
  background: #F7F7F7;
  position: absolute;
  top: 0;
  left: 0;
}
.ivu-rate-star-full:before, .ivu-rate-star-half .ivu-rate-star-content:before {
  color: #E4393C;
}
</style>
