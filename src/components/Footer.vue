<template>
  <div class="footer">
    <ul class="footer-ul">
      <li>关于我们</li>
      <li>加入我们</li>
      <li>营销中心</li>
      <li>廉正举报</li>
      <li>联系客服</li>
      <li>法律申明</li>
      <li>知识产权</li>
      <li>合作商</li>
    </ul>
    <ul class="footer-ul">
      <li>版权所有：1614010219池晓宁</li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'app-footer'
}
</script>
<style scoped>
.footer-ul{
  list-style: none;
  text-align: center;
}
.footer-ul li{
  display: inline-block;
  margin: 0 5px 0 5px;
  font-size: 14px
}
.footer-ul li:hover{
  color: #f40;
  cursor: pointer;
}
</style>
