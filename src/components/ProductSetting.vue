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
      <el-card class="box-card" v-if="!showForm">
        <h3>搜索条件</h3>
        <el-form label-position="left" :inline="true">
          <el-form-item label="商品名称">
            <el-input v-model="query.name" placeholder="商品名称" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="商品类型">
            <el-select v-model="query.region" size="mini" placeholder="--请选择商品分类--">
              <el-option label="不限" value=""></el-option>
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
        <el-row v-if="!showForm">
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
            <el-table-column label="商品 ID" prop="id"></el-table-column>
            <el-table-column label="商品名称" prop="name"></el-table-column>
            <el-table-column label="商品分类" prop="region" :formatter="typeTransfer"></el-table-column>
            <el-table-column label="提供商" show-overflow-tooltip prop="provide"></el-table-column>
            <el-table-column label="价格" prop="price" :formatter="amountUnit"></el-table-column>
            <el-table-column label="状态" prop="state">
              <template slot-scope="scope">
                <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'" disable-transitions size="mini">
                  {{scope.row.status ===1?'销售中':'下架'}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="排序" prop="sortNumber"></el-table-column>
            <el-table-column align="center">
              <template slot="header" slot-scope="scope" class="operaClass">
                <el-button type="primary" size="mini" @click="showForm = true">添加商品</el-button>
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
        </el-row>
        <el-row v-if="showForm">
          <el-col :span="12" :offset="6">
            <el-form :model="product" label-position="left" :rules="rules">
              <el-form-item label="商品名称" :label-width="formLabelWidth">
                <el-input v-model="product.name" autocomplete="off" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="商品副标题" :label-width="formLabelWidth">
                <el-input v-model="product.subheading" autocomplete="off" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="商品分类" :label-width="formLabelWidth">
                <el-select v-model="product.region" size="mini" placeholder="--请选择商品分类--">
                  <el-option label="VR" value="1"></el-option>
                  <el-option label="香薰机" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="商品描述" :label-width="formLabelWidth">
                <el-input type="textarea" :rows="2" placeholder="商品描述" v-model="product.descript">
                </el-input>
              </el-form-item>
              <br>
              <el-form-item label="成本价格" :label-width="formLabelWidth">
                <el-input-number v-model="product.costPrice" :precision="2" :step="5.0" size="mini"></el-input-number>
              </el-form-item>
              <el-form-item label="销售单价" :label-width="formLabelWidth">
                <el-input-number v-model="product.price" :precision="2" :step="5.0" size="mini"></el-input-number>
              </el-form-item>
              <el-form-item label="库存" :label-width="formLabelWidth">
                <el-input-number v-model="product.stock" :precision="2" :step="5.0" size="mini"></el-input-number>
              </el-form-item>
              <el-form-item label="生产日期" :label-width="formLabelWidth">
                <el-date-picker v-model="product.productDate" type="date" placeholder="选择日期" size="mini" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="过期时间" :label-width="formLabelWidth">
                <el-date-picker v-model="product.termOfValidity" type="date" placeholder="选择日期" size="mini" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="币种" :label-width="formLabelWidth">
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
                <el-input-number v-model="product.sortNumber" :min="1" :max="10" label="序号" size="mini"></el-input-number>
              </el-form-item>
              <el-form-item label="商品图片" :label-width="formLabelWidth">
                <el-upload
                  :action="uploadPath"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :with-credentials="true"
                  :on-success="uploadSuccess"
                  accept="image/png,image/gif,image/jpg,image/jpeg">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </el-form-item>
              <br>
              <el-form-item style="padding-top:100px;">
                <el-button type="primary" @click="addProductInfo()" size="mini">保 存</el-button>
                <el-button type="danger" @click="showForm = false" size="mini">返 回</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import store from '../store/eunion/store'
export default {
  name: 'ProductSetting',
  store,
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      productList: [],
      rules: {
        name: [
          {required: true, message: '请输入商品名称', trigger: 'blur'},
          {min: 3, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ]
      },
      search: '',
      formLabelWidth: '120px',
      product: {},
      dialogImageUrl: '',
      dialogVisible: false,
      query: {},
      pageTotal: 10,
      currentPage: 1,
      classType: [],
      showForm: false,
      uploadPath: this.$store.state.baseUrl + 'fileUpload/singleProductFileUpload?type=1'
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
        this.deleteRequest('product/deleteData', {id: row.id}).then((response) => {
          console.log(response.data)
          for (var i = 0; i < this.productList.length; i++) {
            if (this.productList[i].id === row.id) {
              this.productList.splice(i, 1)
            }
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch((er) => {
          console.error(er)
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
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleCurrentChange (val) {
      this.currentPage = val
      const dataPage = {pageNo: this.currentPage - 1, size: 10}
      dataPage.data = {}
      dataPage.data.name = this.query.name
      if (this.query.region) {
        dataPage.data.type = Number(this.query.region)
      }
      this.getProduct(dataPage)
    },
    typeTransfer (row, column, cellValue, index) {
      if (cellValue === 1) {
        return 'VR'
      } else if (cellValue === 2) {
        return '香薰机'
      }
      return '无'
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
      this.product = row
      this.showForm = true
    },
    queryParam () {
      this.handleCurrentChange(this.currentPage)
    },
    getProduct (data) {
      this.getRequest('product/getPageData', data).then((response) => {
        this.pageTotal = response.data.count
        this.productList = response.data.result
      }).catch((er) => {
        console.error(er)
      })
    },
    getProductClass () {
      this.getRequest('productClass/getAllData').then((response) => {
        this.classType = response.data.result
      }).catch((er) => {
        console.error(er)
      })
    },
    addProductInfo () {
      this.postRequest('product/addData', this.product).then((response) => {
        this.handleCurrentChange(this.currentPage)
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
      }).catch((er) => {
        console.error(er)
      })
    },
    uploadSuccess (response, file, fileList) {
      this.product.productPropertySet = []
      this.product.productPropertySet.push(response.result)
    }
  },
  mounted: function () {
    const data = {pageNo: 0, size: 10}
    this.getProduct(data)
    this.getProductClass()
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
    background: rgba(255, 0, 0, 0.1);
  }

  .el-table >>> .success-row {
    background: rgba(0, 128, 0, 0.1);
  }

  .el-form >>> .el-form-item__content {
    height: 40px;
    text-align: left;
  }

  .el-form-item {
    margin: 0px;
    height: 40px;
  }

  .el-table >>> th {
    padding: 0px;
  }

  .el-table >>> label {
    width: 90px;
    color: #99a9bf;
    font-weight: bold;
  }

  .el-dialog__wrapper >>> .el-dialog__body {
    height: auto;
  }

  .box-card h3 {
    text-align: left;
  }
</style>
