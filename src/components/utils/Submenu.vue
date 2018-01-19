<template>
  <div class="toggle">
    <a href="#" @click="toggleSubmenu" data-toggle="actions">
      <icon name="ellipsis-h"></icon>
    </a>
    <slot></slot>
  </div>
</template>

<script>
import 'vue-awesome/icons/ellipsis-h'

export default {
  name: 'submenu',
  methods: {
    toggleSubmenu (e) {
      var className = '.' + e.currentTarget.dataset.toggle
      e.currentTarget.parentNode.querySelector(className).classList.toggle('active')
    }
  }
}
</script>
