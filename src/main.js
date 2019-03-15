// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import VeLine from 'v-charts/lib/line.common'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.css'
import 'font-awesome/scss/font-awesome.scss'
import {getRequest, postRequest, deleteRequest, putRequest} from './util/httpUtil'

Vue.config.productionTip = false
Vue.prototype.HOST = '/sys'
Vue.prototype.getRequest = getRequest
Vue.prototype.postRequest = postRequest
Vue.prototype.deleteRequest = deleteRequest
Vue.prototype.putRequest = putRequest
Vue.use(ElementUI, Vuex)
Vue.component(VeLine.name, VeLine)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
