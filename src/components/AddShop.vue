<template>
  <div class="">
    <div class="from">
      <el-form class="demo-form-inline" label-width="80px">
        <el-form-item label="品牌">
          <el-select v-model="shop.shopName" @change='change' placeholder="请选择品牌">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="定价">
          <el-input v-model="shop.shopPrice" :placeholder=0></el-input>
        </el-form-item>
        <el-form-item label="简述">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="shop.shopDescribe">
          </el-input>
        </el-form-item>
        <el-form-item label="商家名称">
          <el-input v-model="shop.storeFront" :disabled='true'></el-input>
        </el-form-item>
        <el-form-item label="商家地址">
          <el-input v-model="shop.position" placeholder='请输入商家地址'></el-input>
        </el-form-item>
        <el-form-item label="是否包邮">
          <el-radio v-model="shop.isMail" :label=1 border>是</el-radio>
          <el-radio v-model="shop.isMail" :label=0 border>否</el-radio>
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload
            class="upload-demo"
            action="api/uploadImg"
            :on-preview="handlePreview"
            :before-upload="beforeUpload"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="1"
            :on-exceed="handleExceed">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click='submit'>提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      options: [{
        value: '雅诗兰黛',
        label: '雅诗兰黛'
      }, {
        value: '兰蔻',
        label: '兰蔻'
      }, {
        value: '欧莱雅',
        label: '欧莱雅'
      }, {
        value: '珀莱雅',
        label: '珀莱雅'
      }, {
        value: 'Chanel',
        label: 'Chanel'
      }, {
        value: '自然堂',
        label: '自然堂'
      }, {
        value: '迪奥',
        label: '迪奥'
      }, {
        value: '半亩花田',
        label: '半亩花田'
      }, {
        value: '韩束',
        label: '韩束'
      }, {
        value: '圣罗兰',
        label: '圣罗兰'
      }],
      shop: {
        shopName: '',
        shopPrice: '',
        shopDescribe: '',
        storeFront: '',
        position: '',
        isMail: 0,
        color: '乳白-淡黄-透明',
        notes: '',
        discount: '',
        promotion: '',
        img: '',
        commentId: '',
        paymentNumber: 0,
        comment: '0'
      }
    }
  },
  created(){
    this.shop.storeFront = localStorage.getItem('userName')
  },
  methods: {
    change(value){
      this.$axios.get(`api/getBrandTotal?brand=${value}`).then(result => {
        if(result.status === 200){
          this.shop.commentId = `${this.conversion(this.shop.shopName)}${result.data.data.length + 1}`
        }
      })
    },
    beforeUpload(file){
      this.shop.img = file.name
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`)
    },
    submit(){
      console.log(this.shop)
      this.$axios.post('api/addShop', this.shop).then(result => {
        if(result.status === 200){
          this.$message('添加成功')
          this.shop = {
            shopName: '',
            shopPrice: '',
            shopDescribe: '',
            storeFront: '',
            position: '',
            isMail: 0,
            color: '乳白-淡黄-透明',
            notes: '',
            discount: '',
            promotion: '',
            img: '',
            commentId: '',
            paymentNumber: 0,
            comment: '0'
          }
        }
      })
    },
    conversion(str){
      switch(str){
        case "雅诗兰黛":
          return 'ysld'
        case "兰蔻":
          return 'lk'
        case "欧莱雅":
          return 'oly'
        case "珀莱雅":
          return 'oly'
        case "Chanel":
          return 'Chanel'
        case "自然堂":
          return 'zrt'
        case "迪奥":
          return 'da'
        case "半亩花田":
          return 'bmht'
        case "韩束":
          return 'hs'
        case "圣罗兰":
          return 'sll'
      }
    }
  }
}
</script>

<style scoped>
.from{
  padding: 20px 50px;
  width: 600px;
}
</style>
