<template>
  <el-container>
    <div class="leftElement">
      <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        :collapse="isOpenNav"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">
            <i class="fa-file fa fa-lg"> </i>
            <span>布局</span>
          </template>
          <el-menu-item index="1-3">选项3 <span class="label">拖动</span></el-menu-item>
        </el-submenu>
        <el-menu-item index="2">
          <i class="fa-navicon fa fa-lg"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="fa-navicon fa fa-lg"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="fa-navicon fa fa-lg"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </div>
    <el-main id="containerSet">
      <div class="edit">
        <div :is="componentLayout" :layoutAttr="props"></div>
      </div>
    </el-main>
    <el-aside class="right-attr" width="240px">
      <br/>
      <h1 style="color: #ffffff">属性 <el-button type="danger" icon="el-icon-menu" circle size="mini" @click="showNav"></el-button></h1>
      <hr/>
      <div :is="componentAttr" :attr="props"></div>
      <el-row>
        <el-button type="primary" size="mini" icon="el-icon-view" plain @click="showDialogVisible">预览</el-button>
        <el-button type="success" size="mini" icon="el-icon-edit-outline" plain>代码</el-button>
      </el-row>
    </el-aside>
    <el-dialog title="组件预览" :visible.sync="dialogVisible">
      <div :is="component" :attr="props"></div>
    </el-dialog>
  </el-container>
</template>

<script>
import './css/cmsCss.css'
import 'jquery-ui/themes/base/draggable.css'
import 'jquery-ui/themes/base/sortable.css'
import {addEditButton} from './js/cmsScript.js'
import draggable from 'jquery-ui/ui/widgets/draggable'
import sortable from 'jquery-ui/ui/widgets/sortable'
import store from './store/index'
import {mapGetters} from 'vuex'
const PageFramework = r => require.ensure([], () => r(require('./components/framework/PageFramework.vue')), 'PageFramework')
const PageFrameworkAttr = r => require.ensure([], () => r(require('./components/framework/PageFrameworkAttr.vue')), 'PageFrameworkAttr')
export default {
  name: 'CmsIndex',
  store,
  data () {
    return {
      dialogVisible: false,
      component: 'PageFramework',
      componentLayout: 'PageFramework',
      componentAttr: 'PageFrameworkAttr',
      props: {framework: 'leftHeaderMain'}
    }
  },
  mounted: function () {
    addEditButton()
    $('.edit').sortable({
      revert: true,
      handle: '.layout-drag'
    })
    $('#draggable').draggable({
      connectToSortable: '.edit',
      helper: 'clone',
      revert: 'invalid',
      handle: '.edit .layout-drag'
    })
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    showDialogVisible () {
      this.props.framework = 'leftHeaderMain'
      this.componentLayout = 'PageFramework'
      this.dialogVisible = true
    },
    showNav () {
      const value = !this.$store.state.root.isOpenNav
      this.$store.dispatch('root/setOpenNav', value)
    }
  },
  computed: {
    ...mapGetters('framework', {
      height: 'frameworkAttrHeight',
      layoutValue: 'frameworkAttrLayoutValue',
      width: 'frameworkAttrWidth',
      data: 'frameworkAttrData',
      heightBottom: 'frameworkAttrHeightBottom'
    }),
    ...mapGetters('root', {
      isOpenNav: 'getOpenNav'
    })
  },
  components: {PageFramework, PageFrameworkAttr, draggable, sortable}
}
</script>

<style scoped>
  .edit{
    height: 98%;
    min-height: 300px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    position: relative;
    word-wrap: break-word;
    overflow-x: scroll;
  }
  .el-main {
    color: #333;
    text-align: center;
  }
  .edit:after{
    background-color: #F5F5F5;
    border: 1px solid #DDDDDD;
    border-radius: 4px 0 4px 0;
    color: #9DA0A4;
    content: "Container";
    font-size: 12px;
    font-weight: bold;
    left: -1px;
    padding: 3px 7px;
    position: absolute;
    top: -1px;
  }
  .el-menu{
    height: 100%;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 100%;
  }
  .right-attr{
    background-color: #545c64;
    padding: 20px 5px;
  }
  .leftElement{
    min-height: 300px;
    position:relative;
    border-right: solid 2px #e6e6e6;
    background-color: #293c55
  }
</style>
