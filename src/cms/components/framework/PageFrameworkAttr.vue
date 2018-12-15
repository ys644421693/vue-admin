<template>
  <el-form label-width="100px" ref="form" v-model="form">
    <el-form-item label="布局类型">
      <el-select placeholder="请选择" size="mini" v-model="layoutValue">
        <el-option
          :key="item.value"
          :label="item.label"
          :value="item.value"
          v-for="item in layout">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="子元素排列">
      <el-select placeholder="请选择" size="mini" v-model="directionValue">
        <el-option
          :key="item.value"
          :label="item.label"
          :value="item.value"
          v-for="item in direction">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="顶栏高度">
        <el-input v-model="height" size="mini"></el-input>
    </el-form-item>
    <el-form-item label="侧栏宽度">
        <el-input v-model="width" size="mini"></el-input>
    </el-form-item>
    <el-form-item label="底栏高度">
        <el-input v-model="heightBottom" size="mini"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'PageFrameworkAttr',
  data () {
    return {
      layout: [{
        value: 'header-main-vertical',
        label: 'headerMainVertical'
      }, {
        value: 'header-main-footer-vertical',
        label: 'headerMainFooterVertical'
      }, {
        value: 'aside-main-horizontal',
        label: 'asideMainHorizontal'
      }, {
        value: 'header-aside-Main',
        label: 'headerAsideMain'
      }, {
        value: 'header-aside-main-footer',
        label: 'headerAsideMainFooter'
      }, {
        value: 'aside-header-main',
        label: 'asideHeaderMain'
      }, {
        value: 'aside-header-main-footer',
        label: 'asideHeaderMainFooter'
      }],
      direction: [{
        value: 'horizontal ',
        label: '水平'
      }, {
        value: 'vertical',
        label: '垂直'
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
    heightBottom: {
      get () {
        return this.$store.state.frameworkAttr.heightBottom
      },
      set (value) {
        this.$store.dispatch({
          type: 'updateFrameworkAttr',
          key: 'FRAMEWORK_ATTR_HEIGHTBOTTOM',
          value: value
        })
      }
    },
    height: {
      get () {
        return this.$store.state.frameworkAttr.height
      },
      set (value) {
        this.$store.dispatch({
          type: 'updateFrameworkAttr',
          key: 'FRAMEWORK_ATTR_HEIGHT',
          value: value
        })
      }
    },
    layoutValue: {
      get () {
        return this.$store.state.frameworkAttr.layoutValue
      },
      set (value) {
        this.$store.dispatch({
          type: 'updateFrameworkAttr',
          key: 'FRAMEWORK_ATTR_LAYOUTVALUE',
          value: value
        })
      }
    },
    directionValue: {
      get () {
        return this.$store.state.frameworkAttr.directionValue
      },
      set (value) {
        this.$store.dispatch({
          type: 'updateFrameworkAttr',
          key: 'FRAMEWORK_ATTR_DIRECTIONVALUE',
          value: value
        })
      }
    },
    width: {
      get () {
        return this.$store.state.frameworkAttr.width
      },
      set (value) {
        this.$store.dispatch({
          type: 'updateFrameworkAttr',
          key: 'FRAMEWORK_ATTR_WIDTH',
          value: value
        })
      }
    }
  }
}
</script>

<style scoped>
  .el-form-item {
    margin-bottom: 0px;
  }
</style>
//影响全局样式
<style>
  .el-form-item__label {
    color: white;
  }
</style>
