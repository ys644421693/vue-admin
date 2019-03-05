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
          <el-tree
            :data="systemMenuNodeList"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <el-button
                  type="text"
                  size="mini"
                  @click="() => append(data)">
                  Append
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  @click="() => remove(node, data)">
                  Delete
                </el-button>
              </span>
            </span>
          </el-tree>
        </el-card>
    </el-row>
    <el-dialog title="商品分类信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="SystemMenuNode" label-position="left">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="SystemMenuNode.title" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="分类排序" :label-width="formLabelWidth">
          <el-input-number v-model="SystemMenuNode.orderId" autocomplete="off" size="mini"></el-input-number>
        </el-form-item>
        <el-form-item label="父分类" :label-width="formLabelWidth">
          <el-select v-model="SystemMenuNode.SystemMenuNode" placeholder="请选择" size="mini">
            <el-option value="0" label="基本分类"></el-option>
            <el-option v-for="item in classAllData" :key="item.id" :label="item.title" :value="item">
            </el-option>
          </el-select>
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
export default {
  name: 'SystemMenuNodeSetting',
  data () {
    return {
      systemMenuNodeList: [],
      search: '',
      formLabelWidth: '120px',
      SystemMenuNode: {},
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
        this.deleteRequest('menuNode/deleteData', {id: row.id}).then((response) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          for (var i = 0; i < this.systemMenuNodeList.length; i++) {
            if (this.systemMenuNodeList[i].id === row.id) {
              this.systemMenuNodeList.splice(i, 1)
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
      this.getSystemMenuNodePage(dataPage)
    },
    updateData (row) {
      this.dialogFormVisible = true
      this.systemMenuNode = row
    },
    queryParam () {
      this.handleCurrentChange(this.currentPage)
    },
    getSystemMenuNode () {
      this.getRequest('menuNode/getAllData').then((response) => {
        this.classAllData = response.data
      }).catch((er) => {
        console.error(er)
      })
    },
    addSystemMenuNode () {
      this.postRequest('menuNode/addData', this.systemMenuNode).then((response) => {
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
        this.handleCurrentChange(this.currentPage)
      }).catch((er) => {
        console.error(er)
      })
    },
    append(data) {
      const newChild = { id: id++, label: 'testtest', children: [] };
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newChild);
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    }
  },
  mounted: function () {
    this.getSystemMenuNode()
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
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
