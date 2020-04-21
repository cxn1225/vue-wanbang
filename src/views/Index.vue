<template>
  <div class="index">
    <Head />
    <div class="box">
      <div class="input" style="margin-top: 15px;">
        <el-input placeholder="请输入关键字" v-model="input" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </div>
      <Lunbo />
      <shopCard :shopList="showShopList" />
    </div>
    <div v-if="showShopList.length !== 0" class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size=15
        :current-page='current'
        @current-change='change'
        :total="shopList.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Head from '@components/Head'
import Lunbo from '@components/Lunbo'
import shopCard from '@components/shopCard'
import { mapGetters } from 'vuex';
export default {
  name: 'index',
  data(){
    return {
      data:'hello world!!!',
      shopList: [],
      showShopList: [],
      current: 1,
      input: ''
    }
  },
  computed:{
    ...mapGetters(['isLogin'])
  },
  created() {
    this.getData()
  },
  methods: {
    change(currentPage){
      this.current = currentPage
      this.showShopList = this.shopList.slice((currentPage - 1) * 15, currentPage * 15)
      console.log(this.showShopList)
    },
    getData(){
      this.$axios.get(`api/getAllShopList`).then(result => { // 获取当前品牌所有商品
        this.shopList = result.data.data.sort(function (a, b) { return b.paymentNumber - a.paymentNumber; })
        this.showShopList = this.shopList.slice(0, 15)
        this.current = 1
      })
    },
    search(){
      if(this.input){
        this.$axios.get(`api/getAllShopListByKey?keyWord=${this.input}`).then(result => { // 通过关键字搜索商品
        if(result.status === 200){
          this.shopList = result.data.data.sort(function (a, b) { return b.paymentNumber - a.paymentNumber; })
          this.showShopList = this.shopList.slice(0, 15)
          this.current = 1
        }
        })
      } else {
        this.getData()
      }
    }
  },
  components:{
    Head,
    Lunbo,
    shopCard
  }
}
</script>

<style scoped>
.index{
  background-color: #f4f4f4;
  overflow: hidden;
}
.box{
  padding: 60px 100px 0 100px;
}
.input{
  width: 500px;
  margin: auto;
}
.pagination{
  margin-top: 20px;
  float: right;
  margin-bottom: 10px;
}
</style>
