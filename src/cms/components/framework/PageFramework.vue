<template>
  <div class="layout-edit pageHeight">
    <el-container v-if="layoutValue==='header-main-vertical'" direction="vertical">
      <el-header :height="height"></el-header>
      <el-main></el-main>
    </el-container>

    <el-container v-if="layoutValue==='header-main-footer-vertical'" direction="vertical">
      <el-header :height="height"></el-header>
      <el-main></el-main>
      <el-footer></el-footer>
    </el-container>

    <el-container v-if="layoutValue==='aside-main-horizontal'" direction="horizontal">
      <el-aside :width="width"></el-aside>
      <el-main></el-main>
    </el-container>

    <el-container v-if="layoutValue==='header-aside-Main'" direction="vertical">
      <el-header :height="height"></el-header>
      <el-container>
        <el-aside :width="width"></el-aside>
        <el-main></el-main>
      </el-container>
    </el-container>

    <el-container v-if="layoutValue==='header-aside-main-footer'" direction="vertical">
      <el-header :height="height"></el-header>
      <el-container>
        <el-aside :width="width"></el-aside>
        <el-container>
          <el-main></el-main>
          <el-footer></el-footer>
        </el-container>
      </el-container>
    </el-container>

    <el-container v-if="layoutValue==='aside-header-main'" direction="horizontal">
      <el-aside :width="width"></el-aside>
      <el-container direction="vertical">
        <el-header :height="height"></el-header>
        <el-main></el-main>
      </el-container>
    </el-container>

    <el-container v-if="layoutValue==='aside-header-main-footer'" direction="horizontal">
      <el-aside :width="width"></el-aside>
      <el-container direction="vertical">
        <el-header :height="height"></el-header>
        <el-main></el-main>
        <el-footer :height="heightBottom"></el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {addEditButton, initDraggable} from '../../js/cmsScript.js'
import {mapGetters} from 'vuex'
export default {
  name: 'PageFramework',
  data () {
    return {}
  },
  mounted: function () {
    addEditButton()
    initDraggable()
  },
  computed: {
    ...mapGetters('framework', {
      height: 'frameworkAttrHeight',
      layoutValue: 'frameworkAttrLayoutValue',
      width: 'frameworkAttrWidth',
      data: 'frameworkAttrData',
      heightBottom: 'frameworkAttrHeightBottom'
    })
  }
}
</script>

<style scoped>
.el-container{
  height: 100%;
}
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
}
</style>
