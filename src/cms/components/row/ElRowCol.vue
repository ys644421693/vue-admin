<template>
  <div class="layout-edit">
    <el-row :gutter="gutter">
      <el-col v-for="col in cols" :key="col.id" :span="col.span" :offset="col.offset" :push="col.push" :pull="col.pull" class="grid-content bg-purple"></el-col>
    </el-row>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'elRowCol',
  computed: {
    ...mapGetters('rowModule', {
      gutter: 'getGutter',
      type: 'getType',
      justify: 'getJustify',
      align: 'getAlign',
      tag: 'getTag',
      cols: 'getCols'
    })
  }
}
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 70px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
