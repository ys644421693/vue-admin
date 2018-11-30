<template>
  <el-row :gutter="20" id="topMenuCss">
    <el-col :span="3" style="text-align: left">
      <span>管控台</span>
    </el-col>
    <el-col :span="15">
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#293c55"
        text-color="#fff"
        active-text-color="#00B8EC">
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3" disabled>消息中心</el-menu-item>
        <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="6" style="text-align: right">
      <el-badge :value="100" :max="200" type="primary" class="item">
        <el-dropdown>
          <el-head-button type="info"
                          url="https://gss0.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/960a304e251f95ca34336f4ac2177f3e6609520c.jpg"
                          size="small" circle></el-head-button>
          <el-dropdown-menu slot="dropdown" class="dropdownReview">
            <el-dropdown-item>黄金糕 <el-badge class="mark" type="primary" :value="100" /></el-dropdown-item>
            <el-dropdown-item>狮子头 </el-dropdown-item>
            <el-dropdown-item>螺蛳粉 </el-dropdown-item>
            <el-dropdown-item>双皮奶 </el-dropdown-item>
            <el-dropdown-item>蚵仔煎 </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-badge>
      <el-badge :value="100" class="item" type="warning">
        <el-button type="info" icon="el-icon-edit" size="mini" circle></el-button>
      </el-badge>
      <el-tooltip class="item" effect="dark" content="login out" placement="bottom">
        <el-button type="danger" icon="el-icon-upload2" size="mini" circle></el-button>
      </el-tooltip>
    </el-col>
  </el-row>
</template>

<script>
import elHeadButton from '../util/HeadPic'

export default {
  name: 'topMenu',
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  components: {elHeadButton}
}
</script>

<style scoped>
  .item {
    margin-right: 20px;
    line-height: normal;
  }

  #topMenuCss{
    box-shadow: 1px 3px 11px rgba(0,0,0,.2);
    -moz-box-shadow: 1px 3px 11px rgba(0,0,0,.2);
    -webkit-box-shadow: 1px 3px 11px rgba(0,0,0,.2);
  }
  .dropdownReview{
    background-color: #F2F6FC;
    border: none;
  }
  .dropdownReview li{
    color: #2d374b;
  }
  .dropdownReview li:hover{
    color: rgb(0, 184, 236);
    background-color: #DCDFE6;
    font-weight: bold;
  }
</style>
