import Vue from 'vue'
import Router from 'vue-router'
import Lists from '@/components/Lists'
import Session from '@/components/Session'
import Register from '@/components/Register'
import Project from '@/components/Project'

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
    },
    {
      path: '/projects/:projectId/edit',
      name: 'Project',
      component: Project,
      props: (route) => ({projectId: route.params.projectId})
    }
  ]
})
