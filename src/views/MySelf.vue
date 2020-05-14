<template>
  <div class="box">
    <el-tabs value='first'>
      <el-tab-pane label="修改登录密码" name="first" class="form">
        <el-form ref="form" label-width="100px">
          <el-form-item label="用户名：">
            <el-input disabled v-model="userName"></el-input>
          </el-form-item>
          <el-form-item label="昵称：">
            <el-input v-model="name"></el-input>
          </el-form-item>
          <el-form-item label="旧密码：">
            <el-input v-model="oldPass"></el-input>
          </el-form-item>
          <el-form-item label="新密码：">
            <el-input v-model="newPass"></el-input>
          </el-form-item>
          <el-form-item label="确认密码：">
            <el-input v-model="qrPass"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="submit" type="primary">确认修改</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="收货地址" name="second">
        我的地址：
        <br>
        <br>
        <div>
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="name"
              label="收货人">
            </el-table-column>
            <el-table-column
              prop="address"
              label="所在地址">
            </el-table-column>
            <el-table-column
              prop="details"
              label="详细地址">
            </el-table-column>
            <el-table-column
              prop="postalCode"
              label="邮编">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="电话号码">
            </el-table-column>
            <el-table-column
              prop="caozuo"
              label="操作">
              <template scope="scope">
                <a href="#" @click="handleUpdate(scope.$index, scope.row)">修改</a>&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="#" @click="handleDelete(scope.$index, scope.row)">删除</a>
        　　  </template>
            </el-table-column>
          </el-table>
          <br>
          <el-button type="primary" @click="handleAdd">新增地址</el-button>
        </div>
        <!-- 修改地址 -->
        <el-dialog title="修改地址" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="收货人" :label-width="formLabelWidth">
              <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
            <li class="li">
              <div class="right">
                <div class="city" @click="toAddress">{{city}}</div>
                <i class="arrow-r"> </i>
              </div>
            </li>
            <v-distpicker type="mobile" @selected='selected' v-show="addInp">
            </v-distpicker>
            <div class="mask" v-show="mask"></div>
            <el-form-item label="详细地址" :label-width="formLabelWidth">
              <el-input v-model="form.details" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮编" :label-width="formLabelWidth">
              <el-input v-model="form.postalCode" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话号码" :label-width="formLabelWidth">
              <el-input v-model="form.phone" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateAddress">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 添加地址 -->
        <el-dialog title="添加地址" :visible.sync="dialogFormVisible2">
          <el-form :model="form">
            <el-form-item label="收货人" :label-width="formLabelWidth">
              <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
            <li class="li">
              <div class="right">
                <div class="city" @click="toAddress">{{city}}</div>
                <i class="arrow-r"> </i>
              </div>
            </li>
            <v-distpicker type="mobile" @selected='selected' v-show="addInp">
            </v-distpicker>
            <div class="mask" v-show="mask"></div>
            <el-form-item label="详细地址" :label-width="formLabelWidth">
              <el-input v-model="form.details" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮编" :label-width="formLabelWidth">
              <el-input v-model="form.postalCode" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话号码" :label-width="formLabelWidth">
              <el-input v-model="form.phone" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="addAddress">确 定</el-button>
          </div>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane label="我的商品" name="third">
        <MyShop />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import MyShop from '@components/MyShop'
import VDistpicker from 'v-distpicker' // 省市县联动
export default {
  name: '',
  data(){
    return {
      userName: '',
      name: '',
      password: '',
      oldPass: '',
      newPass: '',
      qrPass: '',
      address: [],
      tableData: [],
      dialogFormVisible: false,
      dialogFormVisible2: false,
      form: {
        id: '',
        name: '',
        address: '',
        details: '',
        postalCode: '',
        phone: ''
      },
      formLabelWidth: '120px',
      city:'收货地址',
      addInp :false,
      mask:false
    }
  },
  created(){
    this.$axios.get(`api/selectUserName?id=${localStorage.getItem('userId')}`,).then(result => {
      this.userName = result.data.data.username
      this.password = result.data.data.password 
    })

    this.$axios.get(`api/getAddressList?id=${localStorage.getItem('userId')}`,).then(result => {
      this.tableData = result.data.data
    })
  },
  methods: {
    submit(){
      if(this.oldPass === ''){
        this.$message('请输入旧密码');
      } else 
      if(this.newPass === ''){
        this.$message('请输入新密码');
      } else 
      if(this.newPass !== this.qrPass ){
        this.$message('两次输入不同');
      } else
      if(this.oldPass !== this.password){
        this.$message('旧密码不正确');
      } else
      if(this.oldPass == this.newPass){
        this.$message('新旧密码不能相同');
      } else{
        this.$axios.get(`api/modifyPass?username=${this.userName}&password=${this.newPass}&name=${this.name}`,).then(result => {
        console.log(result.data)
        if(result.data.msg === 'success'){
          this.$message('修改成功，请重新登录')
          localStorage.setItem('isLogin', false)
          localStorage.setItem('userId', '')
          setTimeout(() => {
            this.$router.push('/login')
          }, 1000)
        } else {
          this.$message('修改失败');
        }
      })
      }
    },
    handleDelete(index, row){
      this.$axios.post('api/deleteAddressById', { id: row.id }).then(result => {
        if(result.status === 200){
          this.$message('删除成功')
          this.$axios.get(`api/getAddressList?id=${localStorage.getItem('userId')}`,).then(result => {
            this.tableData = result.data.data
          })
        }
      })
    },
    handleUpdate(index, row){
      this.dialogFormVisible = true
      for(let item in this.form){
        this.form[item] = row[item]
      }
      this.city = this.form.address
    },
    updateAddress(){
      this.dialogFormVisible = false
      this.$axios.post('api/updateAddress', this.form).then(result => {
        if(result.status === 200){
          this.$message('修改成功')
          this.$axios.get(`api/getAddressList?id=${localStorage.getItem('userId')}`,).then(result => {
            this.tableData = result.data.data
          })
        }
      })
    },
    toAddress(){
      this.mask = true;
      this.addInp = true;
    },
    selected(data){
      this.mask =false;
      this.addInp = false;
      this.form.address = data.province.value + '-' + data.city.value + '-' + data.area.value
      this.city = data.province.value + '-' + data.city.value + '-' + data.area.value
    },
    handleAdd(){
      this.dialogFormVisible2 = true
      this.city = '收货地址'
      for(let item in this.form){
        this.form[item] = ''
      }
    },
    addAddress(){
      this.dialogFormVisible2 = false
      this.form.userId = Number(localStorage.getItem('userId'))
      this.$axios.post('api/updateAddress', this.form).then(result => {
        if(result.status === 200){
          this.$message('添加成功')
          this.$axios.get(`api/getAddressList?id=${localStorage.getItem('userId')}`,).then(result => {
            this.tableData = result.data.data
          })
        }
      })
    }
  },
  components:{
    MyShop,
    VDistpicker
  }
}
</script>

<style scoped>
.box{
  padding: 0 120px;
  padding-top: 20px;
}
.box .form{
  width: 500px;
}
.li{
  list-style: none;
  height: 40px;
  padding-left: 55px;
  cursor: pointer;
}
li{
  cursor: pointer;
}
</style>
