import Vue from 'vue'
import Router from 'vue-router'
import Project from '@/components/Project'
import Session from '@/components/Session'

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
      path: '/projects/:projectId',
      name: 'Project',
      component: Project
    }
  ]
})
