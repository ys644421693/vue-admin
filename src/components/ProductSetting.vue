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
        <h3>搜索条件</h3>
        <el-form label-position="left" :inline="true">
          <el-form-item label="商品名称">
            <el-input v-model="query.name" placeholder="商品名称" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="商品类型">
            <el-select v-model="query.region" size="mini" placeholder="--请选择商品分类--">
              <el-option label="VR" value="1"></el-option>
              <el-option label="香薰机" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryParam" size="mini">查询</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-row>
    <el-row>
        <el-card class="box-card">
          <el-table
            :data="productList.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%">
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
            <el-table-column label="商品 ID"  prop="id"></el-table-column>
            <el-table-column label="商品名称" prop="name"></el-table-column>
            <el-table-column label="商品分类" prop="region" :formatter="typeTransfer"></el-table-column>
            <el-table-column label="提供商" show-overflow-tooltip prop="provide"></el-table-column>
            <el-table-column label="价格" prop="price" :formatter="amountUnit"></el-table-column>
            <el-table-column label="状态" prop="state">
              <template slot-scope="scope">
                <el-tag :type="scope.row.state === 1 ? 'success' : 'danger'" disable-transitions size="mini">{{scope.row.state ===1?'销售中':'下架'}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="排序" prop="sortNumber"></el-table-column>
            <el-table-column align="center">
              <template slot="header" slot-scope="scope" class="operaClass">
                <el-button type="primary" size="mini" @click="dialogFormVisible = true">添加商品</el-button>
              </template>
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="updateData(scope.row)">修改</el-button>
                <el-button @click="deleteData(scope.row)" type="danger" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :total="pageTotal">
          </el-pagination>
        </el-card>
    </el-row>
    <el-dialog title="商品信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="product" label-position="left" :rules="rules">
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="product.name" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="商品副标题" :label-width="formLabelWidth">
          <el-input v-model="product.subheading" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="提供商" :label-width="formLabelWidth">
          <el-input v-model="product.provide" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="提供商电话" :label-width="formLabelWidth">
          <el-input v-model="product.providePhone" autocomplete="off" size="mini"></el-input>
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
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input-number v-model="product.price" :precision="2" :step="5.0" size="mini"></el-input-number>
        </el-form-item>
        <el-form-item label="单位" :label-width="formLabelWidth">
          <el-radio-group v-model="product.unit">
            <el-radio label="USD">美元</el-radio>
            <el-radio label="CNY">人民币</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="主页显示" :label-width="formLabelWidth">
          <el-switch v-model="product.isShowIndex" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item label="商品排序" :label-width="formLabelWidth">
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
        <el-button type="primary" @click="saveInfo('')" size="mini">保 存</el-button>
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
        region: 1,
        subheading: '江浙小吃、小吃零食',
        provide: '荷兰优质淡奶，奶香浓而不腻',
        providePhone: '上海市普陀区真北路',
        describe: '王小虎夫妻店',
        price: '10333',
        unit: 'CNY',
        isShowIndex: '10333',
        sortNumber: 1,
        state: 1
      }, {
        id: '12987123',
        name: 'test1',
        region: 1,
        subheading: '江浙小吃、小吃零食',
        provide: '荷兰优质淡奶，奶香浓而不腻',
        providePhone: '上海市普陀区真北路',
        describe: '王小虎夫妻店',
        price: '10333',
        unit: 'CNY',
        isShowIndex: '10333',
        sortNumber: 2,
        state: 1
      }, {
        id: '12987125',
        name: 'test1',
        region: 1,
        subheading: '江浙小吃、小吃零食',
        provide: '荷兰优质淡奶，奶香浓而不腻',
        providePhone: '上海市普陀区真北路',
        describe: '王小虎夫妻店',
        price: '10333',
        unit: 'CNY',
        isShowIndex: '10333',
        sortNumber: 3,
        state: 2
      }, {
        id: '12987126',
        name: 'test1',
        region: 2,
        subheading: '江浙小吃、小吃零食',
        provide: '荷兰优质淡奶，奶香浓而不腻',
        providePhone: '上海市普陀区真北路',
        describe: '王小虎夫妻店',
        price: '10333',
        unit: 'USD',
        isShowIndex: '10333',
        sortNumber: 4,
        state: 1
      }],
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      search: '',
      formLabelWidth: '120px',
      product: {},
      dialogFormVisible: false,
      query: {},
      pageTotal: 10
    }
  },
  methods: {
    tableRowClassName ({row, rowIndex}) {
      if (row.state === 2) {
        return 'warning-row'
      } else if (row.state === 1) {
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
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      const dataPage = {pageNo: val - 1, size: 10}
      dataPage.data = {}
      dataPage.data.name = this.query.name
      dataPage.data.assign = []
      dataPage.data.assign.push(this.query.region)
      this.getProduct(dataPage)
    },
    saveInfo (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
          this.dialogFormVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    typeTransfer (row, column, cellValue, index) {
      if (cellValue === 1) {
        return 'VR'
      } else if (cellValue === 2) {
        return '香薰机'
      }
      return ''
    },
    amountUnit (row, column, cellValue, index) {
      var unit = ''
      if (row.unit === 'USD') {
        unit = '(美元)'
      } else if (row.unit === 'CNY') {
        unit = '(人民币)'
      }
      return cellValue + unit
    },
    updateData (row) {
      this.dialogFormVisible = true
      this.product = row
    },
    queryParam () {
    },
    getProduct (data) {
      this.getRequest('product/getPageData', data).then((response) => {
        console.log(response.data)
        this.pageTotal = response.data.count
      }).catch((er) => {
        console.error(er)
      })
    }
  },
  mounted: function () {
    const data = {pageNo: 0, size: 10}
    this.getProduct(data)
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
  .el-table >>> .warning-row {
    background: rgba(255,0,0, 0.1);
  }

  .el-table >>> .success-row {
    background: rgba(0,128,0, 0.1);
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
    height: 450px;
  }

  .box-card h3{
    text-align: left;
  }
</style>
