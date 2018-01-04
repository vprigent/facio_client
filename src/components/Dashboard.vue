<template>
  <div class="dashboard">
    <div class="sidebar">
      <projects></projects>
    </div>
    <router-view/>
  </div>
</template>

<script>

import Projects from './Projects.vue'

export default {
  name: 'Dashboard',
  components: {
    Projects
  }
}
</script>
