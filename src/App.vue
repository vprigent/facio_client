
<style src="./assets/styles/main.sass" lang="sass"></style>

<template>
  <div id="app">
    <div class="topbar">
      <div class="login" v-if="user == null">
        <a href="/login">Login</a>
      </div>
      <div class="logout" v-else>
        <a href="#" @click="logoutUser">Log out</a>
      </div>
    </div>
    <dashboard></dashboard>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import Dashboard from './components/Dashboard.vue'
import store from '@/services/store.js'

export default {
  name: 'app',
  components: {
    Dashboard
  },
  computed: {
    user () {
      return store.getters.getUser
    }
  },
  methods: {
    ...mapActions([
      'logoutUser'
    ])
  }
}
</script>
