<template>
  <el-container style="border-top: 2px solid #E4E7ED">
    <LeftMenu></LeftMenu>
    <el-container>
      <el-main>
        <router-view/>
      </el-main>
      <el-footer>
        <footer-info></footer-info>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
import LeftMenu from '../components/LeftMenu'
import FooterInfo from '../components/FooterInfo'
import store from '../store/eunion/store'
import {getWebSocket} from '../util/Constant'

export default {
  name: 'ContentRouter',
  store,
  components: {FooterInfo, LeftMenu},
  methods: {
    websocket () {
      let ws = getWebSocket()
      ws.onopen = () => {
        ws.send('Holle')
      }
      ws.onmessage = evt => {
        console.log(evt)
        var dt = JSON.parse(evt.data)
        if (dt && dt.type === 1) {
          this.$store.commit('setMenuData', dt.data)
        }
      }
      ws.onclose = function () {
        // 关闭 websocket
        console.log('连接已关闭...')
      }
    }
  },
  mounted: function () {
    this.websocket()
  }
}
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #293c55;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }

  body > .el-container {
    margin-bottom: 0px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>

<style>
  .el-card .el-card__body{
    text-align: center;
  }
  .el-card .el-form-item__content{
    text-align: left;
  }
</style>
