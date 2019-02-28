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
          <el-form-item label="商品分类名称">
            <el-input v-model="query.title" placeholder="商品分类名称" size="mini"></el-input>
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
            :data="productClassList.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%">
            <el-table-column label="分类 ID"  prop="id"></el-table-column>
            <el-table-column label="排序编号" prop="orderId"></el-table-column>
            <el-table-column label="父分类" prop="parentId"></el-table-column>
            <el-table-column label="分类名称" prop="title"></el-table-column>
            <el-table-column align="center">
              <template slot="header" slot-scope="scope" class="operaClass">
                <el-button type="primary" size="mini" @click="dialogFormVisible = true">新增分类</el-button>
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
    <el-dialog title="商品分类信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="productClass" label-position="left">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="productClass.title" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="分类排序" :label-width="formLabelWidth">
          <el-input-number v-model="productClass.orderId" autocomplete="off" size="mini"></el-input-number>
        </el-form-item>
        <el-form-item label="父分类" :label-width="formLabelWidth">
          <el-select v-model="productClass.parentId" placeholder="请选择" size="mini">
            <el-option value="0" label="基本分类"></el-option>
            <el-option v-for="item in classAllData" :key="item.id" :label="item.title" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addProductClass()" size="mini">保 存</el-button>
        <el-button type="danger" size="mini" @click="dialogFormVisible = false">返 回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ProductClassSetting',
  data () {
    return {
      productClassList: [],
      search: '',
      formLabelWidth: '120px',
      productClass: {},
      dialogFormVisible: false,
      query: {},
      pageTotal: 10,
      currentPage: 1,
      classAllData: []
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
        this.deleteRequest('productClass/deleteData', {id: row.id}).then((response) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          for (var i = 0; i < this.productClassList.length; i++) {
            if (this.productClassList[i].id === row.id) {
              this.productClassList.splice(i, 1)
            }
          }

          for (i = 0; i < this.classAllData.length; i++) {
            if (this.classAllData[i].id === row.id) {
              this.classAllData.splice(i, 1)
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
      this.getProductClassPage(dataPage)
    },
    updateData (row) {
      this.dialogFormVisible = true
      this.productClass = row
    },
    queryParam () {
      this.handleCurrentChange(this.currentPage)
    },
    getProductClassPage (data) {
      this.getRequest('productClass/getPageData', data).then((response) => {
        this.pageTotal = response.data.count
        this.productClassList = response.data.result
      }).catch((er) => {
        console.error(er)
      })
    },
    getProductClass () {
      this.getRequest('productClass/getAllData').then((response) => {
        this.classAllData = response.data
      }).catch((er) => {
        console.error(er)
      })
    },
    addProductClass () {
      this.postRequest('productClass/addData', this.productClass).then((response) => {
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
        this.handleCurrentChange(this.currentPage)
      }).catch((er) => {
        console.error(er)
      })
    }
  },
  mounted: function () {
    const data = {pageNo: 0, size: 10}
    this.getProductClassPage(data)
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
