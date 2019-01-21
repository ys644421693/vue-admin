<template>
  <div class="hello">
    <el-row>
      <el-card class="box-card">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
      </el-card>
    </el-row>
    <el-row>
        <el-card class="box-card">
          <el-table
            :data="productList.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%"
            :row-class-name="tableRowClassName">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="商品名称">
                    <span>{{ props.row.name }}</span>
                  </el-form-item>
                  <el-form-item label="所属店铺">
                    <span>{{ props.row.shop }}</span>
                  </el-form-item>
                  <el-form-item label="商品 ID">
                    <span>{{ props.row.id }}</span>
                  </el-form-item>
                  <el-form-item label="店铺 ID">
                    <span>{{ props.row.shopId }}</span>
                  </el-form-item>
                  <el-form-item label="商品分类">
                    <span>{{ props.row.category }}</span>
                  </el-form-item>
                  <el-form-item label="店铺地址">
                    <span>{{ props.row.address }}</span>
                  </el-form-item>
                  <el-form-item label="商品描述">
                    <span>{{ props.row.desc }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              label="商品 ID"
              prop="id">
            </el-table-column>
            <el-table-column
              label="商品名称"
              prop="name">
            </el-table-column>
            <el-table-column
              label="描述"
              prop="desc">
            </el-table-column>
            <el-table-column align="center">
              <template slot="header" slot-scope="scope" class="operaClass">
                <el-form :inline="true" class="demo-form-inline">
                  <el-form-item>
                  <el-input placeholder="输入关键字搜索" v-model="search" size="mini"/>
                  </el-form-item>
                  <el-form-item>
                      <el-button type="primary" size="mini" @click="dialogFormVisible = true">添加商品</el-button>
                  </el-form-item>
                </el-form>
              </template>
              <template slot-scope="scope">
                <el-button type="primary" size="mini">修改</el-button>
                <el-button @click="deleteData(scope.row)" type="danger" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
        </el-card>
    </el-row>
    <el-dialog title="商品属性" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="product" label-position="left">
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="product.name" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="商品分类" :label-width="formLabelWidth">
          <el-select v-model="product.region" size="mini" placeholder="--请选择商品分类--">
            <el-option label="VR" value="1"></el-option>
            <el-option label="香薰机" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品描述" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" placeholder="商品描述" v-model="product.describe">
          </el-input>
        </el-form-item>
        <br>
        <el-form-item label="主页显示" :label-width="formLabelWidth">
          <el-switch v-model="product.isShowIndex" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item label="商品排行" :label-width="formLabelWidth">
          <el-input-number v-model="product.sortNumber" @change="handleChange" :min="1" :max="10" label="序号" size="mini"></el-input-number>
        </el-form-item>
        <el-form-item label="商品图片" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="product.fileList"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false" size="mini">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      productList: [{
        id: '12987122',
        name: 'test1',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987123',
        name: 'test2',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987125',
        name: 'test3',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987126',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }],
      search: '',
      formLabelWidth: '120px',
      product: {},
      dialogFormVisible: false
    }
  },
  methods: {
    tableRowClassName ({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    deleteData (row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    submitUpload () {
      this.$refs.upload.submit()
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleChange (file, fileList) {
      this.product.fileList = fileList.slice(-3)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .el-card {
    margin-bottom: 10px;
  }
  .el-pagination {
    margin-top: 25px;
  }
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .el-form >>> .el-form-item__content{
    height: 40px;
    text-align: left;
  }
  .el-form-item {
    margin: 0px;
    height: 40px;
  }
  .el-table >>> th{
    padding: 0px;
  }
  .el-table >>> label {
    width: 90px;
    color: #99a9bf;
    font-weight: bold;
  }
  .el-dialog__wrapper >>> .el-dialog__body {
    height: 400px;
  }
</style>
