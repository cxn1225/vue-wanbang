<template>
  <div class="index">
    <Head />
    <div class="box">
      <Lunbo />
    </div>
  </div>
</template>

<script>
import Head from '@components/Head'
import Lunbo from '@components/Lunbo'
import { mapGetters } from 'vuex';
export default {
  name: 'index',
  data(){
    return {
      data:'hello world!!!'
    }
  },
  computed:{
    ...mapGetters(['isLogin'])
  },
  created() {
    
  },
  components:{
    Head,
    Lunbo
  },
  methods: {

  }
}
</script>

<style scoped>
.index{
  background-color: #f4f4f4;
}
.box{
  padding: 60px 120px 0 120px;
}
</style>
