<template>
  <div class="box">
    <Head />
    <el-tabs class="tabs" value='first'>
      <el-tab-pane label="商品管理" name="first">
        <ShopAdmin />
      </el-tab-pane>
      <el-tab-pane label="添加货物" name="second">
        <AddShop />
      </el-tab-pane>
      <el-tab-pane label="用户反馈" name="third">
        <el-card class="box-card" v-for="(item, index) in data" :key="index">
          <div slot="header" class="clearfix">
            <h3 style="text-align: center">{{item.title}}</h3>
          </div>
          <div class="text item">
            {{item.textarea}}
          </div>
          <div class="bottom clearfix">
            <time class="time">{{item.userName}}</time>
            <time class="button">{{item.date}}</time>
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="购买管理" name="fourth">
        <el-table
          :data="shopList"
          style="width: 100%">
          <el-table-column
            prop="shopName"
            width="150"
            label="品名">
          </el-table-column>
          <el-table-column
            prop="imgUrl"
            width="150"
            label="图片">
            <template scope="scope">
              <img :src="require(`../assets/images/${scope.row.imgUrl}`)" width="60" height="60" alt="">
      　　  </template>
          </el-table-column>
          <el-table-column
            prop="shopDescribe"
            width="320"
            label="简述">
          </el-table-column>
          <el-table-column
            prop="color"
            label="样式">
          </el-table-column>
          <el-table-column
            prop="number"
            label="数量">
          </el-table-column>
          <el-table-column
            prop="shopPrice"
            label="单价">
          </el-table-column>
          <el-table-column
            prop="zongjia"
            label="总价">
          </el-table-column>
          <el-table-column
            prop="state"
            label="修改状态">
            <template scope="scope">
              <span class='sp' v-if="scope.row.state === 0" @click="deliver(scope)">发 货</span>
              <span v-if="scope.row.state === 1">已取件</span>
      　　  </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Head from '@components/Head'
import ShopAdmin from '@components/ShopAdmin'
import AddShop from '@components/AddShop'
export default {
  name:'admin',
  data(){
    return {
      data: [],
      shopList: []
    }
  },
  beforeRouteEnter: (to, from, next) => {
    if(localStorage.getItem('isLogin') === '1'){
      next()
    }else {
      next('/login')
    }
  },
  created(){
    this.$axios.get('api/getFeedBack').then(result => {
      if(result.status === 200){
        this.data = result.data.data
      }
    })
    this.getData()
  },
  methods: {
    getData(){
      this.$axios.post('api/getMyShop').then(result => {
        if(result.status === 200){ 
          result.data.data.forEach((item, index) => {
            item.zongjia = item.shopPrice * item.number
          })
          this.shopList = result.data.data
        }
      })
    },
    deliver(shop){
      console.log(shop.row.id)
      this.$axios.get(`api/deliver?id=${shop.row.id}`).then(result => {
        if(result.status === 200){
          this.$message('发货成功')
          this.getData()
        }
      })
    }
  },
  components: {
    Head,
    ShopAdmin,
    AddShop
  }
}
</script>
<style scoped>

.tabs{
  padding: 20px 50px; 
  padding-top: 80px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.bottom{
  border-top: 1px solid #EBEEF5;
  padding-top: 10px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.box-card {
  width: 450px;
  float: left;
  margin: 10px;
}
.button {
  padding: 0;
  float: right;
}
h3{
  margin: 0;
}
.sp{
  cursor: pointer;
  color: blue;
}
</style>

