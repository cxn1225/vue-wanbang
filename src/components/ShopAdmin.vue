<template>
  <div class="box">
    <div class="input" style="margin-top: 15px;">
      <el-input placeholder="请输入关键字" v-model="input" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </div>
    <div class="context">
      <el-table
        :data="showShopList"
        style="width: 100%">
        <el-table-column
          prop="img"
          label="图片">
          <template scope="scope">
            <img :src="require(`../assets/images/${scope.row.img}`)" width="60" height="60" alt="">
    　　  </template>
        </el-table-column>
        <el-table-column
          prop="shopName"
          width="80"
          label="品牌">
        </el-table-column>
        <el-table-column
          prop="shopPrice"
          width="50"
          label="单价">
        </el-table-column>
        <el-table-column
          prop="shopDescribe"
          width="250"
          label="简述">
        </el-table-column>
        <el-table-column
          prop="isMail"
          width="70"
          label="免配送">
          <template scope="scope">
            <span v-if="scope.row.isMail === 0">否</span>
            <span v-if="scope.row.isMail === 1">是</span>
    　　  </template>
        </el-table-column>
        <el-table-column
          prop="discount"
          label="优惠">
        </el-table-column>
        <el-table-column
          prop="promotion"
          label="促销">
        </el-table-column>
        <el-table-column
          prop="position"
          label="商铺地址">
        </el-table-column>
        <el-table-column
          prop="caozuo"
          label="操作">
          <template scope="scope">
            <a href="#" @click="handleUpdate(scope.$index, scope.row)">修改</a>&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="#" @click="handleDelete(scope.$index, scope.row)">删除</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="showShopList.length !== 0" class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size=5
        :current-page='current'
        @current-change='change'
        :total="shopList.length">
      </el-pagination>
    </div>
  </div>
</template>
input
<script>
export default {
  name: '',
  data(){
    return {
      shopList: [],
      showShopList: [],
      input: '',
      current: 1
    }
  },
  created() {
    this.getData()
  },
  methods: {
    change(currentPage){
      this.current = currentPage
      this.showShopList = this.shopList.slice((currentPage - 1) * 5, currentPage * 5)
    },
    getData(){
      this.$axios.get(`api/getAllShopList`).then(result => { // 获取当前品牌所有商品
        this.shopList = result.data.data.sort(function (a, b) { return b.paymentNumber - a.paymentNumber; })
        this.showShopList = this.shopList.slice(0, 5)
        this.current = 1
      })
    },
    search(){
      if(this.input){
        this.$axios.get(`api/getAllShopListByKey?keyWord=${this.input}`).then(result => { // 通过关键字搜索商品
        if(result.status === 200){
          this.shopList = result.data.data.sort(function (a, b) { return b.paymentNumber - a.paymentNumber; })
          this.showShopList = this.shopList.slice(0, 5)
          this.current = 1
        }
        })
      } else {
        this.getData()
      }
    }
  }
}
</script>

<style scoped>
.box{

}
.input{
  width: 500px;
  margin: auto;
}
.context{
  margin-top: 20px;
}
.pagination{
  margin-top: 20px;
  float: right;
}
</style>
