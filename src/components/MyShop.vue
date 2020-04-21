<template>
  <div class="div">
    <Head />
    <div class="shopCar">
      <el-table
        :data="shopList"
        @row-click="rowClick"
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
          width="420"
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
      </el-table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'shopcar',
  data(){
    return {
      shopList: []
    }
  },
  created(){
    this.getData()
  },
  methods:{
    getData(){
      Promise.all([
        this.$axios.post("api/getMyShopByUserId", { userId: localStorage.getItem('userId') }).then(result => {
          if(result.status === 200){
            this.shopList = result.data.data
          }
        })
      ]).then(res => {
        this.shopList.forEach((item, index) => {
          item.zongjia = item.shopPrice * item.number
        })
      })
    },
    rowClick(row, event, column){
      this.$router.push({ name: `MyShopDetails`, query: { shopId: row.id } });
    }
  }
}
</script>

<style scoped>

</style>
