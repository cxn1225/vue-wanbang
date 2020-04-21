<template>
  <div>
    <div class="pay-container">
      <el-alert
        title=" 扫码支付"
        type="success"
        description="请扫描右边二维码进行支付"
        :closable='false'
        show-icon>
      </el-alert>
      <div class="pay-box">
        <div class="pay-demo">
          <img src="../assets/images/pay/pay-demo.png" alt="">
        </div>
        <div class="pay-qr-scan">
          <img src="../assets/images/pay/pay-qrscan.png" alt="">
          <div class="pay-tips">
            <router-link to="/payDone"><p @click="submit">点击我, 完成支付</p></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pay',
  data(){
    return {
      shopList: [],
      address: [],
      remarks: '',
    }
  },
  created(){
    this.shopList = this.$route.params.shopList
    this.address = this.$route.params.address
    this.remarks = this.$route.params.remarks
  },
  methods:{
    submit(){
      Promise.all(this.shopList.map((item, index) => {
        item.addressId = this.address.id
        item.remarks = this.remarks
        this.$axios.post("api/addMyShop", item).then(result => {
          if(result.status === 200){
            this.$message(`${result.data.msg}, 即将跳转到我的购买页面`)
          }
        })
      })).then(res => {
      }).catch(err => {
        console.error(err)
      })
    }
  }
};
</script>

<style scoped>
.pay-container {
  margin: 15px auto;
  width: 80%;
  min-width: 1000px;
}
.pay-box {
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.pay-demo {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pay-demo img{
  height: 80%;
}
.pay-qr-scan {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.pay-tips {
  width: 50%;
  text-align: center;
  font-size: 14px;
  line-height: 30px;
}
.pay-tips a {
  color: #999999;
}
</style>
