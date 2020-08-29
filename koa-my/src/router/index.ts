import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home/home.vue'
import account from './account.js'
import poplar from './poplar.js'

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        redirect: 'home',
    },
    {
        path: '/home',
        name: 'home',
        component: home
    },
    account,
    poplar,

    
    {
      path: '*',
      component: () => import('@/page/error404.vue')
    },
  ]
})
