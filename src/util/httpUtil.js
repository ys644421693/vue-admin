import axios from 'axios'
import store from '../store/eunion/store'
import * as types from '../store/eunion/type'
import router from '../router/index'
import { Loading, Message } from 'element-ui'

// axios 配置
axios.defaults.timeout = 5000
axios.defaults.baseURL = store.state.baseUrl

var loadinginstace
// http request 拦截器
axios.interceptors.request.use(
  config => {
    loadinginstace = Loading.service({ fullscreen: true })
    if (store.state.token) {
      config.headers.Authorization = `token ${store.state.token}`
    }
    return config
  },
  err => {
    loadinginstace.close()
    Message.error({message: '请求超时'})
    return Promise.reject(err)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    loadinginstace.close()
    router.replace({
      path: '/',
      query: {redirect: router.currentRoute.fullPath}
    })
    return response
  },
  error => {
    loadinginstace.close()
    Message.error({message: '登录失败'})
    if (error.response) {
      switch (error.response.status) {
        case 401:
          store.commit(types.LOGOUT)
          router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.fullPath}
          })
      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error.response.data)
  }
)

export default axios
