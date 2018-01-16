<template>
  <div class="toggle">
    <a href="#" @click="toggleSubmenu">
      <icon name="ellipsis-h" data-toggle="actions"></icon>
      <slot></slot>
    </a>
  </div>
</template>

<script>
import 'vue-awesome/icons/ellipsis-h'

export default {
  name: 'submenu',
  methods: {
    toggleSubmenu (e) {
      var className = '.' + e.target.dataset.toggle
      console.log(className)
      console.log(e.target.parentNode.querySelector(className))
      e.target.parentNode.querySelector(className).classList.toggle('active')
    }
  }
}
</script>
