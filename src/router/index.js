import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ContentIndex from '@/components/ContentIndex'
import CmsIndex from '@/cms/CmsIndex'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: ContentIndex,
      children: [{
        path: '/',
        component: HelloWorld
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
