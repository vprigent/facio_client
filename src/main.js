// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './services/store'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Icon from 'vue-awesome/components/Icon'

Vue.config.productionTip = false

Vue.component('icon', Icon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  methods: {
    ...mapGetters([
      'getCurrentProject',
      'getProjects'
    ]),
    ...mapMutations([
      'setCurrentProject'
    ]),
    ...mapActions([
      'syncAll'
    ])
  },
  created () {
    this.syncAll()
    if (this.getCurrentProject() === null && this.getProjects().length !== 0) {
      this.setCurrentProject(this.projects[0])
    }
    if (this.getCurrentProject() !== null && window.location.pathname === '/') {
      router.push({name: 'Project', params: { projectId: this.getCurrentProject().id }})
    }
  }
})
