<template>
  <div class="div">
    <Head />
    <div class="shopCar">
      <el-alert
        title="小提示"
        type="success"
        description="请点击商品前的选择框，选择购物车中的商品，点击付款即可。"
        :closable='false'
        show-icon>
      </el-alert>
      <el-table
        :data="tableData"
        @select='check'
        @select-all='check'
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="shopName"
          label="品名">
        </el-table-column>
        <el-table-column
          prop="imgUrl"
          label="图片">
          <template scope="scope">
            <img :src="require(`../assets/images/${scope.row.imgUrl}`)" width="60" height="60" alt="">
    　　  </template>
        </el-table-column>
        <el-table-column
          prop="shopDescribe"
          label="简述">
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
          prop="color"
          label="样式">
        </el-table-column>
        <el-table-column
          prop="caozuo"
          label="操作">
          <template scope="scope">
            <a href="#" @click="handleDelete(scope.$index, scope.row)">删除</a>
    　　  </template>
        </el-table-column>
      </el-table>
      <!-- 确认删除 -->
      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <span>确定要删除该项</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteShop">确 定</el-button>
        </span>
      </el-dialog>
      <div class="address-container">
        <h3>收件人地址</h3>
        <div class="address-box">
          <el-select v-model="addressValue" @change='change' placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in address"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="remarks-container">
        <h3>备注</h3>
        <el-input v-model="remarks" class="remarks-input"></el-input>
      </div>
      <div class="invoices-container">
        <h3>发票信息</h3>
        <p>该商品不支持开发票</p>
      </div>
      <div class="pay-container">
        <div class="pay-box">
          <p><span>提交订单应付总额：</span> <span class="money">￥{{totalPrice}}</span></p>
          <div class="pay-btn">
            <el-button @click='submit' type="danger">支付订单</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Head from '@components/Head'
export default {
  name: 'shopcar',
  data(){
    return {
      tableData: [],
      address: [],
      addCheck: {},
      addressValue: '',
      remarks:'',
      totalPrice: 0,
      shopList: [],
      centerDialogVisible: false,
      row: {}
    }
  },
  created(){
    if(!localStorage.getItem('userId')){
      this.$router.push('/login')
    } else {
      this.getData()
    }
  },
  components:{
    Head
  },
  methods:{
    change(value){
      this.address.forEach((item, index) => {
        if(item.value === value){
          this.addCheck = item
        }
      })
    },
    getData(){
      this.$axios.get(`api/getShopCar?id=${Number(localStorage.getItem('userId'))}`,).then(result => {
        this.tableData = result.data.data
      })

      this.$axios.get(`api/getAddressList?id=${localStorage.getItem('userId')}`,).then(result => {
        let address = []
        result.data.data.forEach((item, index) => {
          address.push({value: item.address, lable: index, id: item.id})
        })
        this.address = address
      })
    },
    check(selection, row){
      this.shopList = selection
      let totalPrice = 0
      selection.forEach((item, index) => {
        totalPrice += item.number * item.shopPrice
      })
      this.totalPrice = totalPrice
    },
    handleDelete(index, row){
      this.centerDialogVisible = true
      this.row = row
    },
    deleteShop(){
      this.centerDialogVisible = false
      this.$axios.get(`api/deleteShopOfCar?id=${this.row.id}`,).then(result => {
        if(result.status === 200){
          this.$message('删除成功')
          this.getData()
        }
      })
    },
    submit(){
      this.$router.push({ name: 'pay', params: { shopList: this.shopList, address: this.addCheck, remarks: this.remarks } })
    }
  }
}
</script>

<style scoped>
.shopCar{
  padding: 0 100px;
  padding-top: 70px;
}
.invoices-container p{
  font-size: 12px;
  line-height: 30px;
  color: #999;
}
.pay-container {
  margin: 15px;
  display: flex;
  justify-content: flex-end;
}
.pay-box {
  font-size: 18px;
  font-weight: bolder;
  color: #495060;
}
.money {
  font-size: 26px;
  color: #f90013;
}
.pay-btn {
  margin: 15px 0px;
  display: flex;
  justify-content: flex-end;
}
</style>
