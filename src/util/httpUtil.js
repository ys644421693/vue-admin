import axios from 'axios'
import store from '../store/eunion/store'
import * as types from '../store/eunion/type'
import router from '../router/index'
import { Loading, Message } from 'element-ui'
import qs from 'qs'

// axios 配置
axios.defaults.timeout = 10000
axios.defaults.baseURL = store.state.baseUrl
axios.defaults.withCredentials = true

var loadinginstace
// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (!loadinginstace) {
      loadinginstace = Loading.service({ target: '#app', fullscreen: true, background: 'rgba(255, 255, 255, 0.3)' })
    }
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
    return response
  },
  error => {
    loadinginstace.close()
    var message = ''
    if (error.response) {
      switch (error.response.status) {
        case 401:
          store.commit(types.LOGOUT)
          router.currentRoute.path !== 'login' &&
          router.replace({
            path: 'login',
            query: { redirect: router.currentRoute.path }
          })
          message = '未登录'
          break
        case 500:
          message = '服务器错误'
          break
        case 400:
          message = '参数错误'
          break
      }
    }
    Message.error({message: '请求失败' + message})
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error.response.data)
  }
)
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${store.state.baseUrl}${url}`,
    data: params,
    xhrFields: {
      withCredentials: true
    },
    crossDomain: true,
    withCredentials: true,
    transformRequest: [function (data) {
      return qs.stringify(data, {allowDots: true,
        serializeDate: (date) => {
          return format(date, 'yyyy-MM-dd HH:mm:ss')
        }})
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export const uploadFileRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${store.state.baseUrl}${url}`,
    data: params,
    xhrFields: {
      withCredentials: true
    },
    crossDomain: true,
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${store.state.baseUrl}${url}`,
    data: params,
    xhrFields: {
      withCredentials: true
    },
    crossDomain: true,
    withCredentials: true,
    transformRequest: [function (data) {
      return qs.stringify(data, {allowDots: true,
        serializeDate: (date) => {
          return format(date, 'yyyy-MM-dd HH:mm:ss')
        }})
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export const deleteRequest = (url, params) => {
  return axios({
    method: 'delete',
    params: params,
    xhrFields: {
      withCredentials: true
    },
    transformRequest: [function (data) {
      return qs.stringify(data)
    }],
    crossDomain: true,
    url: `${store.state.baseUrl}${url}`
  })
}
export const getRequest = (url, params) => {
  return axios({
    method: 'get',
    params: params,
    xhrFields: {
      withCredentials: true
    },
    crossDomain: true,
    withCredentials: true,
    url: `${store.state.baseUrl}${url}`
  })
}
export const format = (data, fmt) => {
  var o = {
    'M+': data.getMonth() + 1,
    'd+': data.getDate(),
    'h+': data.getHours(),
    'm+': data.getMinutes(),
    's+': data.getSeconds(),
    'q+': Math.floor((data.getMonth() + 3) / 3),
    'S': data.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (data.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
}
