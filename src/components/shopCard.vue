<template>
    <div class="shopList">
      <ul>
        <li v-for="(item, index) in shopList" :key="index" class="shopItem">
          <div class="img">
            <img v-if="item.img != null" :src="require(`../assets/images/${item.img}`)" alt="">
          </div>
          <div class="context">
            <p class="p1">
              <span class="sp1">￥{{item.shopPrice}}<span v-if="item.isMail == 1">包邮</span></span>
              <span class="sp2">{{item.paymentNumber}}付款</span>
            </p>
            <p class="p2">{{item.shopDescribe}}</p>
            <p class="p3">
              <span class="sp1">{{item.storeFront}}</span>
              <span class="sp2">{{item.position}}</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  name: '',
  props:["shopList"],
  data(){
    return {
    }
  }
}
</script>

<style scoped>
.shopList ul{
  
  list-style: none;
  padding: 0;
  margin: 0;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap ;
  margin-top: 10px;
}
.shopList ul li{
  width: 241px;
  border: 1px solid #ccc;
  margin: 10px;
  cursor: pointer;
}
.shopItem .img{
  width: 240px;
  height: 240px;
}
.shopItem .img img{
  width: 100%;
  height: 100%;
}
.context {
  padding-bottom: 10px;
}
.context p{
  padding: 0 10px;
  margin: 0;
}
.context .p1{
  margin: 10px 0 0 0;
  overflow: hidden;
}
.context .p2{
  margin: 10px 0 0 0;
}
.context .p1 .sp1{
  float: left;
  font-weight: 800;
  color: #ff5000;
}
.context .p1 .sp1 span{
  color: #fff;
  font-size: 12px;
  background-color: #ff5000;
  margin-left: 5px;
  padding: 0 2px;
}
.context .p1 .sp2{
  float: right;
  font-size: 14px;
  color: #888;
  font-weight: 100;
}
.context .p2{
  color: #3d3d3d;
  font-size: 12px;
  font-weight: 500;
}
.context .p3{
  margin: 10px 0 0 0;
  overflow: hidden;
}
.context .p3 .sp1{
  color: #888;
  font-size: 12px;
  float: left;
}
.context .p3 .sp2{
  color: #888;
  font-size: 12px;
  float: right;
}
</style>
