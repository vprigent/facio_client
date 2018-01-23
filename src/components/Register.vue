<template>
  <div class="session register">
    <p>Register</p>
    <form class="login" action="" method="post" @submit.prevent="submit">
      <div class="email">
        <label for="email">Email</label>
        <input type="text" v-model="email" autofocus>
      </div>
      <div class="password">
        <label for="password">Password</label>
        <input type="password" v-model="password" placeholder="Your password">
      </div>
      <div class="password-confirmation">
        <label for="password_confirmation">Password</label>
        <input type="password" v-model="password_confirmation" placeholder="Password confirmation">
      </div>
      <button type="submit" name="button" @click.prevent="submit">Register</button>
      <router-link :to="{ name: 'Session' }">Sign in</router-link>

    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Register',
  props: ['user'],
  data () {
    return {
      email: '',
      password: '',
      password_confirmation: ''
    }
  },
  methods: {
    ...mapActions([
      'registerUser'
    ]),
    submit: function (e) {
      var attrs = {user: {email: this.email, password: this.password, password_confirmation: this.password_confirmation}}
      this.registerUser(attrs)
    }
  }
}
</script>
