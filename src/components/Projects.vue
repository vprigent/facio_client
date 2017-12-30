<template>
  <div class="projects">
    <div class="project new-project">
      <input type="text" name="name" value="" placeholder="New project" @keydown.enter="submit">
    </div>
    <div class='project'
        v-for="project in projects"
        :key="project.id"
        @click="changeProject"
        >
      <a class="name"
        :class="{ active : isActive(project) }"
        v-bind:data-project-id="project.id">
        {{ project.name }}
        <span class="actions">
        </span>
      </a>
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
      'newProject',
      'changeCurrentProject'
    ]),
    submit: function(e) {
      this.newProject({name: e.target.value})
    },
    changeProject: function(e) {
      var project_id = e.target.dataset.projectId
      this.changeCurrentProject(store.getters.getProject(project_id))
    },
    isActive: function (project) {
      return this.currentProject != null && this.currentProject.id === project.id
    }
  }
}
</script>
