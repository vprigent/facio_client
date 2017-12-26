
<style src="./assets/styles/main.sass" lang="sass"></style>

<template>
  <div id="app">
    <div class="topbar">
      <div class="connect">
        <a href="/login">Login</a>
      </div>
    </div>
    <dashboard></dashboard>
  </div>
</template>

<script>
import Dashboard from './components/Dashboard.vue'

export default {
  name: 'app',
  components: {
    Dashboard
  }
}
</script>
