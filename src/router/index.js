import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ContentIndex from '@/components/ContentIndex'
import CmsIndex from '@/cms/CmsIndex'
import ProductSetting from '@/components/ProductSetting'
import PersonnelInfo from '@/components/PersonnelInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
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
        path: '/PersonnelInfo',
        component: PersonnelInfo
      }]
    },
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
      component: CmsIndex
    }
  ]
})
