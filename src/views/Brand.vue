<template>
  <div class="div">
    <Head />
    <div class="box">
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        background-color="#ccc"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item v-for="(item,index) in brandList" :key="index" :index="index.toString()" @click="checkBrand(item.id)">
          <span >{{item.brand}}</span>
        </el-menu-item>
      </el-menu>
      <shopCard :shopList="shopList" />
    </div>
  </div>
</template>

<script>
import Head from '@components/Head'
import shopCard from '@components/shopCard'
export default {
  name: 'brand1',
  data(){
    return {
      shopBrand:'',
      brandList:[],
      shopList: []
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if(to.params.id !== undefined){
        localStorage.setItem("brandId", to.params.id)
      }
      vm.getShopById(localStorage.getItem("brandId"))
    })
  },
  components:{
    Head,
    shopCard
  },
  methods:{
    getShopById(id){
      this.$axios.get(`api/getShopBrand?id=${id}`).then(result => { // 获取当前商品品牌
        this.shopBrand = `brand${result.data.data[0].id}`
        this.$axios.get(`api/getShopList?id=${this.shopBrand}`).then(result => { // 获取当前品牌所有商品
          this.shopList = result.data.data
        })
      })
      this.$axios.get(`api/getShopBrand`).then(result => { // 获取所有商品品牌
        this.brandList = result.data.data
      })
    },
    checkBrand(id){
      this.$axios.get(`api/getShopBrand?id=${id}`).then(result => { // 获取当前商品品牌
        this.shopBrand = `brand${result.data.data[0].id}`
        this.$axios.get(`api/getShopList?id=${this.shopBrand}`).then(result => { // 获取当前品牌所有商品
          this.shopList = result.data.data
        })
      })
    }
  }
}
</script>

<style scoped>
.box{
  padding: 60px 100px 0 100px;
}

</style>
