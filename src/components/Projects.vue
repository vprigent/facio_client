<template>
  <div class="projects">
    <div class="project new-project">
      <input type="text" name="title" value="" placeholder="New project" @keydown.enter="submit">
    </div>
    <div class='project'
        v-for="project in projects"
        :key="project.id"
        :project="project">
      <div class="title" v-bind:id="project.id" @click="changeProject">
        {{ project.title }}
        <span class="actions">
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import store from '@/services/store.js'

export default {
  name: 'projects',
  data() {
    return {
      projects: store.state.projects,
      currentProject: null
    }
  },
  methods: {
    ...mapActions([
      'newProject'
    ]),
    gotoProject: function (project_id) {
      this.currentProject = store.getters.getProject(project_id)
    },
    submit: function(e) {
      this.currentProject = {title: e.target.value}
      this.newProject(this.currentProject)
    },
    changeProject: function(e) {
      project_id = e.target.getAttribute('project-id')
      this.currentProject = store.getters.getProject(project_id)
    }
  }
}
</script>
