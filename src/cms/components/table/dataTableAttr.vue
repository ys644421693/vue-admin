<template>
  <el-form label-width="100px" ref="form" v-model="form">
    <el-collapse accordion v-model="activeName">
      <el-collapse-item name="row" title="表格属性">
        <el-form-item label="斑马纹">
          <el-switch v-model="stripe" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item label="边框">
          <el-switch v-model="border" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
        <el-form-item label="复选框">
          <el-switch v-model="isCheckBox" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
        <el-form-item label="分页">
          <el-switch v-model="isPagination" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
        <el-form-item label="固定表头">
          <el-input size="mini" v-model="heightHead"></el-input>
        </el-form-item>
        <el-form-item label="最大高度">
          <el-input size="mini" v-model="maxHeight"></el-input>
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item :name="'col' + col.id" :title="'第' + col.id + '列属性'" v-for="col in columns" :key="col.id">
        <el-form-item label="属性名">
          <el-input size="mini" v-model="col.prop"></el-input>
        </el-form-item>
        <el-form-item label="表头名">
          <el-input size="mini" v-model="col.label"></el-input>
        </el-form-item>
        <el-form-item label="宽度">
          <el-input size="mini" v-model="col.width"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-switch v-model="col.sortable" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
        <el-form-item label="固定列">
          <el-form label="列固定">
            <el-select v-model="col.fixed" placeholder="请选择" size="mini">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="removeCol(col.id)" size="mini">删除</el-button>
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
    <el-button @click="addElCol" type="primary" size="mini">添加列</el-button>
  </el-form>
</template>

<script>
export default {
  name: 'dataTableAttr',
  data () {
    return {
      activeName: '',
      options: [{
        value: false,
        label: '不固定'
      }, {
        value: true,
        label: '固定'
      }, {
        value: 'left',
        label: '左固定'
      }, {
        value: 'right',
        label: '右固定'
      }],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  computed: {
    stripe: {
      get () {
        return this.$store.state.elDataTable.stripe
      },
      set (value) {
        this.$store.dispatch('elDataTable/setStripe', value)
      }
    },
    border: {
      get () {
        return this.$store.state.elDataTable.border
      },
      set (value) {
        this.$store.dispatch('elDataTable/setBorder', value)
      }
    },
    rowClass: {
      get () {
        return this.$store.state.elDataTable.rowClass
      },
      set (value) {
        this.$store.dispatch('elDataTable/setRowClass', value)
      }
    },
    heightHead: {
      get () {
        return this.$store.state.elDataTable.height
      },
      set (value) {
        this.$store.dispatch('elDataTable/setHeight', value)
      }
    },
    maxHeight: {
      get () {
        return this.$store.state.elDataTable.maxHeight
      },
      set (value) {
        this.$store.dispatch('elDataTable/setMaxHeight', value)
      }
    },
    sortable: {
      get () {
        return this.$store.state.elDataTable.sortable
      },
      set (value) {
        this.$store.dispatch('elDataTable/setSortable', value)
      }
    },
    isPagination: {
      get () {
        return this.$store.state.elDataTable.isPagination
      },
      set (value) {
        this.$store.dispatch('elDataTable/setIsPagination', value)
      }
    },
    isCheckBox: {
      get () {
        return this.$store.state.elDataTable.isCheckBox
      },
      set (value) {
        this.$store.dispatch('elDataTable/setIsCheckBox', value)
      }
    },
    columns: {
      get () {
        return this.$store.state.elDataTable.columns
      },
      set (value) {
        this.$store.dispatch('elDataTable/setColumns', value)
      }
    }
  },
  methods: {
    addElCol () {
      this.$store.dispatch('elDataTable/addCol')
    },
    removeCol (id) {
      this.$store.dispatch('elDataTable/removeCols', id)
    }
  }
}
</script>

<style scoped>
  .el-collapse-item >>> .el-collapse-item__header {
    background-color: transparent;
    color: #ffffff;
    border-bottom: none;
  }

  .el-collapse-item >>> .el-collapse-item__content {
    background-color: #545c64;
    padding-bottom: 0px;
  }

  .el-collapse {
    border-bottom: none;
    border-top: none;
  }
  .el-collapse-item >>> .el-collapse-item__wrap{
    border-bottom: none;
    background-color: #545c64;
  }
  .el-form-item{
    margin-bottom: 0px;
  }
</style>
