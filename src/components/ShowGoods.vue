<template>
  <div>
    <div class="item-detail-show">
      <div class="item-detail-left">
        <div class="item-detail-big-img">
          <img :src="require(`../assets/images/${details.img}`)" alt="">
        </div>
        <div class="item-detail-img-row">
          <div class="item-detail-img-small">
            <img :src="require(`../assets/images/${details.img}`)" alt="">
          </div>
          <div class="item-detail-img-small">
            <img :src="require(`../assets/images/${details.img}`)" alt="">
          </div>
          <div class="item-detail-img-small">
            <img :src="require(`../assets/images/${details.img}`)" alt="">
          </div>
          <div class="item-detail-img-small">
            <img :src="require(`../assets/images/${details.img}`)" alt="">
          </div>
        </div>
      </div>
      <div class="item-detail-right">
        <div class="item-detail-title">
          <p>
            <span class="item-detail-express">校园配送</span>{{details.shopDescribe}}</p>
        </div>
        <div class="item-detail-tag">
          <p>
            <span v-for="(item, index) in details.notes.split('-')" :key='index'>【{{item}}】</span>
          </p>
        </div>
        <div class="address">
          收货地址：
          <el-select v-model="addressValue" @change='change' placeholder="请选择">
            <el-option
              v-for="item in address"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="item-detail-price-row">
          <div class="item-price-left">
            <div class="item-price-row">
              <p>
                <span class="item-price-title">B I T 价</span>
                <span class="item-price">￥{{num1 * details.shopPrice}}</span>
              </p>
            </div>
            <div class="item-price-row">
              <p>
                <span class="item-price-title">优 惠 价</span>
                <span v-for="(item, index) in details.discount.split('-')" :key='index' class="item-price-full-cut">{{item}}</span>
              </p>
            </div>
            <div class="item-price-row">
              <p>
                <span class="item-price-title">促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</span>
                <span v-for="(item, index) in details.promotion.split('-')" :key="index" class="item-price-full-cut" >{{item}}</span>
              </p>
              <p>
                <span class="item-price-title">选择数量</span>
                <el-input-number v-model="num1" :min="1" :max="10" label="描述文字"></el-input-number>
              </p>
            </div>
          </div>
        </div>
        <!-- 选择颜色 -->
        <div class="item-select">
          <div class="item-select-title">
            <p>选择颜色</p>
          </div>
          <div class="item-select-column">
            <div class="item-select-row">
              <div v-for="(item, index) in details.color.split('-')" @click="checkColor(item, index)" :key="index" :class="checkIndex === index ? 'item-select-box isCheck' : 'item-select-box'">
                <div class="item-select-img">
                  <img :src="require(`../assets/images/${details.img}`)" alt="">
                </div>
                <div class="item-select-intro">
                  <p>{{item}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br>
        <div class="add-buy-car-box">
          <div class="add-buy-car">
            <!-- <InputNumber :min="1" v-model="count" size="large"></InputNumber> -->
            <el-button type="primary" @click="addShopCar">加入购物车</el-button>
            <el-button type="danger" @click="purchase">立即购买</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShowGoods',
  data(){
    return {
      details: {},
      num1: 1,
      address: [],
      addressValue: '',
      addCheck: {},
      checkIndex: 0,
      color: ''
    }
  },
  created(){
    this.details = JSON.parse(localStorage.getItem('details'))
    this.color = JSON.parse(localStorage.getItem('details')).color.split('-')[0]
    this.$axios.get(`api/getAddressList?id=${localStorage.getItem('userId')}`,).then(result => {
      let address = []
      result.data.data.forEach((item, index) => {
        address.push({value: item.address, lable: index, id: item.id})
      })
      this.address = address
    })
  },
  methods:{
    change(value){
      this.address.forEach((item, index) => {
        if(item.value === value){
          this.addCheck = item
        }
      })
    },
    checkColor(color, index){
      this.checkIndex = index
      this.color = color
    },
    addShopCar(){
      let data = {
        imgUrl: this.details.img,
        userId: Number(localStorage.getItem('userId')),
        shopName: this.details.shopName,
        shopDescribe: this.details.shopDescribe,
        shopPrice: this.details.shopPrice,
        number: this.num1,
        shopId: this.details.id,
        commentId: this.details.commentId,
        color: this.color
      }
      this.$axios.post(`api/addShopCar`, data).then(result => {
        this.$message(`${result.data.data}, 即将跳转到购物车`);
        setTimeout(() => {
          this.$router.push('/ShopCar')
        }, 1000)
      })
    },
    purchase(){
      if(!this.addCheck.id){
        this.$message('请选择收货地址')
      } else {
        let data = {
          id: '',
          imgUrl: this.details.img,
          userId: Number(localStorage.getItem('userId')),
          shopName: this.details.shopName,
          shopDescribe: this.details.shopDescribe,
          shopPrice: this.details.shopPrice,
          number: this.num1,
          shopId: `${this.details.shopName}_${this.details.id}`,
          commentId: this.details.commentId,
          color: this.color
        }
        this.$router.push({ name: 'pay', params: { shopList: [data], address: this.addCheck, remarks: '' } })
      }
    }
  }
};
</script>

<style scoped>
/******************商品图片及购买详情开始******************/
.item-detail-show {
  width: 80%;
  margin: 15px auto;
  display: flex;
  flex-direction: row;
  background-color: #fff;
}
.item-detail-left {
  width: 350px;
  margin-right: 30px;
}
.item-detail-big-img {
  width: 350px;
  height: 350px;
  box-shadow: 0px 0px 8px #ccc;
  cursor: pointer;
}
.item-detail-big-img img {
  width: 100%;
}
.item-detail-img-row {
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.item-detail-img-small {
  width: 68px;
  height: 68px;
  box-shadow: 0px 0px 8px #ccc;
  cursor: pointer;
}
.item-detail-img-small img {
  width: 100%;
}
/*商品选购详情*/
.item-detail-right {
  display: flex;
  flex-direction: column;
}
.item-detail-title p {
  color: #666;
  font-size: 20px;
}
.item-detail-express {
  font-size: 14px;
  padding: 2px 3px;
  border-radius: 3px;
  background-color: #e4393c;
  color: #fff;
}
/*商品标签*/
.item-detail-tag {
  font-size: 12px;
  color: #e4393c;
}
.address{
  margin: 15px 0;
}
/*价格详情等*/
.item-detail-price-row {
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #f3f3f3;
}
.item-price-left {
  display: flex;
  flex-direction: column;
}
.item-price-title {
  color: #999999;
  font-size: 14px;
  margin-right: 15px;
}
.item-price {
  color: #e4393c;
  font-size: 23px;
  cursor: pointer;
}
.item-price-full-cut {
  margin-right: 5px;
  padding: 3px;
  color: #e4393c;
  font-size: 12px;
  background-color: #ffdedf;
  border: 1px dotted #e4393c;
  cursor: pointer;
}
.item-remarks-sum {
  padding-left: 8px;
  border-left: 1px solid #ccc;
}
.item-remarks-sum p {
  color: #999999;
  font-size: 12px;
  line-height: 10px;
  text-align: center;
}
.item-remarks-num {
  line-height: 18px;
  color: #005eb7;
}
.item-select {
  display: flex;
  flex-direction: row;
  margin-top: 15px;
}
.item-select-title {
  color: #999999;
  font-size: 14px;
  margin-right: 15px;
}
.item-select-column {
  display: flex;
  flex-direction: column;
}
.item-select-row {
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;
}
.item-select-box {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.item-select-img {
  width: 36px;
}
.item-select-box {
  padding: 5px;
  margin-right: 8px;
  background-color: #f7f7f7;
  border: 0.5px solid #ccc;
  cursor: pointer;
}
.isCheck{
  background-color: #d8d0d0;
}
.item-select-box:hover {
  border: 0.5px solid #e3393c;
}
.item-select-box-active {
  border: 0.5px solid #e3393c;
}
.item-select-img img {
  width: 100%;
}
.item-select-intro p {
  margin: 0px;
  padding: 5px;
}
.item-select-class {
  padding: 5px;
  margin-right: 8px;
  background-color: #f7f7f7;
  border: 0.5px solid #ccc;
  cursor: pointer;
}
.item-select-class:hover {
  border: 0.5px solid #e3393c;
}
.add-buy-car-box {
  width: 100%;
  margin-top: 15px;
  border-top: 1px dotted #ccc;
}
.add-buy-car {
  margin-top: 15px;
}
/******************商品图片及购买详情结束******************/
</style>
