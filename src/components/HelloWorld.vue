<template>
  <div class="hello">
    <el-row>
      <el-col :span="17">
        <el-card class="box-card">
          <ve-line :data="chartData"></ve-line>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card class="box-card" style="text-align: left">
          <calendar></calendar>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import calendar from './Calendar'
import Notification from 'element-ui/packages/notification'
export default {
  name: 'HelloWorld',
  data () {
    this.charSettings = {
      stack: { '用户': ['访问用户', '下单用户'] },
      area: true
    }
    return {
      msg: 'Welcome to Your Vue.js App',
      chartData: {
        columns: ['日期', '访问用户', '下单用户'],
        rows: [
          { '日期': '2018-05-22', '访问用户': 32371, '下单用户': 19810 },
          { '日期': '2018-05-23', '访问用户': 12328, '下单用户': 4398 },
          { '日期': '2018-05-24', '访问用户': 12328, '下单用户': 4398 },
          { '日期': '2018-05-25', '访问用户': 12328, '下单用户': 4398 },
          { '日期': '2018-05-26', '访问用户': 12328, '下单用户': 4398 },
          { '日期': '2018-05-27', '访问用户': 12328, '下单用户': 4398 },
          { '日期': '2018-05-28', '访问用户': 12328, '下单用户': 4398 },
          { '日期': '2018-05-29', '访问用户': 92381, '下单用户': 52910 }
        ]
      },
      demoEvents: [{
        date: '2016/12/15',
        title: 'eat',
        desc: 'longlonglong description'
      },
      {
        date: '2016/11/12',
        title: 'this is a title'
      }]
    }
  },
  methods: {
    open (title, date) {
      this.$notify({
        title: title,
        message: '这是一条警告的提示消息',
        type: 'warning',
        position: 'bottom-right',
        offset: 100,
        duration: 10000
      })
    }
  },
  components: {calendar, Notification},
  mounted () {
    this.open('今日待办', '')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.box-card {
  margin-left: 60px;
  max-height: 600px;
  height: 520px;
}
.clearfix{
  line-height:normal;
}
.clearfix span{
  color: #606266;
  font-weight: bold;
  font-size: medium;
}
.clearfix:before, .clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.el-date-table th{
  max-height: 30px;
}
  .hello{
    min-height: 300px;
  }
</style>
