<template>
  <div class="session">
    <p>Se connecter</p>
    <form class="login" action="" method="post" @submit.prevent="submit">
      <div class="">
        <label for="email">Email</label>
        <input type="text" v-model="email" autofocus>
      </div>
      <div class="">
        <label for="password">Password</label>
        <input type="password" v-model="password" placeholder="Your password">
      </div>
      <button type="submit" name="button" @click.prevent="submit">Connexion</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Session',
  props: ['user'],
  data () {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    ...mapActions([
      'loginUser'
    ]),
    submit: function (e) {
      var attrs = {user: {email: this.email, password: this.password}}
      this.loginUser(attrs)
    }
  }
}
</script>
