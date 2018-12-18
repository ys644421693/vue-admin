<template>
  <div class="layout-edit">
    <el-container v-if="layoutAttr.framework==='headerMain'">
      <el-header>Header</el-header>
      <el-main>main</el-main>
    </el-container>

    <el-container v-if="layoutAttr.framework==='headerMainFooter'">
      <el-header>Header</el-header>
      <el-main>Main</el-main>
      <el-footer>Footer</el-footer>
    </el-container>

    <el-container v-if="layoutAttr.framework==='navMain'">
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>

    <el-container v-if="layoutAttr.framework==='headNavMain'">
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>

    <el-container v-if="layoutAttr.framework==='headerLeftMainFooter'">
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-container>
          <el-main>Main</el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>

    <el-container v-if="layoutAttr.framework==='leftHeaderMain'">
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>

    <el-container v-if="layoutAttr.framework==='leftHeaderMainFooter'">
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
        <el-footer height="">Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {addEditButton} from '../../js/cmsScript.js'
export default {
  name: 'PageFramework',
  data () {
    return {}
  },
  mounted: function () {
    addEditButton()
    $('.layout-edit').draggable({
      connectToSortable: '.edit',
      helper: 'clone',
      revert: 'invalid',
      handle: '.edit .layout-drag'
    })
  },
  props: {layoutAttr: {}}
}
</script>

<style scoped>
.el-container{
  height: 100%;
}
</style>
