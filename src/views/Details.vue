<template>
  <div class="box">
    <ShowGoods/>
    <ShowGoodsDetail />
  </div>
</template>

<script>
import ShowGoods from "@components/ShowGoods"
import ShowGoodsDetail from "@components/ShowGoodsDetail"
export default {
  name: 'box-details',
  data(){
    return {
      data: JSON.parse(localStorage.getItem('details'))
    }
  },
  components:{
    ShowGoods,
    ShowGoodsDetail
  },
  created(){
    this.$store.dispatch("setDetailsAsync", this.$route.params.shop)
    if(this.$route.params.shop != undefined){
      localStorage.setItem('details',JSON.stringify(this.$route.params.shop))
    }
  }
}
</script>

<style scoped>

</style>
