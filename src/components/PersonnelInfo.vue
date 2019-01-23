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
            <el-input v-model="query.name" placeholder="姓名" size="mini"></el-input>
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
                    <span>{{ props.row.name }}</span>
                  </el-form-item>
                  <el-form-item label="昵称">
                    <span>{{ props.row.alias }}</span>
                  </el-form-item>
                  <el-form-item label="邮箱">
                    <span>{{ props.row.email }}</span>
                  </el-form-item>
                  <el-form-item label="手机">
                    <span>{{ props.row.phone }}</span>
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
            <el-table-column label="姓名" prop="name"></el-table-column>
            <el-table-column label="昵称" prop="alias"></el-table-column>
            <el-table-column label="邮箱" prop="email"></el-table-column>
            <el-table-column label="手机" prop="phone"></el-table-column>
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
          <el-pagination background layout="prev, pager, next" :total="1000">
          </el-pagination>
        </el-card>
    </el-row>
    <el-dialog title="员工信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="personnel" label-position="left" :rules="rules" ref="personnelForm">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="personnel.name" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth" prop="alias">
          <el-input v-model="personnel.alias" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="personnel.email" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="personnel.phone" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="生日" :label-width="formLabelWidth" prop="birthday">
          <el-date-picker v-model="personnel.birthday" type="date" placeholder="选择日期" size="mini">
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
          <el-switch v-model="personnel.isShowIndex" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item label="员工排序" :label-width="formLabelWidth">
          <el-input-number v-model="personnel.sortNumber" :min="1" :max="10" label="序号" size="mini"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveInfo('personnelForm')" size="mini">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      personnelList: [{
        id: '12987122',
        name: 'test1',
        alias: 'alice',
        email: '644421693@qq.com',
        phone: '13889536179',
        birthday: '1998-02-06',
        idCard: '王小虎夫妻店',
        gender: '1',
        position: '开发',
        positionDescribe: '开发员工',
        isShowIndex: 1,
        sortNumber: 1
      }, {
        id: '12987123',
        name: 'test1',
        alias: 'alice',
        email: '644421693@qq.com',
        phone: '13889536179',
        birthday: '1998-02-06',
        idCard: '王小虎夫妻店',
        gender: '1',
        position: '开发',
        positionDescribe: '开发员工',
        isShowIndex: 1,
        sortNumber: 1
      }, {
        id: '12987125',
        name: 'test1',
        alias: 'alice',
        email: '644421693@qq.com',
        phone: '13889536179',
        birthday: '1998-02-06',
        idCard: '王小虎夫妻店',
        gender: '1',
        position: '开发',
        positionDescribe: '开发员工',
        isShowIndex: 1,
        sortNumber: 1
      }, {
        id: '12987126',
        name: 'test1',
        alias: 'alice',
        email: '644421693@qq.com',
        phone: '13889536179',
        birthday: '1998-02-06',
        idCard: '王小虎夫妻店',
        gender: '0',
        position: '开发',
        positionDescribe: '开发员工',
        isShowIndex: 1,
        sortNumber: 1
      }],
      rules: {
        name: [
          { required: true, message: '', trigger: 'blur' },
          { min: 2, max: 20, message: '', trigger: 'blur' }
        ]
      },
      search: '',
      formLabelWidth: '120px',
      personnel: {},
      dialogFormVisible: false,
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
        this.$message({
          type: 'success',
          message: '删除成功!'
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
    saveInfo (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
          this.dialogFormVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    updateData (row) {
      this.dialogFormVisible = true
      this.personnel = row
    },
    queryParam () {
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
