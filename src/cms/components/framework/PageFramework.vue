<template>
  <div>
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
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
    {{layoutAttr}}
  </div>
</template>

<script>
export default {
  name: 'PageFramework',
  data () {
    return {}
  },
  props: {layoutAttr: {
    framework: 'headerMain'
  }}
}
</script>

<style scoped>

</style>
