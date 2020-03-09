<template>
    <div class="shopList">
      <ul>
        <li class="shopItem">
          <div class="img">
            <img src="@images/shopBrand1_1.webp" alt="">
          </div>
          <div class="context">
            <p class="p1">
              <span class="sp1">￥512.00<span>包邮</span></span>
              <span class="sp2">111+万付款</span>
            </p>
            <p class="p2">【38预售】雅诗兰黛小棕瓶熬夜眼霜15ml 淡化细纹黑眼圈</p>
            <p class="p3">
              <span class="sp1">雅诗兰黛官方旗舰店</span>
              <span class="sp2">上海</span>
            </p>
          </div>
        </li>
        <li class="shopItem">
          <div class="img">
            <img src="@images/shopBrand1_1.webp" alt="">
          </div>
          <div class="context">
            <p class="p1">
              <span class="sp1">￥512.00<span>包邮</span></span>
              <span class="sp2">111+万付款</span>
            </p>
            <p class="p2">【38预售】雅诗兰黛小棕瓶熬夜眼霜15ml 淡化细纹黑眼圈</p>
            <p class="p3">
              <span class="sp1">雅诗兰黛官方旗舰店</span>
              <span class="sp2">上海</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  name: '',
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
  width: 250px;
  border: 1px solid #ccc;
  margin: 10px;
}
.shopItem .img{
  width: 250px;
  height: 250px;
}
.shopItem .img img{
  width: 100%;
  height: 100%;
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
