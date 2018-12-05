<template>
  <div>
    <el-container v-if="attr.framework==='headerMain'">
      <el-header>Header</el-header>
      <el-main>main</el-main>
    </el-container>

    <el-container v-if="attr.framework==='headerMainFooter'">
      <el-header>Header</el-header>
      <el-main>Main</el-main>
      <el-footer>Footer</el-footer>
    </el-container>

    <el-container v-if="attr.framework==='navMain'">
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>

    <el-container v-if="attr.framework==='headNavMain'">
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>

    <el-container v-if="attr.framework==='headerLeftMainFooter'">
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-container>
          <el-main>Main</el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>

    <el-container v-if="attr.framework==='leftHeaderMain'">
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>

    <el-container v-if="attr.framework==='leftHeaderMainFooter'">
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'PageFramework',
  props: {
    attr: {}
  }
}
</script>

<style scoped>

</style>
