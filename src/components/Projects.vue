<template>
  <div class="projects">
    <div class="project new-project">
      <input type="text" name="name" value="" placeholder="New project" @keydown.enter="submit">
    </div>
    <div class='project'
        v-for="project in projects"
        :key="project.id"
        >
      <router-link :to="{ name: 'Project', params: {projectId: project.id} }" @click.native="changeProject(project.id)" :class="{ active : isActive(project) }">
        {{ project.name }}
      </router-link>

      <submenu class="pull-right">
        <div class="actions submenu">
          <a href='#' class="delete" v-on:click="removeProject(project)">Delete Project</a>
        </div>
      </submenu>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

import store from '@/services/store.js'
import Submenu from './utils/Submenu.vue'

export default {
  name: 'projects',
  components: {
    Submenu
  },
  computed: {
    currentProject () {
      return store.state.current_project
    },
    projects () {
      return store.getters.getProjects
    }
  },
  methods: {
    ...mapActions([
      'newProject',
      'deleteProject'
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
    },
    removeProject: function (project) {
      this.deleteProject(project)
    }
  }
}
</script>
