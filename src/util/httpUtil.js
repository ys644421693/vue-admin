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
    loadinginstace = Loading.service({ target: '#app', fullscreen: true, background: 'rgba(255, 255, 255, 0.3)' })
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
    console.log(response)
    loadinginstace.close()
    return response
  },
  error => {
    loadinginstace.close()
    Message.error({message: '请求失败' + error.message})
    if (error.response) {
      switch (error.response.status) {
        case 401:
          store.commit(types.LOGOUT)
          router.currentRoute.path !== 'login' &&
          router.replace({
            path: 'login',
            query: { redirect: router.currentRoute.path }
          })
      }
    }
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
      return qs.stringify(data)
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
      return qs.stringify(data)
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export const deleteRequest = (url) => {
  return axios({
    method: 'delete',
    xhrFields: {
      withCredentials: true
    },
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
