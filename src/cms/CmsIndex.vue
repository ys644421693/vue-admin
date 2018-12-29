<template>
  <el-container>
    <div class="leftElement">
      <el-menu
        default-active="1-1"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        :collapse="isOpenNav"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">
            <i class="fa-file fa fa-lg"> </i>
            <span>布局</span>
          </template>
          <el-menu-item index="1-1" @click="loadAttr('framework')">布局容器
            <div class="component pageHeight">
              <page-framework></page-framework>
            </div>
          </el-menu-item>
          <el-menu-item @click="loadAttr('row')" index="1-2">布局
            <div class="component rowEdit">
              <el-row-col></el-row-col>
            </div>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
          <i class="fa-navicon fa fa-lg"></i>
          <span slot="title">数据组件</span>
          </template>
          <el-menu-item index="2-1" @click="loadAttr('dataTable')">数据表
            <div class="component">
              <data-table></data-table>
            </div>
          </el-menu-item>
        </el-submenu>
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
      <el-tabs v-model="activeName" @tab-click="handleClick" style="width: 100%; height: 100%">
        <el-tab-pane label="设计页面" name="page" style="height: 100%">
          <div class="edit cms-container">
            <div :is="component"></div>
        </div>
        </el-tab-pane>
        <el-tab-pane label="组件预览" name="componentReview" class="tab_cont">
          <div class="tab_cont">
            <div :is="component"></div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="代码" name="codeReview" class="tab_cont">
          <div class="tab_cont">
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-main>
    <el-aside class="right-attr" width="240px">
      <br/>
      <h1 style="color: #ffffff">属性 <el-button type="danger" icon="el-icon-menu" circle size="mini" @click="showNav"></el-button></h1>
      <hr/>
      <div :is="componentAttr"></div>
    </el-aside>
  </el-container>
</template>

<script>
import './css/cmsCss.css'
import 'jquery-ui/themes/base/draggable.css'
import 'jquery-ui/themes/base/sortable.css'
import {addBut} from './js/cmsScript.js'
import draggable from 'jquery-ui/ui/widgets/draggable'
import sortable from 'jquery-ui/ui/widgets/sortable'
import store from './store/index'
import {mapGetters} from 'vuex'

const PageFramework = r => require.ensure([], () => r(require('./components/framework/PageFramework.vue')), 'PageFramework')
const PageFrameworkAttr = r => require.ensure([], () => r(require('./components/framework/PageFrameworkAttr.vue')), 'PageFrameworkAttr')
const ElRowCol = r => require.ensure([], () => r(require('./components/row/ElRowCol.vue')), 'ElRowCol')
const ElRowAttr = r => require.ensure([], () => r(require('./components/row/ElRowAttr.vue')), 'ElRowAttr')
const dataTable = r => require.ensure([], () => r(require('./components/table/dataTable.vue')), 'dataTable')
const dataTableAttr = r => require.ensure([], () => r(require('./components/table/dataTableAttr.vue')), 'dataTableAttr')
const ElPaginationAttr = r => require.ensure([], () => r(require('./components/pagination/ElPaginationAttr.vue')), 'ElPaginationAttr')
export default {
  name: 'CmsIndex',
  store,
  data () {
    return {
      dialogVisible: false,
      activeName: 'page'
    }
  },
  mounted: function () {
    addBut()
  },
  methods: {
    loadAttr (value) {
      if (value === 'framework') {
        this.$store.dispatch('root/setComponentAttr', 'PageFrameworkAttr')
        this.$store.dispatch('root/setComponent', 'PageFramework')
      } else if (value === 'row') {
        this.$store.dispatch('root/setComponentAttr', 'ElRowAttr')
        this.$store.dispatch('root/setComponent', 'ElRowCol')
      } else if (value === 'dataTable') {
        this.$store.dispatch('root/setComponentAttr', 'dataTableAttr')
        this.$store.dispatch('root/setComponent', 'dataTable')
      }
    },
    showNav () {
      const value = !this.$store.state.root.isOpenNav
      this.$store.dispatch('root/setOpenNav', value)
    },
    handleClick (tab, event) {
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
      isOpenNav: 'getOpenNav',
      component: 'getComponent',
      componentAttr: 'getComponentAttr'
    })
  },
  watch: {
    isOpenNav (val, oldVal) {
    }
  },
  components: {PageFramework, PageFrameworkAttr, draggable, sortable, ElRowCol, ElRowAttr, dataTable, dataTableAttr, ElPaginationAttr}
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
  .leftElement .layout-edit{
    display: none;
  }
  .tab_cont{
    width: 100%;
    height: 100%;
  }
</style>
