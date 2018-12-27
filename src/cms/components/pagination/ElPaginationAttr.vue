<template>
  <el-form label-width="100px" ref="form" v-model="form">
    <el-form-item label="小型分页">
      <el-switch v-model="small" active-color="#13ce66" inactive-color="#ff4949">
      </el-switch>
    </el-form-item>
    <el-form-item label="背景颜色">
      <el-switch v-model="background" active-color="#13ce66" inactive-color="#ff4949">
      </el-switch>
    </el-form-item>
    <el-form-item label="组件布局">
      <el-checkbox-group v-model="layoutAttrList" @change="layoutCheck">
        <el-checkbox label="total"></el-checkbox>
        <el-checkbox label="sizes"></el-checkbox>
        <el-checkbox label="prev"></el-checkbox>
        <el-checkbox label="pager"></el-checkbox>
        <el-checkbox label="next"></el-checkbox>
        <el-checkbox label="jumper"></el-checkbox>
        <el-checkbox label="->"></el-checkbox>
        <el-checkbox label="slot"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'elPaginationAttr',
  data () {
    return {
      layoutAttrList: [],
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
    small: {
      get () {
        return this.$store.state.paginationModule.small
      },
      set (value) {
        this.$store.dispatch('paginationModule/setSmall', value)
      }
    },
    background: {
      get () {
        return this.$store.state.paginationModule.background
      },
      set (value) {
        this.$store.dispatch('paginationModule/setBackground', value)
      }
    },
    pageSize: {
      get () {
        return this.$store.state.paginationModule.pageSize
      },
      set (value) {
        this.$store.dispatch('paginationModule/setPageSize', value)
      }
    },
    total: {
      get () {
        return this.$store.state.paginationModule.total
      },
      set (value) {
        this.$store.dispatch('paginationModule/setTotal', value)
      }
    },
    pageCount: {
      get () {
        return this.$store.state.paginationModule.pageCount
      },
      set (value) {
        this.$store.dispatch('paginationModule/setPageCount', value)
      }
    },
    pagerCount: {
      get () {
        return this.$store.state.paginationModule.pagerCount
      },
      set (value) {
        this.$store.dispatch('paginationModule/setPagerCount', value)
      }
    },
    currentPage: {
      get () {
        return this.$store.state.paginationModule.currentPage
      },
      set (value) {
        this.$store.dispatch('paginationModule/setCurrentPage', value)
      }
    },
    layoutAttr: {
      get () {
        return this.$store.state.paginationModule.layout
      },
      set (value) {
        this.$store.dispatch('paginationModule/setLayout', value)
      }
    },
    pageSizes: {
      get () {
        return this.$store.state.paginationModule.pageSizes
      },
      set (value) {
        this.$store.dispatch('paginationModule/setPageSizes', value)
      }
    },
    popperClass: {
      get () {
        return this.$store.state.paginationModule.popperClass
      },
      set (value) {
        this.$store.dispatch('paginationModule/setPopperClass', value)
      }
    },
    prevText: {
      get () {
        return this.$store.state.paginationModule.prevText
      },
      set (value) {
        this.$store.dispatch('paginationModule/setPrevText', value)
      }
    },
    nextText: {
      get () {
        return this.$store.state.paginationModule.nextText
      },
      set (value) {
        this.$store.dispatch('paginationModule/setNextText', value)
      }
    },
    disabled: {
      get () {
        return this.$store.state.paginationModule.disabled
      },
      set (value) {
        this.$store.dispatch('paginationModule/setDisabled', value)
      }
    }
  },
  methods: {
    layoutCheck () {
      let attrs = ''
      for (let attr of this.layoutAttrList) {
        attrs = attrs + attr + ','
      }
      attrs = attrs.substr(0, attrs.length - 1)
      this.$store.dispatch('paginationModule/setLayout', attrs)
    }
  }
}
</script>

<style scoped>
  .el-form-item >>>.el-form-item__label{
    color: white;
  }
  .el-form-item >>>.el-checkbox__label{
    color: white;
  }
</style>
