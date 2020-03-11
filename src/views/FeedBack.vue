<template>
  <div class="div">
    <h4>意见反馈</h4>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'feedback',
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
}
</script>

<style scoped>

</style>
