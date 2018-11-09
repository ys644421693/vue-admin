// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import VCharts from 'v-charts'
import VeLine from 'v-charts/lib/line.common'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.css'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(ElementUI, VCharts)
Vue.component(VeLine.name, VeLine)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
