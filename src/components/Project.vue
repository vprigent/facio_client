<template>
  <div class="project edit">
    <form method="post" @submit.prevent="changeProject">
      <div class="form-group">
        <label for="project_name">Project name</label>
        <input v-model="project.name" type="text" name="project_name">
      </div>

      <button type="submit" name="button">Submit</button>
      <button type="cancel" name="button" @click.prevent="cancelChanges">Cancel</button>
    </form>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import router from '@/router'


import store from '@/services/store.js'

export default {
  name: 'project',
  props: ['projectId'],
  computed: {
    project () {
      return store.getters.getProject(this.projectId)
    }
  },
  methods: {
    ...mapActions([
      'updateProject'
    ]),
    cancelChanges: function (event) {
      router.go(-1)
    },
    changeProject: function (event) {
      this.updateProject({record: this.project, name: this.project.name})
    }
  }
}
</script>
