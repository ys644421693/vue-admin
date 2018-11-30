<template>
  <el-container id="app">
    <el-header>
      <top-menu></top-menu>
    </el-header>
    <el-container style="border-top: 2px solid #E4E7ED">
      <LeftMenu></LeftMenu>
      <el-container>
        <el-main>
          <router-view/>
        </el-main>
        <el-footer style="height: 100px">
          <footer-info></footer-info>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>

import LeftMenu from './components/LeftMenu'
import TopMenu from './components/TopMenu'
import FooterInfo from './components/FooterInfo'

export default {
  name: 'App',
  components: {FooterInfo, TopMenu, LeftMenu},
  mounted: function () {
  },
  methods: {
  }
}
</script>
<style>
  .el-header, .el-footer {
    background-color: #293c55;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }

  body > .el-container {
    margin-bottom: 0px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  #app{
    position:absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
    min-height: 600px;
    min-width: 900px;
  }
</style>
