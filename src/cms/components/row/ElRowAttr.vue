<template>
  <el-form label-width="100px" ref="form" v-model="form">
    <el-collapse accordion v-model="activeName">
      <el-collapse-item name="1" title="row属性">
        <el-form-item label="顶栏高度">
          <el-input size="mini" v-model="gutter"></el-input>
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item name="2" title="col属性">
        <el-form-item label="顶栏高度">
          <el-input size="mini" v-model="tag"></el-input>
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
  </el-form>
</template>

<script>
export default {
  name: 'elRowAttr',
  data () {
    return {
      activeName: '1',
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
    gutter: {
      get () {
        return this.$store.state.rowModule.gutter
      },
      set (value) {
        console.log(this.$store)
        this.$store.dispatch('rowModule/setGutter', value)
      }
    },
    type: {
      get () {
        return this.$store.state.rowModule.type
      },
      set (value) {
        this.$store.dispatch('rowModule/setType', value)
      }
    },
    justify: {
      get () {
        return this.$store.state.rowModule.justify
      },
      set (value) {
        this.$store.dispatch('rowModule/setJustify', value)
      }
    },
    align: {
      get () {
        return this.$store.state.rowModule.align
      },
      set (value) {
        this.$store.dispatch('rowModule/setAlign', value)
      }
    },
    tag: {
      get () {
        return this.$store.state.rowModule.tag
      },
      set (value) {
        this.$store.dispatch('rowModule/setTag', value)
      }
    },
    cols: {
      get () {
        return this.$store.state.rowModule.cols
      },
      set (value) {
        this.$store.dispatch('rowModule/setCols', value)
      }
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
