<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    @prev-click="prevClick"
    @next-click="nextClick"
    :current-page="currentPage"
    :page-sizes="[10, 20, 30, 40]"
    :page-size="100"
    layout="total, sizes, prev, pager, next, jumper"
    :total="400">
  </el-pagination>
</template>

<script>
export default {
  name: 'elPaginationSet',
  data () {
    return {
      currentPage: 1
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    prevClick (val) {
      console.log(`当前页: ${val}`)
    },
    nextClick (val) {
      console.log(`当前页: ${val}`)
    },
    activePagination (val) {
      this.$emit('componentAttr', 'elPaginationAttr')
    }
  }
}
</script>

<style scoped>

</style>
