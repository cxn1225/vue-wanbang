<template>
  <div class="">
    <div>
      <h3>收货人信息</h3>
      <p>姓名：{{address.name}}</p>
      <p>电话：{{address.phone}}</p>
      <p>收货地址：{{address.address}}-{{address.details}}</p>
      <p>邮政编码地址：{{address.postalCode}}</p>
    </div>
    <div>
      <h3>商品信息</h3>
      <p>品牌：{{shopData.shopName}}</p>
      <p>单价：{{shopData.shopPrice}}元</p>
      <p>商品类别：{{shopData.color}}</p>
      <p>商品详情：{{shopData.shopDescribe}}</p>
      <p>购买数量：{{shopData.number}}套</p>
      <p>用户备注：{{shopData.remarks}}</p>
      <p>总价：{{shopData.shopPrice * shopData.number}}元</p>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data(){
    return {
      address: {}
    }
  },
  props: {
    shopData: {
      type: Object,
      require: true
    },
  },
  watch: {
    shopData(oldData, newData){
      this.$axios.get(`api/getAddressById?id=${oldData.addressId}`).then(result => {
        if(result.status === 200){
          this.address = result.data.data
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
