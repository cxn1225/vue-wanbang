<template>
  <div class="div">
    <h4>购物车</h4>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'shopcar',
  computed:{
    ...mapGetters(['isLogin'])
  },
  beforeRouteEnter: (to, from, next) => {
    if(localStorage.getItem('isLogin') === '2'){
      next()
    }else {
      next('/login')
    }
  },
  created(){
    console.log('进来')
  }
}
</script>

<style scoped>

</style>
