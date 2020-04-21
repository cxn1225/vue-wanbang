<template>
  <div>
    <div class="pay-done-box">
      <img src="../assets/images/pay/pay-success.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'PayDone',
  created(){
    setTimeout(() => {
      this.$router.push('/myself')
    }, 2000)
  }
};
</script>

<style scoped>
.pay-done-box {
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
