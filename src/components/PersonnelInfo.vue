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
      <el-card class="box-card" v-if="!dialogFormVisible">
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
        <el-card class="box-card">
          <el-row v-if="!dialogFormVisible">
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
          </el-row>
          <el-row v-if="dialogFormVisible">
            <el-col :span="8" :offset="8">
              <el-form :model="personnel" :rules="rules" size="mini" ref="personnelForm" :label-width="formLabelWidth">
                <el-form-item label="姓名"  prop="userName">
                  <el-input v-model="personnel.userName" autocomplete="off" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="昵称"  prop="alias">
                  <el-input v-model="personnel.alias" autocomplete="off" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="邮箱"  prop="email">
                  <el-input v-model="personnel.email" autocomplete="off" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="电话"  prop="tel">
                  <el-input v-model="personnel.tel" autocomplete="off" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="生日"  prop="birthday">
                  <el-date-picker v-model="personnel.birthday" type="date" placeholder="选择日期" size="mini" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="身份证"  prop="idCard">
                  <el-input v-model="personnel.idCard" autocomplete="off" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="性别"  prop="gender">
                  <el-radio-group v-model="personnel.gender">
                    <el-radio label=0>女</el-radio>
                    <el-radio label=1>男</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="职位"  prop="position">
                  <el-input v-model="personnel.position" autocomplete="off" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="职位描述"  prop="positionDescribe">
                  <el-input type="textarea" :rows="2" placeholder="职位描述" v-model="personnel.positionDescribe" size="mini">
                  </el-input>
                </el-form-item>
                <br>
                <el-form-item label="主页显示" >
                  <el-switch v-model="personnel.showIndex" active-color="#13ce66" inactive-color="#ff4949">
                  </el-switch>
                </el-form-item>
                <el-form-item label="创建管理账号" >
                  <el-switch v-model="personnel.createName" active-color="#13ce66" inactive-color="#ff4949">
                  </el-switch>
                </el-form-item>
                <el-form-item label="员工排序" >
                  <el-input-number v-model="personnel.sortNumber" :min="1" :max="10" label="序号" size="mini"></el-input-number>
                </el-form-item>
                <el-form-item label="头像图片" >
                  <el-upload
                    :action="uploadPath"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :with-credentials="true"
                    :on-success="uploadSuccess"
                    :multiple="false"
                    :limit="1"
                    accept="image/png,image/gif,image/jpg,image/jpeg">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="addPersonnelInfo()" size="mini">保 存</el-button>
                  <el-button type="danger" size="mini" @click="dialogFormVisible = false">关 闭</el-button>
                </el-form-item>
              </el-form>

            </el-col>
          </el-row>
        </el-card>
  </div>
</template>

<script>
import store from '../store/eunion/store'
export default {
  name: 'PersonnelInfo',
  store,
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
      query: {},
      dialogImageUrl: '',
      dialogVisible: false,
      uploadPath: this.$store.state.baseUrl + 'fileUpload/singleFileUpload?type=1'
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
    },
    uploadSuccess (response, file, fileList) {
      this.personnel.headUrl = response.result
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
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
  .el-dialog__wrapper >>> .el-dialog__body {
    height: auto;
  }

  .box-card h3{
    text-align: left;
  }
</style>
