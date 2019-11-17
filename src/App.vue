
<style src="./assets/styles/main.sass" lang="sass"></style>

<template>
  <div id="app">
    <topbar></topbar>
    <dashboard></dashboard>
  </div>
</template>

<script>
import Dashboard from './components/Dashboard.vue'
import Topbar from './components/Topbar.vue'

export default {
  name: 'app',
  components: {
    Dashboard,
    Topbar
  }
}
</script>
