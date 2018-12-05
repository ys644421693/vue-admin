<template>
  <el-container>
    <el-aside width="210px">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">
            <i class="fa-file fa fa-lg"> </i>
            <span>布局</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
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
    </el-aside>
    <el-main>
      <div class="edit">
      </div>
    </el-main>
    <el-aside class="right-attr" width="210px">
      <br/>
      <h1 style="color: #ffffff">属性</h1>
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
const PageFramework = r => require.ensure([], () => r(require('./components/framework/PageFramework.vue')), 'PageFramework')
const PageFrameworkAttr = r => require.ensure([], () => r(require('./components/framework/PageFrameworkAttr.vue')), 'PageFrameworkAttr')
export default {
  name: 'CmsIndex',
  data () {
    return {
      dialogVisible: false,
      component: 'PageFramework',
      componentAttr: 'PageFrameworkAttr',
      props: {attr: ''}
    }
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
      this.component = 'PageFramework'
      this.dialogVisible = true
    }
  },
  components: {PageFramework, PageFrameworkAttr}
}
</script>

<style scoped>
  .edit{
    height: 70%;
    min-height: 300px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    position: relative;
    word-wrap: break-word;
  }
  .el-main {
    background-color: #F2F6FC;
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
  .right-attr{
    background-color: #545c64;
    padding: 20px 5px;
  }
</style>
