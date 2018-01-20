<template>
  <div class="projects">
    <div class="project new-project">
      <input type="text" name="name" value="" placeholder="New project" @keydown.enter="submit">
    </div>
    <div class='project'
        v-for="project in projects"
        :key="project.id"
        >

      <input type="hidden" name="project_sequence" v-model="project.sequence">

      <input v-if="editedProject == project" v-model="project.name" @keydown.enter="changeProject">

      <router-link v-else :to="{ name: 'Project', params: {projectId: project.id} }" @click.native="setCurrentProject(project)" :class="{ active : isActive(project) }">
        {{ project.name }}
      </router-link>

      <submenu class="pull-right">
        <ul class="actions submenu">
          <li>
            <a href='#' class="delete" @click="deleteProject(project)">Delete Project</a>
          </li>
          <li>
            <a href='#' class="edit" @click="editProject($event, project)">Update Project</a>
          </li>
        </ul>
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
  data () {
    return {
      editedProject: null
    }
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
      'deleteProject',
      'updateProject'
    ]),
    ...mapMutations([
      'setCurrentProject'
    ]),
    submit: function (e) {
      this.newProject({name: e.target.value})
    },
    isActive: function (project) {
      return this.currentProject !== null && this.currentProject.id === project.id
    },
    editProject: function (event, project) {
      event.target.parentNode.parentNode.classList.remove('active')
      this.editedProject = project
    },
    changeProject: function (event) {
      this.updateProject({record: this.editedProject, name: event.target.value})
      this.editedProject = null
    },
    removeProject: function (project) {
      this.deleteProject(project)
    }
  }
}
</script>
