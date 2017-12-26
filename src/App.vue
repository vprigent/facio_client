
<style src="./assets/styles/main.sass" lang="sass"></style>

<template>
  <div id="app">
    <div class="connect">
      <a href="/login">Login</a>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
