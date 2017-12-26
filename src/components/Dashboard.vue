<template>
  <div class="dashboard">
    <div class="sidebar">
      <projects></projects>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import Projects from './Projects.vue'
import store from '@/services/store.js'

export default {
  name: 'Dashboard',
  components: {
    Projects
  }
}
</script>
