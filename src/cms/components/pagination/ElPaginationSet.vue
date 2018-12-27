<template>
  <div @click="activePagination" style="margin-top: 10px">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @prev-click="prevClick"
      @next-click="nextClick"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      :layout="layoutAttr"
      :background="backgroundAttr"
      :small="small"
      :total="400">
    </el-pagination>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

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
    activePagination () {
      this.$store.dispatch('root/setComponentAttr', 'ElPaginationAttr')
    }
  },
  computed: {
    ...mapGetters('paginationModule', {
      layoutAttr: 'getLayout',
      small: 'getSmall',
      backgroundAttr: 'getBackground'
    })
  }
}
</script>

<style scoped>

</style>
