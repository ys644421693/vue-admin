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
    <el-row v-if="!resourceDialog">
      <el-card class="box-card">
        <h3>搜索条件</h3>
        <el-form label-position="left" :inline="true">
          <el-form-item label="角色名称">
            <el-input v-model="query.roleName" placeholder="角色名称" size="mini"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryParam" size="mini">查询</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-row>
    <el-row v-if="resourceDialog">
      <el-card class="box-card">
        <h3>搜索条件</h3>
        <el-form label-position="left" :inline="true">
          <el-form-item label="服务名称">
            <el-input v-model="resourceName" placeholder="服务名称" size="mini" v-on:change="toggleSelection(resourceDialogData.resourceVos)"></el-input>
          </el-form-item>
        </el-form>
      </el-card>
    </el-row>
    <el-row>
        <el-card class="box-card" v-if="!resourceDialog">
          <el-table
            :data="roleList.filter(data => !search || data.roleName.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%"
            :key="2">
            <el-table-column label="角色 ID"  prop="id"></el-table-column>
            <el-table-column label="角色名称" prop="roleName"></el-table-column>
            <el-table-column align="center">
              <template slot="header" slot-scope="scope" class="operaClass">
                <el-button type="primary" size="mini" @click="dialogFormVisible = true">新增角色</el-button>
              </template>
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="updateData(scope.row)" v-if="scope.row.id!=1">修改</el-button>
                <el-button type="primary" size="mini" @click="resourceData(scope.row)" v-if="scope.row.id!=1">服务管理</el-button>
                <el-button @click="deleteData(scope.row)" type="danger" size="mini" v-if="scope.row.id!=1">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            v-if="!resourceDialog"
            background
            @current-change="handleCurrentChange"
            layout="total,prev, pager, next"
            :total="pageTotal">
          </el-pagination>
        </el-card>
        <el-card v-if="resourceDialog">
          <el-table
            ref="multipleTable"
            :data="allResourceData.filter(data => !resourceName || data.path.toLowerCase().includes(resourceName.toLowerCase()))"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            :key="1">
            <el-table-column
              type="selection"
              width="60">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="path"
              label="地址">
            </el-table-column>
            <el-table-column>
              <template slot="header" slot-scope="scope" class="operaClass">
                <el-button type="primary" size="mini" @click="addResource">保 存</el-button>
                <el-button type="primary" size="mini" @click="resourceDialog = false">取 消</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
    </el-row>
    <el-dialog title="角色信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="role" size="mini" :label-width="formLabelWidth">
        <el-form-item label="分类名称" >
          <el-input v-model="role.roleName" autocomplete="off" size="mini"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addRole()" size="mini">保 存</el-button>
        <el-button type="danger" size="mini" @click="dialogFormVisible = false">返 回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'RoleSetting',
  data () {
    return {
      roleList: [],
      search: '',
      formLabelWidth: '120px',
      role: {},
      dialogFormVisible: false,
      resourceDialog: false,
      query: {},
      pageTotal: 10,
      currentPage: 1,
      classAllData: [],
      resourceDialogData: {},
      multipleSelection: [],
      allResourceData: [],
      resourceName: ''
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
        this.deleteRequest('role/deleteData', {id: row.id}).then((response) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          for (var i = 0; i < this.roleList.length; i++) {
            if (this.roleList[i].id === row.id) {
              this.roleList.splice(i, 1)
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
    handleCurrentChange (val) {
      this.currentPage = val
      const dataPage = {pageNo: this.currentPage - 1, size: 10}
      dataPage.data = {}
      dataPage.data.roleName = this.query.roleName
      this.getRolePage(dataPage)
    },
    updateData (row) {
      this.dialogFormVisible = true
      this.role = row
    },
    queryParam () {
      this.handleCurrentChange(this.currentPage)
    },
    getRolePage (data) {
      this.getRequest('role/getPageData', data).then((response) => {
        this.pageTotal = response.data.count
        this.roleList = response.data.result
      }).catch((er) => {
        console.error(er)
      })
    },
    addRole () {
      this.postRequest('role/addData', this.role).then((response) => {
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
        this.handleCurrentChange(this.currentPage)
        this.resourceDialog = false
      }).catch((er) => {
        console.error(er)
      })
    },
    resourceData (row) {
      this.resourceDialog = true
      this.resourceDialogData = row
      this.toggleSelection(this.resourceDialogData.resourceVos)
    },
    toggleSelection (rows) {
      setTimeout(() => {
        if (!this.$refs || !this.$refs.multipleTable) {
          return
        }
        if (rows) {
          this.allResourceData.forEach(r => {
            rows.forEach(row => {
              if (r.id === row.id) {
                this.$refs.multipleTable.toggleRowSelection(r)
              }
            })
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      }, 0)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    addResource () {
      if (!this.multipleSelection || this.multipleSelection.length === 0) {
        return
      }
      this.resourceDialogData.resourceVos = this.multipleSelection
      this.postRequest('role/addRoleResource', this.resourceDialogData).then((response) => {
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
        this.resourceDialog = false
      }).catch((er) => {
        console.error(er)
      })
    },
    getAllResourceData () {
      this.getRequest('resource/getAllData').then((response) => {
        this.allResourceData = response.data.result
      }).catch((er) => {
        console.error(er)
      })
    }
  },
  mounted: function () {
    const data = {pageNo: 0, size: 10}
    this.getRolePage(data)
    this.getAllResourceData()
  },
  watch: {
    resourceName: {
      handler (val, oldVal) {
        this.toggleSelection(this.resourceDialogData.resourceVos)
      },
      deep: true
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
