import Vue from 'vue'
import Router from 'vue-router'
import Lists from '@/components/Lists'
import Session from '@/components/Session'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Lists',
      component: Lists
    },
    {
      path: '/login',
      name: 'Session',
      component: Session
    }
  ]
})
