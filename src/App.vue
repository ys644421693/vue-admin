<template>
  <el-container id="app">
    <el-header>
      <top-menu></top-menu>
    </el-header>
    <router-view></router-view>
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
  .el-header {
    background-color: #293c55;
    color: #333;
    text-align: center;
    line-height: 60px;
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
