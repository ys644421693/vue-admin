import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/eunion/store'
import * as types from '../store/eunion/type'

Vue.use(Router)

const router = [{
  path: '/',
  component: resolve => require(['@/components/ContentIndex'], resolve),
  children: [{
    path: '/',
    component: resolve => require(['@/components/HelloWorld'], resolve)
  },
  {
    path: '/product',
    component: resolve => require(['@/components/ProductSetting'], resolve)
  },
  {
    path: '/initAccessResource',
    component: resolve => require(['@/components/InitAccessResource'], resolve)
  },
  {
    path: '/menuNode',
    component: resolve => require(['@/components/SystemMenuNode'], resolve)
  },
  {
    path: '/supplier',
    component: resolve => require(['@/components/Supplier'], resolve)
  },
  {
    path: '/merchantInfo',
    component: resolve => require(['@/components/MerchantInfo'], resolve)
  },
  {
    path: '/role',
    component: resolve => require(['@/components/Role'], resolve)
  },
  {
    path: '/resource',
    component: resolve => require(['@/components/ResourceSetting'], resolve)
  },
  {
    path: '/productClass',
    component: resolve => require(['@/components/ProductClassSetting'], resolve)
  },
  {
    path: '/PersonnelInfo',
    component: resolve => require(['@/components/PersonnelInfo'], resolve)
  }],
  meta: {
    requireAuth: true
  }},
{
  path: '/ContentRouter',
  name: 'ContentRouter',
  component: resolve => require(['@/components/ContentIndex'], resolve),
  children: [{
    path: '/ContentRouter/HelloWorld',
    component: resolve => require(['@/components/HelloWorld'], resolve)
  }]
},
{
  path: '/cms',
  name: 'CMS',
  component: resolve => require(['@/cms/CmsIndex'], resolve),
  meta: {
    requireAuth: true
  }
},
{
  path: '/login',
  name: 'login',
  component: resolve => require(['@/components/Login'], resolve)
}]
// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  store.commit(types.LOGIN, window.localStorage.getItem('token'))
}
const routers = new Router({
  routes: router
})

routers.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

export default routers
