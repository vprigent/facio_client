<template>
  <div class="projects">
    <div class="project new-project">
      <input type="text" name="name" value="" placeholder="New project" @keydown.enter="submit">
    </div>
    <div class='project'
        v-for="project in projects"
        :key="project.id"
        >
      <router-link :to="{ name: 'Project', params: {projectId: project.id} }" v-on:click.native="changeProject(project.id)" :class="{ active : isActive(project) }">
        {{ project.name }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

import store from '@/services/store.js'

export default {
  name: 'projects',
  data () {
    return {
      projects: store.state.projects
    }
  },
  computed: {
    currentProject () {
      return store.state.current_project
    }
  },
  methods: {
    ...mapActions([
      'newProject'
    ]),
    ...mapMutations([
      'setCurrentProject'
    ]),
    submit: function (e) {
      this.newProject({name: e.target.value})
    },
    changeProject: function (projectId) {
      this.setCurrentProject(store.getters.getProject(projectId))
    },
    isActive: function (project) {
      return this.currentProject !== null && this.currentProject.id === project.id
    }
  }
}
</script>
