<template>
  <div class="box">
    <div class="input" style="margin-top: 15px;">
      <el-input placeholder="请输入关键字" v-model="input" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </div>
    <div class="context">
      <el-table
        :data="showShopList"
        @row-click='rowClick'
        style="width: 100%">
        <el-table-column
          prop="img"
          label="图片">
          <template scope="scope">
            <img :src="require(`../assets/images/${scope.row.img}`)" width="60" height="60" alt="">
    　　  </template>
        </el-table-column>
        <el-table-column
          prop="shopName"
          width="80"
          label="品牌">
        </el-table-column>
        <el-table-column
          prop="shopPrice"
          width="80"
          label="单价">
        </el-table-column>
        <el-table-column
          prop="shopDescribe"
          width="250"
          label="简述">
        </el-table-column>
        <el-table-column
          prop="isMail"
          width="70"
          label="免配送">
          <template scope="scope">
            <span v-if="scope.row.isMail === 0">否</span>
            <span v-if="scope.row.isMail === 1">是</span>
    　　  </template>
        </el-table-column>
        <el-table-column
          prop="discount"
          label="优惠">
        </el-table-column>
        <el-table-column
          prop="promotion"
          label="促销">
        </el-table-column>
        <el-table-column
          prop="position"
          label="商铺地址">
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
      <!-- 修改商品信息 -->
      <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
        <el-form>
          <el-form-item label="商品单价" :label-width="formLabelWidth">
            <el-input v-model="shop.shopPrice" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="简述" :label-width="formLabelWidth">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="shop.shopDescribe">
            </el-input>
          </el-form-item>
          <el-form-item label="是否包邮" :label-width="formLabelWidth">
            <el-radio v-model="shop.isMail" :label=1 border>是</el-radio>
            <el-radio v-model="shop.isMail" :label=0 border>否</el-radio>
          </el-form-item>
          <el-form-item label="优惠" :label-width="formLabelWidth">
            <el-input v-model="shop.discount" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="促销" :label-width="formLabelWidth">
            <el-input v-model="shop.promotion" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="商铺地址" :label-width="formLabelWidth">
            <el-input v-model="shop.position" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateShop">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 确认删除 -->
      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <span>确定要删除该项</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteShop">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 商品评论 -->
      <el-dialog
        title="商品评论"
        :visible.sync="showComment"
        :fullscreen='true'
        width="30%"
        center>
        <div class="remarks-box" v-for="(item, index) in commentList" :key="index">
          <div class="remarks-user">
            <span class="remarks-user-name">{{item.name}}</span>
          </div>
          <div class="remarks-content-box">
            <p><el-rate v-model="item.rate" disabled></el-rate></p>
            <p class="remarks-content">{{item.context}}</p>
            <p class="remarks-sub">
              <span class="remarks-item">{{item.time}}</span>
            </p>
          </div>
        </div>
        <div v-if="commentList.length === 0" class="remarks-box2">
          暂无评论
        </div>
      </el-dialog>
    </div>
    <div v-if="showShopList.length !== 0" class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size=5
        :current-page='current'
        @current-change='change'
        :total="shopList.length">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data(){
    return {
      shopList: [],
      showShopList: [],
      input: '',
      current: 1,
      dialogFormVisible: false,
      centerDialogVisible: false,
      showComment: false,
      formLabelWidth: '120px',
      commentList: [],
      shop: {
        id: 0,
        shopPrice: '',
        shopDescribe: '',
        position: '',
        isMail: 0,
        discount: '',
        promotion: '',
        shopName: ''
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    change(currentPage){ // 下拉框选择
      this.current = currentPage
      this.showShopList = this.shopList.slice((currentPage - 1) * 5, currentPage * 5)
    },
    getData(){
      this.$axios.get(`api/getAllShopList`).then(result => { // 获取当前品牌所有商品
        this.shopList = result.data.data.sort(function (a, b) { return b.paymentNumber - a.paymentNumber; })
        this.showShopList = this.shopList.slice(0, 5)
        this.current = 1
      })
    },
    search(){
      if(this.input){
        this.$axios.get(`api/getAllShopListByKey?keyWord=${this.input}`).then(result => { // 通过关键字搜索商品
        if(result.status === 200){
          this.shopList = result.data.data.sort(function (a, b) { return b.paymentNumber - a.paymentNumber; })
          this.showShopList = this.shopList.slice(0, 5)
          this.current = 1
        }
        })
      } else {
        this.getData()
      }
    },
    handleDelete(index, row){ // 删除弹框
      this.row = row
      this.centerDialogVisible = true
    },
    deleteShop(){ // 删除商品
      this.centerDialogVisible = false
      this.$axios.post('api/deleteShop', { id: this.row.id, commentId: this.row.commentId, shopName: this.row.shopName }).then(result => {
        if(result.status === 200){
          this.$message('删除成功')
          this.getData()
        }
      })
    },
    handleUpdate(index, row){ // 修改弹框
      window.event.stopPropagation()
      this.dialogFormVisible = true
      for(let item in this.shop){
        this.shop[item] = row[item]
      }
    },
    updateShop(){ // 修改商品
      this.dialogFormVisible = false
      this.$axios.post('api/updateShop', this.shop).then(result => {
        if(result.status === 200){
          this.$message('修改成功')
          this.getData()
        }
      })
    },
    rowClick(row, event, column){
      this.showComment = true
      this.$axios.get(`api/commentList?commentId=${row.commentId}`,).then(result => {
        this.commentList = result.data.data
        console.log(this.commentList)
      })
    }
  }
}
</script>

<style scoped>
.box{

}
.input{
  width: 500px;
  margin: auto;
}
.context{
  margin-top: 20px;
}
.pagination{
  margin-top: 20px;
  float: right;
}
.remarks-box {
  padding: 15px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px #ccc dotted;
}
.remarks-box2{
  text-align: center;
  margin-bottom: 50px;
  color: #E4393C;
}
.remarks-user {
  width: 180px;
}
.remarks-user-name {
  padding-left: 15px;
}
.remarks-content-box {
  width: calc(100% - 180px);
}
.remarks-star {
  background-color: #fff;
}
.remarks-content {
  font-size: 14px;
  color: #232323;
  line-height: 28px;
}
.remarks-sub {
  margin-top: 15px;
  color: #ccc;
}
.remarks-time {
  margin-left: 15px;
}
.remarks-page {
  margin: 15px;
  display: flex;
  justify-content:flex-end;
}
</style>
