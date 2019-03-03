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
          <el-form-item label="资源名称">
            <el-input v-model="query.name" placeholder="资源名称" size="mini"></el-input>
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
            :data="initAccessResourceList.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%">
            <el-table-column label="资源 ID"  prop="id"></el-table-column>
            <el-table-column label="资源名称" prop="name"></el-table-column>
            <el-table-column label="资源路径" prop="path"></el-table-column>
            <el-table-column label="资源类型" prop="type">
              <template slot-scope="scope">
                <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'" disable-transitions size="mini">
                  {{scope.row.type ===1?'登录限制':'无权限限制'}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="资源描述" prop="description"></el-table-column>
            <el-table-column align="center">
              <template slot="header" slot-scope="scope" class="operaClass">
                <el-button type="primary" size="mini" @click="dialogFormVisible = true">新增资源</el-button>
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
    <el-dialog title="接口静态资源信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="initAccessResource" label-position="left">
        <el-form-item label="资源名称" :label-width="formLabelWidth">
          <el-input v-model="initAccessResource.name" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="资源路径" :label-width="formLabelWidth">
          <el-select v-model="initAccessResource.path" placeholder="请选择" size="mini">
            <el-option value="0" label="无权限限制"></el-option>
            <el-option v-for="item in resourceAll" :key="item.id" :label="item.name" :value="item.path"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资源类型" :label-width="formLabelWidth">
          <el-select v-model="initAccessResource.type" placeholder="请选择" size="mini">
          <el-option value="0" label="无权限限制"></el-option>
          <el-option value="1" label="登录限制"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资源描述" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" placeholder="商品描述" v-model="initAccessResource.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addInitAccessResource()" size="mini">保 存</el-button>
        <el-button type="danger" size="mini" @click="dialogFormVisible = false">返 回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'InitAccessResource',
  data () {
    return {
      initAccessResourceList: [],
      search: '',
      formLabelWidth: '120px',
      initAccessResource: {},
      dialogFormVisible: false,
      query: {},
      pageTotal: 10,
      currentPage: 1,
      resourceAll: []
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
        this.deleteRequest('initAccessResource/deleteData', {id: row.id}).then((response) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          for (var i = 0; i < this.initAccessResourceList.length; i++) {
            if (this.initAccessResourceList[i].id === row.id) {
              this.initAccessResourceList.splice(i, 1)
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
      this.getInitAccessResourcePage(dataPage)
    },
    updateData (row) {
      this.dialogFormVisible = true
      this.initAccessResource = row
    },
    queryParam () {
      this.handleCurrentChange(this.currentPage)
    },
    getInitAccessResourcePage (data) {
      this.getRequest('initAccessResource/getPageData', data).then((response) => {
        this.pageTotal = response.data.count
        this.initAccessResourceList = response.data.result
      }).catch((er) => {
        console.error(er)
      })
    },
    getResource () {
      this.getRequest('resource/getAllData').then((response) => {
        this.resourceAll = response.data.result
      }).catch((er) => {
        console.error(er)
      })
    },
    addInitAccessResource () {
      this.postRequest('initAccessResource/addData', this.initAccessResource).then((response) => {
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
    this.getInitAccessResourcePage(data)
    this.getResource()
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
    height: 200px;
  }

  .box-card h3{
    text-align: left;
  }
</style>
