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
          <el-form-item label="姓名">
            <el-input v-model="query.userName" placeholder="姓名" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="身份证">
            <el-input v-model="query.idCard" placeholder="身份证" size="mini"></el-input>
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
            :data="personnelList.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="姓名">
                    <span>{{ props.row.userName }}</span>
                  </el-form-item>
                  <el-form-item label="昵称">
                    <span>{{ props.row.alias }}</span>
                  </el-form-item>
                  <el-form-item label="邮箱">
                    <span>{{ props.row.email }}</span>
                  </el-form-item>
                  <el-form-item label="手机">
                    <span>{{ props.row.tel }}</span>
                  </el-form-item>
                  <el-form-item label="生日">
                    <span>{{ props.row.birthday }}</span>
                  </el-form-item>
                  <el-form-item label="身份证">
                    <span>{{ props.row.idCard }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="工号ID"  prop="id"></el-table-column>
            <el-table-column label="姓名" prop="userName"></el-table-column>
            <el-table-column label="昵称" prop="alias"></el-table-column>
            <el-table-column label="邮箱" prop="email"></el-table-column>
            <el-table-column label="手机" prop="tel"></el-table-column>
            <el-table-column label="生日" prop="birthday"></el-table-column>
            <el-table-column label="身份证" prop="idCard"></el-table-column>
            <el-table-column label="性别" prop="gender">
              <template slot-scope="scope">
                {{scope.row.gender ==='1'?'男':'女'}}
              </template>
            </el-table-column>
            <el-table-column label="状态" prop="state">
              <template slot-scope="scope">
                <el-tag :type="scope.row.state === 1 ? 'success' : 'danger'" disable-transitions size="mini">{{scope.row.state ===1?'在线':'离线'}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="排序" prop="sortNumber"></el-table-column>
            <el-table-column align="center" width="150">
              <template slot="header" slot-scope="scope" class="operaClass">
                <el-button type="primary" size="mini" @click="dialogFormVisible = true">添加员工</el-button>
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
    <el-dialog title="员工信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="personnel" label-position="left" :rules="rules" ref="personnelForm">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="userName">
          <el-input v-model="personnel.userName" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth" prop="alias">
          <el-input v-model="personnel.alias" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="personnel.email" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="tel">
          <el-input v-model="personnel.tel" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="生日" :label-width="formLabelWidth" prop="birthday">
          <el-date-picker v-model="personnel.birthday" type="date" placeholder="选择日期" size="mini" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="身份证" :label-width="formLabelWidth" prop="idCard">
          <el-input v-model="personnel.idCard" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="gender">
          <el-radio-group v-model="personnel.gender">
            <el-radio label=0>女</el-radio>
            <el-radio label=1>男</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="职位" :label-width="formLabelWidth" prop="position">
          <el-input v-model="personnel.position" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="职位描述" :label-width="formLabelWidth" prop="positionDescribe">
          <el-input type="textarea" :rows="2" placeholder="职位描述" v-model="personnel.positionDescribe" size="mini">
          </el-input>
        </el-form-item>
        <br>
        <el-form-item label="主页显示" :label-width="formLabelWidth">
          <el-switch v-model="personnel.showIndex" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item label="创建管理账号" :label-width="formLabelWidth">
          <el-switch v-model="personnel.createName" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item label="员工排序" :label-width="formLabelWidth">
          <el-input-number v-model="personnel.sortNumber" :min="1" :max="10" label="序号" size="mini"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addPersonnelInfo()" size="mini">保 存</el-button>
        <el-button type="danger" size="mini" @click="dialogFormVisible = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'PersonnelInfo',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      personnelList: [],
      rules: {
        name: [
          { required: true, message: '', trigger: 'blur' },
          { min: 2, max: 20, message: '', trigger: 'blur' }
        ]
      },
      search: '',
      formLabelWidth: '120px',
      personnel: {},
      pageTotal: 10,
      dialogFormVisible: false,
      currentPage: 1,
      query: {}
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
        this.deleteRequest('user/deleteData', {id: row.id}).then((response) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          for (var i = 0; i < this.personnelList.length; i++) {
            if (this.personnelList[i].id === row.id) {
              this.personnelList.splice(i, 1)
            }
          }
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
      if (this.query.userName) {
        dataPage.data.userName = this.query.userName
      }
      if (this.query.idCard) {
        dataPage.data.idCard = Number(this.query.idCard)
      }
      this.getPersonnelPage(dataPage)
    },
    getPersonnelPage (data) {
      this.getRequest('user/getPageData', data).then((response) => {
        this.pageTotal = response.data.count
        this.personnelList = response.data.result
      }).catch((er) => {
        console.error(er)
      })
    },
    addPersonnelInfo () {
      this.postRequest('user/addData', this.personnel).then((response) => {
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
        this.handleCurrentChange(this.currentPage)
      }).catch((er) => {
        console.error(er)
      })
    },
    updateData (row) {
      this.dialogFormVisible = true
      this.personnel = row
    },
    queryParam () {
      this.handleCurrentChange(this.currentPage)
    }
  },
  mounted: function () {
    const data = {pageNo: 0, size: 10}
    this.getPersonnelPage(data)
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
