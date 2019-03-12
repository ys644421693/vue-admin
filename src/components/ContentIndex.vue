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

export default {
  name: 'ContentRouter',
  store,
  components: {FooterInfo, LeftMenu},
  methods: {
    websocket () {
      let ws = new WebSocket('ws://localhost:8011/chat/1/client')
      ws.onopen = () => {
        // Web Socket 已连接上，使用 send() 方法发送数据
        console.log('数据发送中...')
        ws.send('Holle')
        console.log('数据发送完成')
      }
      ws.onmessage = evt => {
        console.log('数据已接收...')
      }
      ws.onclose = function () {
        // 关闭 websocket
        console.log('连接已关闭...')
      }
      // 路由跳转时结束websocket链接
      this.$router.afterEach(function () {
        ws.close()
      })
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
