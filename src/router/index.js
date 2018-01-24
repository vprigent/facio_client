import Vue from 'vue'
import Router from 'vue-router'
import Lists from '@/components/Lists'
import Session from '@/components/Session'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Session',
      component: Session
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/projects/:projectId',
      name: 'Lists',
      component: Lists
    }
  ]
})
