<template>
  <div class="topbar">
    <a href="/calendar">
      Calendar
    </a>
    <a>
      Projects
    </a>

    <div class="login" v-if="user == null">
      <a href="/login">Login</a>
    </div>
    <div class="logout" v-else>
      <a href="#" @click="logoutUser">Log out</a>
    </div>
  </div>
</template>

<script>

  import { mapActions } from 'vuex'
  import store from '@/services/store.js'

  export default {
    name: 'topbar',
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
