<template>
  <div class="div">
    <p>admin</p>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name:'admin',
  computed:{
    ...mapGetters(['isLogin'])
  },
  beforeRouteEnter: (to, from, next) => {
    if(sessionStorage.getItem('isLogin') === '1'){
      next()
    }else {
      next('/login')
    }
  },
}
</script>
<style scoped>

</style>

