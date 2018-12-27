<template>
  <div class="layout-edit">
    <div @click="activeTable">
      <el-table
        :data="tableData"
        :stripe="stripe"
        :border="border"
        :height="heightHead"
        :max-height="maxHeight"
        :row-class-name="tableRowClassName"
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column type="selection" width="55" v-if="isCheckBox">
        </el-table-column>
        <el-table-column v-for="col in columns" :prop="col.prop" :type="col.type" :label="col.label" :width="col.width" :key="col.id" :sortable="col.sortable">
        </el-table-column>
      </el-table>
    </div>
    <el-pagination-set v-if="isPagination"></el-pagination-set>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import ElPaginationSet from '../pagination/ElPaginationSet'

export default {
  name: 'dataTable',
  components: {ElPaginationSet},
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      multipleSelection: []
    }
  },
  methods: {
    tableRowClassName ({row, rowIndex}) {
      if (row.state === 1) {
        return 'warning-row'
      } else if (row.state === 1) {
        return 'success-row'
      } else if (row.state === 1) {
        return 'fail-row'
      } else if (row.state === 0) {
        return 'wait-row'
      }
      return ''
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    activeTable () {
      this.$store.dispatch('root/setComponentAttr', 'dataTableAttr')
    }
  },
  computed: {
    ...mapGetters('elDataTable', {
      server: 'getServer',
      stripe: 'getStripe',
      rowClass: 'getRowClass',
      border: 'getBorder',
      heightHead: 'getHeight',
      maxHeight: 'getMaxHeight',
      sortable: 'getSortable',
      isPagination: 'getIsPagination',
      isCheckBox: 'getIsCheckBox',
      columns: 'getColumns'
    })
  }
}
</script>

<style scoped>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .el-table .fail-row {
    background: #F77373;
  }
  .el-table .wait-row {
    background: #409EFF;
  }
</style>
