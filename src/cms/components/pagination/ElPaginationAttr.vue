<template>
  <el-form label-width="100px" ref="form" v-model="form">
  </el-form>
</template>

<script>
export default {
  name: 'elPaginationAttr',
  data () {
    return {
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
    layout: {
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
  }
}
</script>

<style scoped>

</style>
