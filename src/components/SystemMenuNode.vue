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
          <el-form-item label="角色">
            <el-select v-model="role" filterable clearable placeholder="请选择" size="mini" @change="setMenuSelect">
              <el-option v-for="item in roleAllData" :key="item.id" :label="item.roleName" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="add" size="mini">新建菜单</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-row>
    <el-row>
        <el-card class="box-card">
          <el-col :span="12" :offset="6">
            <el-tree
            :data="systemMenuNodeList"
            show-checkbox
            node-key="id"
            default-expand-all
            ref="tree"
            :expand-on-click-node="false">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{data.nodeName}}</span>
              <span>
                <span>{{'序号：' + data.sortIndex}}</span>
                <el-button
                  type="text"
                  size="mini"
                  @click="updateData(node, data)">
                  修改节点
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  @click="deleteData(node, data)">
                  删除节点
                </el-button>
              </span>

            </span>
          </el-tree>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" size="mini" @click="saveRoleMenuNode"> 保 存 </el-button>
          </el-col>
        </el-card>
    </el-row>
    <el-dialog title="新建菜单" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="systemMenuNode" size="mini" :label-width="formLabelWidth">
        <el-form-item label="父类菜单" >
          <el-select v-model="tempId" filterable clearable placeholder="不选择为根路径" size="mini">
            <el-option v-for="item in systemMenuNodeAll" :key="item.id" :label="item.nodeName" :value="item.id" v-if="item.id != systemMenuNode.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单名称" >
          <el-input v-model="systemMenuNode.nodeName" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="菜单图标" >
          <el-input v-model="systemMenuNode.icon" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="页面路径" >
          <el-select v-model="systemMenuNode.viewPath" filterable clearable placeholder="页面路径" size="mini">
            <el-option v-for="item in pagePath" :key="item.id" :label="item.path" :value="item.path">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单排序" >
          <el-input-number v-model="systemMenuNode.sortIndex" autocomplete="off" size="mini"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addSystemMenuNode()" size="mini">保 存</el-button>
        <el-button type="danger" size="mini" @click="dialogFormVisible = false">返 回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
let id = 1000
export default {
  name: 'SystemMenuNodeSetting',
  data () {
    return {
      systemMenuNodeList: [],
      search: '',
      role: '',
      formLabelWidth: '120px',
      systemMenuNode: {},
      systemMenuNodeAll: [],
      dialogFormVisible: false,
      roleAllData: [],
      pagePath: [],
      tempId: ''
    }
  },
  methods: {
    deleteData (row, data) {
      if (data.children) {
        this.$message({
          type: 'warning',
          message: '请先删除子菜单!'
        })
        return
      }
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.deleteRequest('menuNode/deleteData', {id: data.id}).then((response) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getSystemMenuNode()
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
    updateData (node, row) {
      console.log(row)
      this.dialogFormVisible = true
      this.systemMenuNode = row
      // this.tempId = row.id
    },
    getSystemMenuNode () {
      this.getRequest('menuNode/getAllData').then((response) => {
        this.systemMenuNodeAll = response.data.result.sort(function (a, b) {
          if (a.sortIndex > b.sortIndex) {
            return 1
          } else if (a.sortIndex < b.sortIndex) {
            return -1
          } else {
            return 0
          }
        })
        this.systemMenuNodeList = []
        if (response.data.result) {
          this.systemMenuNodeAll.forEach(dt => {
            if (!dt.parentId) {
              dt.label = dt.nodeName
              this.systemMenuNodeList.push(dt)
              this.dealMenuData(dt)
            }
          })
        }
      }).catch((er) => {
        console.error(er)
      })
    },
    dealMenuData (parent) {
      this.systemMenuNodeAll.forEach(dt => {
        if (dt.parentId && parent.id === dt.parentId.id) {
          if (!parent.children) {
            parent.children = []
          }
          dt.label = dt.nodeName
          parent.children.push(dt)
          this.dealMenuData(dt)
        }
      })
    },
    getRoleData () {
      this.getRequest('role/getAllData').then((response) => {
        this.roleAllData = response.data.result
      }).catch((er) => {
        console.error(er)
      })
    },
    addSystemMenuNode () {
      this.systemMenuNodeAll.forEach(dt => {
        if (this.tempId === dt.id) {
          this.systemMenuNode.parentId = dt
        }
      })
      this.postRequest('menuNode/addData', this.systemMenuNode).then((response) => {
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
        this.getSystemMenuNode()
        this.systemMenuNode = {}
        this.dialogFormVisible = false
      }).catch((er) => {
        console.error(er)
      })
    },
    getPagePath () {
      this.$router.options.routes.forEach(dt => {
        if (dt.children) {
          this.dealPagePath(dt.children)
        } else {
          id++
          const t = {id: id, path: dt.path}
          this.pagePath.push(t)
        }
      })
    },
    dealPagePath (data) {
      if (data.children) {
        this.dealPagePath(data.children)
      } else {
        data.forEach(dt => {
          id++
          const t = {id: id, path: dt.path}
          this.pagePath.push(t)
        })
      }
    },
    add () {
      this.dialogFormVisible = true
      this.systemMenuNode = {}
    },
    setMenuSelect () {
      if (this.role) {
        var temp = {}
        this.roleAllData.forEach(r => {
          if (this.role === r.id) {
            temp = r
          }
        })
        var ids = []
        temp.systemMenuNodeVos.forEach(node => {
          ids.push(node.id)
        })
        this.$refs.tree.setCheckedKeys(ids)
      } else {
        this.$refs.tree.setCheckedKeys([])
      }
    },
    saveRoleMenuNode () {
      if (!this.role) {
        this.$message({
          type: 'warning',
          message: '请先选择角色!'
        })
        return
      }
      var temp = {}
      this.roleAllData.forEach(r => {
        if (this.role === r.id) {
          temp = r
        }
      })
      temp.systemMenuNodeVos = this.$refs.tree.getCheckedNodes()
      this.postRequest('role/addRoleMenuNode', temp).then((response) => {
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
      }).catch((er) => {
        console.error(er)
      })
    }
  },
  mounted: function () {
    this.getSystemMenuNode()
    this.getRoleData()
    this.getPagePath()
  }
}
</script>
<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .el-tree {
    margin-bottom: 15px;
  }
</style>
<!-- Add 'scoped' attribute to limit CSS to this component only -->
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
