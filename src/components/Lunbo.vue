<template>
  <div class="div">
    <div class="list">
      <ul>
        <router-link v-for="(item,index) in shopBrand" :key="index" :to="{name:'brand',params:{id: item.id}}" tag="li">
          {{item.brand}}
          <i class="el-icon-arrow-right icon"></i>
        </router-link>
      </ul>
    </div>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide class="swiper-slide" v-for="(item,index) in slide" :key="index">
        <img :src="require(`@images/lunbo${item}.jpg`)" alt="">
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>   <!-- 分页 -->
      <div class="swiper-button-prev" slot="button-prev"></div>  <!-- 箭头左 --> 
      <div class="swiper-button-next" slot="button-next"></div>  <!-- 箭头右 -->
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'lunbo',
  data() {
    return {
      shopBrand: [],
      slide: [1,2,3,4,5],
      img: '',
      //设置属性
      swiperOption: {
        //显示分页
        pagination: {
          el: '.swiper-pagination',
          clickable: true //允许分页点击跳转
        },
        //设置点击箭头
        navigation: {
          nextEl: '.swiper-button-next', 
          prevEl: '.swiper-button-prev'
        },
        //自动轮播
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        },
        //开启循环模式
        loop: true,
        //开启鼠标滚轮控制Swiper切换
        mousewheel: true
      }
    }
  },
  created(){
    this.$axios.get(`api/getShopBrand`).then(result => {
      this.shopBrand = result.data.data
    })
  }
}
</script>

<style scoped>
.div{
  overflow: hidden;
  margin-top: 10px;
}
.list{
  width: 20%;
  height: 500px;
  float: left;
  background-color: #fff;
}
.list ul{
  list-style: none;
  margin: 0;
  height: 100%;
  padding-left: 0;
  border: 1px solid rgb(255, 228, 220);
  box-sizing: border-box;
}
.list ul li{
  font-size: 14px;
  height: 10%;
  line-height: 50px;
  padding-left: 20px;
  cursor: pointer;
  position: relative;
}
.list ul li .icon{
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
.list ul li:hover{
  background-color: rgb(255, 228, 220);
}
.swiper{
  float: right;
  width: 80%;
}
.swiper-slide {
  height: 500px;
  line-height: 500px;
  font-size: 50px;
  text-align: center;
}
.swiper-slide img{
  width: 100%;
  height: 100%;
}
</style>
