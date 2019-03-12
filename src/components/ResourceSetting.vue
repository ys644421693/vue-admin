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
          <el-form-item label="服务名称">
            <el-input v-model="query.name" placeholder="服务名称" size="mini"></el-input>
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
            :data="resourceList.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%">
            <el-table-column label="服务 ID"  prop="id"></el-table-column>
            <el-table-column label="服务名称" prop="name"></el-table-column>
            <el-table-column label="服务路径" prop="path" show-overflow-tooltip></el-table-column>
            <el-table-column label="服务类型" prop="type">
              <template slot-scope="scope">
                  {{scope.row.type ===0?'普通':'外部接口'}}
              </template>
            </el-table-column>
            <el-table-column label="服务状态" prop="state">
              <template slot-scope="scope">
                <el-tag :type="scope.row.state === 0 ? 'success' : 'danger'" disable-transitions size="mini">
                  {{scope.row.state ===0?'启用':'停用'}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="请求方法" prop="method"></el-table-column>
            <el-table-column label="请求标识" prop="flag"></el-table-column>
            <el-table-column align="center">
              <template slot="header" slot-scope="scope" class="operaClass">
                <el-button type="primary" size="mini" @click="addResourceInit">新增服务</el-button>
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
        </el-card>
    </el-row>
    <el-dialog title="服务信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="resource" size="mini" :label-width="formLabelWidth">
        <el-form-item label="服务名称" >
          <el-input v-model="resource.name" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="服务路径" >
          <el-input v-model="resource.path" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="服务类型" >
          <el-select v-model="resource.type" size="mini" placeholder="--服务类型--" filterable clearable>
            <el-option :value="0" label="普通"></el-option>
            <el-option :value="1" label="外部接口"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务状态" >
          <el-select v-model="resource.state" size="mini" placeholder="--服务类型--" filterable clearable>
            <el-option :value="0" label="启用"></el-option>
            <el-option :value="1" label="停用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请求方法" >
          <el-input v-model="resource.method" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="服务标识" >
          <el-input v-model="resource.flag" autocomplete="off" size="mini"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addResource()" size="mini">保 存</el-button>
        <el-button type="danger" size="mini" @click="dialogFormVisible = false">返 回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ResourceSetting',
  data () {
    return {
      resourceList: [],
      search: '',
      formLabelWidth: '120px',
      resource: {},
      dialogFormVisible: false,
      query: {},
      pageTotal: 10,
      currentPage: 1
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
        this.deleteRequest('resource/deleteData', {id: row.id}).then((response) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          for (var i = 0; i < this.resourceList.length; i++) {
            if (this.resourceList[i].id === row.id) {
              this.resourceList.splice(i, 1)
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
      this.getResourcePage(dataPage)
    },
    updateData (row) {
      this.dialogFormVisible = true
      this.resource = row
    },
    queryParam () {
      this.handleCurrentChange(this.currentPage)
    },
    getResourcePage (data) {
      this.getRequest('resource/getPageData', data).then((response) => {
        this.pageTotal = response.data.count
        this.resourceList = response.data.result
      }).catch((er) => {
        console.error(er)
      })
    },
    addResource () {
      this.postRequest('resource/addData', this.resource).then((response) => {
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
    addResourceInit () {
      this.dialogFormVisible = true
      this.resource = {}
    }
  },
  mounted: function () {
    const data = {pageNo: 0, size: 10}
    this.getResourcePage(data)
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
