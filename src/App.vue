<template>
  <div id="app">
     <router-view id="view"></router-view>
    <Footer />
  </div>
</template>
<script>
import Footer from './components/Footer'
export default {
  name: 'home',
  components:{
    Footer
  }
}
</script>

<style>
  html,
  body{
    padding: 0;
    margin: 0;
  }
  #view{
    min-height: 100vh;
  }
</style>
