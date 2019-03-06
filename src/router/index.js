import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ContentIndex from '@/components/ContentIndex'
import CmsIndex from '@/cms/CmsIndex'
import ProductSetting from '@/components/ProductSetting'
import ProductClassSetting from '@/components/ProductClassSetting'
import PersonnelInfo from '@/components/PersonnelInfo'
import initAccessResource from '@/components/InitAccessResource'
import systemMenuNode from '@/components/SystemMenuNode'
import resourceSetting from '@/components/ResourceSetting'
import Role from '@/components/role'
import Login from '@/components/Login'
import store from '../store/eunion/store'
import * as types from '../store/eunion/type'

Vue.use(Router)

const router = [{
  path: '/',
  component: ContentIndex,
  children: [{
    path: '/',
    component: HelloWorld
  },
  {
    path: '/product',
    component: ProductSetting
  },
  {
    path: '/initAccessResource',
    component: initAccessResource
  },
  {
    path: '/menuNode',
    component: systemMenuNode
  },
  {
    path: '/role',
    component: Role
  },
  {
    path: '/resource',
    component: resourceSetting
  },
  {
    path: '/productClass',
    component: ProductClassSetting
  },
  {
    path: '/PersonnelInfo',
    component: PersonnelInfo
  }],
  meta: {
    requireAuth: true
  }},
{
  path: '/ContentRouter',
  name: 'ContentRouter',
  component: ContentIndex,
  children: [{
    path: '/ContentRouter/HelloWorld',
    component: HelloWorld
  }]
},
{
  path: '/cms',
  name: 'CMS',
  component: CmsIndex,
  meta: {
    requireAuth: true
  }
},
{
  path: '/login',
  name: 'login',
  component: Login
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
