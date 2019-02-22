<template>
  <div class="leftElement">
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#293c55"
      text-color="#fff"
      active-text-color="#00B8EC"
      :collapse="isCollapse">
      <div id="menuButton">
        <el-button type="info" icon="el-icon-menu" @click="isCollapse=!isCollapse" size="mini"></el-button>
      </div>
      <nav v-for="menu in menus" :key="menu.index">
        <el-submenu :index="menu.index" v-if="menu.childs.length > 0">
          <template slot="title">
            <i :class="menu.icon"></i>
            <span slot="title" v-show="!isCollapse">{{menu.title}}</span>
          </template>
          <router-link :to="child.view" :key="child.index" v-for="child in menu.childs" v-if="menu.childs.length > 0">
            <el-menu-item :index="child.index">{{child.title}}</el-menu-item>
          </router-link>
        </el-submenu>
        <router-link :to="menu.view" v-if="menu.childs.length == 0">
          <el-menu-item :index="menu.index">
            <i :class="menu.icon"></i>
            <span slot="title">{{menu.title}}</span>
          </el-menu-item>
        </router-link>
      </nav>
    </el-menu>
    <div class="footerElement" v-if="!isCollapse">
      <el-head-button url="https://gss0.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/960a304e251f95ca34336f4ac2177f3e6609520c.jpg"
                      size="normal" circle></el-head-button>
      <div class="userInfo">
        <h2>John Doe</h2>
        <p class="title">CEO & Founder, Example</p>
        <p>Harvard University</p>
      </div>
      <hr style="width: 80%"/>
    </div>
  </div>
</template>

<script>
import elHeadButton from '../util/HeadPic'
import store from '../store/eunion/store'

export default {
  components: {elHeadButton},
  store,
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
          title: '主页信息',
          index: '1',
          icon: 'el-icon-location',
          childs: [{
            title: '产品设置',
            index: '2',
            icon: 'el-icon-menu',
            view: '/product'
          },
          {
            title: '员工信息',
            index: '6',
            icon: 'el-icon-menu',
            view: '/PersonnelInfo'
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
    $('.el-header').show()
    console.log(window.localStorage)
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    loadData: function () {
      this.getRequest('user/getUserInfo').then((response) => {
        console.log(response.data)
      }).catch((er) => {
        console.error(er)
        this.$router.push({path: '/login'})
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
  .footerElement{
    width: 100%;
    text-align: center;
    bottom:60px;
    position:absolute;
    padding-top: 20px;
  }
  .leftElement{
    min-height: 300px;
    position:relative;
    border-right: solid 2px #e6e6e6;
    background-color: #293c55
  }
  .leftElement .el-menu{
    border-right: none;
  }
  .userInfo{
    color: #ffffff;
    line-height: 30px;
    margin-top: 10px;
  }
</style>
