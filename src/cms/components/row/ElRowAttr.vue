<template>
  <el-form label-width="100px" ref="form" v-model="form">
    <el-collapse accordion v-model="activeName">
      <el-collapse-item name="row" title="行属性">
        <el-form-item label="列间隔">
          <el-input-number size="mini" v-model="gutter"></el-input-number>
        </el-form-item>
        <el-form-item label="布局模式">
          <el-input size="mini" v-model="type"></el-input>
        </el-form-item>
        <el-form-item label="水平排列方式">
          <el-input size="mini" v-model="justify"></el-input>
        </el-form-item>
        <el-form-item label="垂直排列方式">
          <el-input size="mini" v-model="align"></el-input>
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item :name="'col' + col.id" :title="'第' + col.id + '列属性'" v-for="col in cols" :key="col.id">
        <el-form-item label="列数">
          <el-input-number size="mini" v-model="col.span"></el-input-number>
        </el-form-item>
        <el-form-item label="偏移数">
          <el-input-number size="mini" v-model="col.offset"></el-input-number>
        </el-form-item>
        <el-form-item label="右移动格数">
          <el-input-number size="mini" v-model="col.push"></el-input-number>
        </el-form-item>
        <el-form-item label="左移动格数">
          <el-input-number size="mini" v-model="col.pull"></el-input-number>
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
  name: 'elRowAttr',
  data () {
    return {
      activeName: 'row',
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
  methods: {
    removeCol (value) {
      this.$store.dispatch('rowModule/removeCols', value)
    },
    addElCol () {
      var count = 0
      for (var col of this.$store.state.rowModule.cols) {
        count = count + col.span + col.offset + col.push + col.pull
      }
      if (count >= 24) {
        return
      }
      this.$store.dispatch('rowModule/addCol')
    }
  },
  computed: {
    gutter: {
      get () {
        return this.$store.state.rowModule.gutter
      },
      set (value) {
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
