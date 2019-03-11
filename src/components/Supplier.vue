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
      <el-card class="box-card" v-if="!showProduct">
        <h3>搜索条件</h3>
        <el-form label-position="left" :inline="true">
          <el-form-item label="商户名称">
            <el-input v-model="query.name" placeholder="商户名称" size="mini"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryParam" size="mini">查询</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card class="box-card" v-if="showProduct">
        <h3>搜索条件</h3>
        <el-form label-position="left" :inline="true">
          <el-form-item label="商户">
            <el-select placeholder="请选择" @change="selectChange" size="mini" v-model="supplier">
              <el-option v-for="item in supplierList" :key="item.id" :label="item.companyName" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-card>
    </el-row>
    <el-row>
        <el-card class="box-card" v-show="!showProduct">
          <el-table
            :data="supplierList.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%">
            <el-table-column label="商户 ID"  prop="id"></el-table-column>
            <el-table-column label="商户名称" prop="companyName"></el-table-column>
            <el-table-column label="地址" prop="address" show-overflow-tooltip></el-table-column>
            <el-table-column label="商户简介" prop="companyProfile" show-overflow-tooltip></el-table-column>
            <el-table-column label="企业网址" prop="companyUrl" show-overflow-tooltip></el-table-column>
            <el-table-column label="手机号" prop="mobilePhone"></el-table-column>
            <el-table-column label="固话" prop="tel"></el-table-column>
            <el-table-column label="传真" prop="fax"></el-table-column>
            <el-table-column label="邮箱" prop="email"></el-table-column>
            <el-table-column align="center"  v-if="!showProduct">
              <template slot="header" slot-scope="scope" class="operaClass">
                <el-button type="primary" size="mini" @click="addSupplierInit">新增商户</el-button>
              </template>
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="getSupplierProductData(scope.row)">产品</el-button>
                <el-button type="text" size="mini" @click="updateData(scope.row)">修改</el-button>
                <el-button @click="deleteData(scope.row)" type="text" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            @current-change="handleCurrentChange"
            layout="total,prev, pager, next"
            :total="pageTotal">
          </el-pagination>
        </el-card>
        <el-card class="box-card" v-show="showProduct">
          <el-table
            :data="supplierProductList.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%">
            <el-table-column label="产品名称" prop="productInfo.name"></el-table-column>
            <el-table-column label="企业名称" prop="supplierInfoOrm.companyName"></el-table-column>
            <el-table-column label="产品单价" prop="unitPrice"></el-table-column>
            <el-table-column label="产品联系人" prop="productContacts" show-overflow-tooltip></el-table-column>
            <el-table-column label="工厂地址" prop="plantAddress" show-overflow-tooltip></el-table-column>
            <el-table-column label="起订量" prop="orderMinimumQuantity" show-overflow-tooltip></el-table-column>
            <el-table-column label="年产值" prop="outputValue" show-overflow-tooltip></el-table-column>
            <el-table-column label="年产量" prop="output"></el-table-column>
            <el-table-column label="年产能" prop="capacity"></el-table-column>
            <el-table-column label="创建日期" prop="createDate"></el-table-column>
            <el-table-column label="手机号" prop="mobilePhone"></el-table-column>
            <el-table-column align="center">
              <template slot="header" slot-scope="scope" class="operaClass" >
                <el-button type="text" size="mini" @click="addProductSupplierInit">新增</el-button>
                <el-button type="text" size="mini" @click="showProduct = false">返回</el-button>
              </template>
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="updateProductSupplier(scope.row)">修改</el-button>
                <el-button @click="deleteProductSupplier(scope.row)" type="text" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            @current-change="handleProductChange"
            layout="total,prev, pager, next"
            :total="pageTotal">
          </el-pagination>
        </el-card>
    </el-row>
    <el-dialog title="供应商信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="supplier" size="mini" :label-width="formLabelWidth">
        <el-form-item label="商户名称" >
          <el-input v-model="supplier.companyName" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="地址" >
          <el-input v-model="supplier.address" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="商户简介" >
          <el-input v-model="supplier.companyProfile" type="textarea" :rows="2" placeholder="商户简介" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="企业网址" >
          <el-input v-model="supplier.companyUrl" placeholder="企业网址" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="联系人手机号" >
          <el-input v-model="supplier.mobilePhone" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="联系固电话" >
          <el-input v-model="supplier.tel" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="传真" >
          <el-input v-model="supplier.fax" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" >
          <el-input v-model="supplier.email" autocomplete="off" size="mini"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addSupplier()" size="mini">保 存</el-button>
        <el-button type="danger" size="mini" @click="dialogFormVisible = false">返 回</el-button>
      </div>
    </el-dialog>
    <el-dialog title="供应商产品信息" :visible.sync="productSupplierDialog" width="30%">
      <el-form :model="productSupplier" size="mini" :label-width="formLabelWidth">
        <el-form-item label="商户名称" >
          <el-select v-model="productSupplier.productInfoId" clearable placeholder="请选择">
            <el-option
              v-for="item in productList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工厂地址" >
          <el-input v-model="productSupplier.plantAddress" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="产品介绍" >
          <el-input v-model="productSupplier.productDescription" type="textarea" :rows="2" placeholder="商户简介" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="起订量" >
          <el-input-number v-model="productSupplier.orderMinimumQuantity" placeholder="企业网址" autocomplete="off" size="mini"></el-input-number>
        </el-form-item>
        <el-form-item label="年产值" >
          <el-input-number v-model="productSupplier.outputValue" placeholder="企业网址" autocomplete="off" size="mini"></el-input-number>
        </el-form-item>
        <el-form-item label="年产量" >
          <el-input-number v-model="productSupplier.output" placeholder="企业网址" autocomplete="off" size="mini"></el-input-number>
        </el-form-item>
        <el-form-item label="年产能" >
          <el-input-number v-model="productSupplier.capacity" placeholder="企业网址" autocomplete="off" size="mini"></el-input-number>
        </el-form-item>
        <el-form-item label="工厂创建日期" >
          <el-date-picker v-model="productSupplier.createDate" type="date" placeholder="选择日期" size="mini" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="成产周期(天)" >
          <el-input-number v-model="productSupplier.leadTime" placeholder="企业网址" autocomplete="off" size="mini"></el-input-number>
        </el-form-item>
        <el-form-item label="产品单价" >
          <el-input-number v-model="productSupplier.unitPrice" :precision="2" :step="5.0" size="mini"></el-input-number>
        </el-form-item>
        <el-form-item label="产品联系人" >
          <el-input v-model="productSupplier.productContacts" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="联系人手机" >
          <el-input v-model="productSupplier.mobilePhone" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="其他联系方式" >
          <el-input v-model="productSupplier.otherContacts" autocomplete="off" size="mini"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addProductSupplier()" size="mini">保 存</el-button>
        <el-button type="danger" size="mini" @click="productSupplierDialog = false">返 回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Supplier',
  data () {
    return {
      supplierList: [],
      search: '',
      showProduct: false,
      formLabelWidth: '120px',
      supplier: {},
      dialogFormVisible: false,
      query: {},
      pageTotal: 10,
      total: 10,
      currentPage: 1,
      productPage: 1,
      supplierProductList: [],
      productSupplier: {},
      productSupplierDialog: false,
      productList: []
    }
  },
  methods: {
    deleteData (row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.deleteRequest('supplier/deleteData', {id: row.id}).then((response) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          for (var i = 0; i < this.supplierList.length; i++) {
            if (this.supplierList[i].id === row.id) {
              this.supplierList.splice(i, 1)
            }
          }
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
    deleteProductSupplier (row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.deleteRequest('productSupplier/deleteData', {id: row.id}).then((response) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          for (var i = 0; i < this.supplierProductList.length; i++) {
            if (this.supplierProductList[i].id === row.id) {
              this.supplierProductList.splice(i, 1)
            }
          }
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
    handleCurrentChange (val) {
      this.currentPage = val
      const dataPage = {pageNo: this.currentPage - 1, size: 10}
      dataPage.data = {}
      dataPage.data.name = this.query.name
      if (this.query.region) {
        dataPage.data.type = Number(this.query.region)
      }
      this.getSupplierPage(dataPage)
    },
    handleProductChange (val) {
      this.productPage = val
      const dataPage = {pageNo: this.productPage - 1, size: 10}
      dataPage.data = {}
      dataPage.data.name = this.query.name
      if (this.query.region) {
        dataPage.data.type = Number(this.query.region)
      }
      this.querySupplierProduct(dataPage)
    },
    updateData (row) {
      this.dialogFormVisible = true
      this.supplier = row
    },
    updateProductSupplier (row) {
      this.productSupplierDialog = true
      this.productSupplier = row
      this.productSupplier.productInfoId = row.productInfo.id
    },
    queryParam () {
      this.handleCurrentChange(this.currentPage)
    },
    getSupplierPage (data) {
      this.getRequest('supplier/getPageData', data).then((response) => {
        this.pageTotal = response.data.count
        this.supplierList = response.data.result
      }).catch((er) => {
        console.error(er)
      })
    },
    addSupplier () {
      this.postRequest('supplier/addData', this.supplier).then((response) => {
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
        this.handleCurrentChange(this.currentPage)
        this.dialogFormVisible = false
      }).catch((er) => {
        console.error(er)
      })
    },
    addProductSupplier () {
      this.productSupplier.supplierInfoId = this.supplier.id
      this.postRequest('productSupplier/addDataSupplier', this.productSupplier).then((response) => {
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
        this.handleProductChange(this.productPage)
        this.productSupplierDialog = false
      }).catch((er) => {
        console.error(er)
      })
    },
    addSupplierInit () {
      this.dialogFormVisible = true
      this.supplier = {}
    },
    addProductSupplierInit () {
      this.productSupplierDialog = true
      this.productSupplier = {}
    },
    getSupplierProductData (rowData) {
      const data = {pageNo: 0, size: 10, data: {supplierInfoOrm: rowData}}
      this.supplier = rowData
      this.querySupplierProduct(data)
      this.getRequest('product/getAllData').then((response) => {
        this.productList = response.data.result
      }).catch((er) => {
        console.error(er)
      })
    },
    querySupplierProduct (data) {
      this.getRequest('productSupplier/getPageData', data).then((response) => {
        this.pageTotal = response.data.count
        this.supplierProductList = response.data.result
        this.showProduct = true
      }).catch((er) => {
        console.error(er)
      })
    },
    selectChange (selVal) {
      this.supplier = selVal
      this.getSupplierProductData(selVal)
    }
  },
  mounted: function () {
    const data = {pageNo: 0, size: 10}
    this.getSupplierPage(data)
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
    background: rgba(255,0,0, 0.1);
  }

  .el-table >>> .success-row {
    background: rgba(0,128,0, 0.1);
  }

  .el-table >>> th{
    padding: 0px;
  }
  .el-table >>> label {
    width: 90px;
    color: #99a9bf;
    font-weight: bold;
  }

  .box-card h3{
    text-align: left;
  }
</style>
