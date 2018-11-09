<template>
  <el-menu
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#252a2f"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isCollapse">
    <div id="menuButton">
      <el-button type="info" icon="el-icon-menu" @click="isCollapse=!isCollapse" size="mini"></el-button>
    </div>
    <nav v-for="menu in menus" :key="menu.index">
    <el-submenu :index="menu.index"   v-if="menu.childs.length > 0" >
      <template slot="title">
        <i :class="menu.icon"></i>
        <span slot="title" v-show="!isCollapse">{{menu.title}}</span>
      </template>
      <router-link :to="child.view"  :key="child.index" v-for="child in menu.childs" v-if="menu.childs.length > 0">
        <el-menu-item :index="child.index">{{child.title}}</el-menu-item>
      </router-link>
    </el-submenu>
    <router-link :to="menu.view"  v-if="menu.childs.length == 0">
      <el-menu-item :index="menu.index">
        <i :class="menu.icon"></i>
        <span slot="title">{{menu.title}}</span>
      </el-menu-item>
    </router-link>
    </nav>
  </el-menu>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: false,
      menus: [
        {
          title: '首页',
          index: '6',
          icon: 'el-icon-menu',
          view: '/',
          childs: []
        },
        {
          title: '导航一',
          index: '1',
          icon: 'el-icon-location',
          childs: [{
            title: '导航er',
            index: '2',
            icon: 'el-icon-menu',
            view: '/home/first'
          }]
        },
        {
          title: '导航2',
          index: '3',
          icon: 'el-icon-location',
          childs: [{
            title: '导航er',
            index: '4',
            icon: 'el-icon-menu',
            view: '/home/second'
          }]
        },
        {
          title: '导航3',
          index: '5',
          icon: 'el-icon-menu',
          view: '/home/three',
          childs: []
        }
      ]
    }
  },
  name: 'LeftMenu',
  mounted: function () {
    this.loadData()
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    loadData: function () {
      this.$http.get('http://www.baidu.com', {}).then((response) => {
        console.log(response.data)
      })
    }
  }
}
</script>

<style scoped>
  #menuButton {
    margin: 10px 20%;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
  a:hover{
    text-decoration:none;
  }
</style>
