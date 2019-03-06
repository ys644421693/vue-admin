<template>
  <div class="leftElement">
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#293c55"
      text-color="#fff"
      :unique-opened="true"
      active-text-color="#00B8EC"
      :collapse="isCollapse">
      <div id="menuButton">
        <el-button type="info" icon="el-icon-menu" @click="isCollapse=!isCollapse" size="mini"></el-button>
      </div>
      <nav v-for="menu in systemMenuNodeList" :key="menu.id">
        <el-submenu :index="menu.id+ ''" v-if="menu.children">
          <template slot="title">
            <i :class="menu.icon"></i>
            <span slot="title" v-show="!isCollapse">{{menu.nodeName}}</span>
          </template>
          <router-link :to="child.viewPath" :key="child.id" v-for="child in menu.children" v-if="menu.children">
            <el-menu-item :index="child.id + ''">{{child.nodeName}}</el-menu-item>
          </router-link>
        </el-submenu>
        <router-link :to="menu.viewPath" v-if="!menu.children">
          <el-menu-item :index="menu.id + ''">
            <i :class="menu.icon"></i>
            <span slot="title">{{menu.nodeName}}</span>
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
      systemMenuNodeList: [],
      systemMenuNodeAll: []
    }
  },
  name: 'LeftMenu',
  mounted: function () {
    this.loadData()
    $('.el-header').show()
    this.getSystemMenuNode()
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
    },
    getSystemMenuNode () {
      this.getRequest('menuNode/getAllDataByRole').then((response) => {
        this.systemMenuNodeAll = response.data.result.sort(function (a, b) {
          if (a.sortIndex > b.sortIndex) {
            return 1
          } else if (a.sortIndex < b.sortIndex) {
            return -1
          } else {
            return 0
          }
        })
        this.systemMenuNodeList = []
        if (response.data.result) {
          this.systemMenuNodeAll.forEach(dt => {
            if (!dt.parentId) {
              this.systemMenuNodeList.push(dt)
              this.dealMenuData(dt)
            }
          })
        }
      }).catch((er) => {
        console.error(er)
      })
    },
    dealMenuData (parent) {
      this.systemMenuNodeAll.forEach(dt => {
        if (dt.parentId && parent.id === dt.parentId.id) {
          if (!parent.children) {
            parent.children = []
          }
          parent.children.push(dt)
          this.dealMenuData(dt)
        }
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
