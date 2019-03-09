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
          <el-col :span="8" :offset="8">
            <el-form :model="merchant" :label-width="formLabelWidth" size="mini">
              <el-form-item label="公司名称" prop="merchantName">
                <el-input v-model="merchant.merchantName" autocomplete="off" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="merchant.email" autocomplete="off" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="法人姓名" prop="userName">
                <el-input v-model="merchant.userName" autocomplete="off" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="法人身份证" prop="idCard">
                <el-input v-model="merchant.idCard" autocomplete="off" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="手机号码" prop="mobilePhone">
                <el-input v-model="merchant.mobilePhone" autocomplete="off" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="网站名称">
                <el-input v-model="merchant.webSiteName" autocomplete="off" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="公司网址" >
                <el-input v-model="merchant.webSite" autocomplete="off" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="营业执照号" >
                <el-input v-model="merchant.businessLicenseNumber" autocomplete="off" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="组织机构代码号" >
                <el-input v-model="merchant.organizationalCode" autocomplete="off" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="税务登记号" >
                <el-input v-model="merchant.taxRegistrationNumber" autocomplete="off" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="成立日期" prop="creatDate">
                <el-date-picker v-model="merchant.creatDate" type="date" placeholder="选择日期" size="mini" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="邮编" >
                <el-input v-model="merchant.postcodes" autocomplete="off" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="ICP备案号" >
                <el-input v-model="merchant.ICPRecordNumber" autocomplete="off" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="公司地址" >
                <el-input v-model="merchant.address" autocomplete="off" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="1级行业" >
                <el-input v-model="merchant.firstIndustry" autocomplete="off" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="2级行业" >
                <el-input v-model="merchant.secondIndustry" autocomplete="off" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="备注" >
                <el-input v-model="merchant.back" autocomplete="off" size="mini"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="addMerchant" size="mini">保 存</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-card>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'MerchantInfo',
  data () {
    return {
      formLabelWidth: '120px',
      merchant: {}
    }
  },
  methods: {
    getMerchant () {
      this.getRequest('merchant/getMerchant').then((response) => {
        this.merchant = response.data.result
        if (!this.merchant) {
          this.merchant = {}
        }
      }).catch((er) => {
        console.error(er)
      })
    },
    addMerchant () {
      this.postRequest('merchant/addMerchant', this.merchant).then((response) => {
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
    this.getMerchant()
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
