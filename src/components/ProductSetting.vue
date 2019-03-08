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
                  <el-form-item label="商品 ID">
                    <span>{{ props.row.id }}</span>
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
            <el-table-column label="主页" prop="showIndex">
              <template slot-scope="scope">
                <el-tag :type="scope.row.showIndex ? 'success' : 'danger'" disable-transitions size="mini">
                  {{scope.row.showIndex ?'显示':'不显示'}}
                </el-tag>
              </template>
            </el-table-column>
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
                <el-button type="primary" size="mini" @click="addBusiness">添加商品</el-button>
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
            layout="total,prev, pager, next"
            :total="pageTotal">
          </el-pagination>
        </el-row>
        <el-row v-if="showForm">
          <el-col :span="8" :offset="8">
            <el-form :model="product" :rules="rules" size="mini" :label-width="formLabelWidth">
              <el-form-item label="商品名称" >
                <el-input v-model="product.name" autocomplete="off" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="商品副标题" >
                <el-input v-model="product.subheading" autocomplete="off" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="商品分类" >
                <el-select v-model="classId" size="mini" placeholder="--请选择商品分类--" filterable clearable>
                  <el-option v-for="item in classType" :key="item.id" :label="item.title" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="商品描述" >
                <el-input type="textarea" :rows="2" placeholder="商品描述" v-model="product.descript">
                </el-input>
              </el-form-item>
              <el-form-item label="成本价格" >
                <el-input-number v-model="product.costPrice" :precision="2" :step="5.0" size="mini"></el-input-number>
              </el-form-item>
              <el-form-item label="销售单价" >
                <el-input-number v-model="product.price" :precision="2" :step="5.0" size="mini"></el-input-number>
              </el-form-item>
              <el-form-item label="库存" >
                <el-input-number v-model="product.stock" :precision="2" :step="5.0" size="mini"></el-input-number>
              </el-form-item>
              <el-form-item label="生产日期" >
                <el-date-picker v-model="product.productDate" type="date" placeholder="选择日期" size="mini" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="过期时间" >
                <el-date-picker v-model="product.termOfValidity" type="date" placeholder="选择日期" size="mini" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="币种" >
                <el-radio-group v-model="product.unit">
                  <el-radio label="USD">美元</el-radio>
                  <el-radio label="CNY">人民币</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="主页显示" >
                <el-switch v-model="product.showIndex" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
              </el-form-item>
              <el-form-item label="商品排序" >
                <el-input-number v-model="product.sortNumber" :min="1" :max="10" label="序号" size="mini"></el-input-number>
              </el-form-item>
              <el-form-item label="商品图片" >
                <el-upload
                  :action="uploadPath"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :with-credentials="true"
                  :file-list="fileList"
                  :on-success="uploadSuccess"
                  :on-remove="removeFile"
                  accept="image/png,image/gif,image/jpg,image/jpeg">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </el-form-item>
              <el-form-item>
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
      fileList: [],
      classType: [],
      showForm: false,
      classId: '',
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
      if (row.productClassSet) {
        return row.productClassSet[0].title
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
      if (this.product.productClassSet) {
        this.classId = this.product.productClassSet[0].id
      }
      if (this.product.productPropertySet) {
        this.product.productPropertySet.forEach(p => {
          if (p.type === 1) {
            this.fileList = [{name: p.propertyName, url: this.$store.state.baseUrl + p.value}]
          }
        })
      }
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
        this.classType = response.data
      }).catch((er) => {
        console.error(er)
      })
    },
    addProductInfo () {
      if (this.classId) {
        for (var u = 0; u < this.classType.length; u++) {
          if (this.classType[u].id === this.classId) {
            if (!this.product.productClassSet) {
              this.product.productClassSet = []
            }
            for (var o = 0; this.product.productClassSet.length > o; o++) {
              if (this.classType[u].id !== this.product.productClassSet[o].id) {
                this.product.productClassSet.push(this.classType[u])
              }
            }
            if (this.product.productClassSet.length === 0) {
              this.product.productClassSet.push(this.classType[u])
            }
          }
        }
      }
      if (this.product.termOfValidity) {
        this.product.termOfValidity = this.product.termOfValidity.substr(0, 10)
      }
      if (this.product.productDate) {
        this.product.productDate = this.product.productDate.substr(0, 10)
      }
      if (!this.product.productSaleLogSet) {
        this.product.productSaleLogSet = []
      }
      this.product.status = 1
      this.postRequest('product/addData', this.product).then((response) => {
        this.handleCurrentChange(this.currentPage)
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
        this.showForm = false
      }).catch((er) => {
        console.error(er)
      })
    },
    uploadSuccess (response, file, fileList) {
      this.product.productPropertySet = []
      this.product.productPropertySet.push(response.result)
    },
    addBusiness () {
      this.showForm = true
      this.classId = ''
      this.product = {}
    },
    removeFile (file, fileList) {
      var data = {fileName: file.url.substring(this.$store.state.baseUrl.length)}
      this.deleteRequest('fileUpload/deleteFile', data).then((response) => {
      }).catch((er) => {
        console.error(er)
      })
      if (this.product.productPropertySet) {
        for (var i = 0; this.product.productPropertySet.length > i; i++) {
          if (data.fileName.includes(this.product.productPropertySet[i].value)) {
            this.product.productPropertySet.splice(i, 1)
          }
        }
      }
      console.log(this.product)
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
