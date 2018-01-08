<template>
  <div class="toggle">
    <span class="icon icon-more-horiz" data-toggle="actions" @click="toggleSubmenu"></span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'submenu',
  methods: {
    toggleSubmenu (e) {
      var className = '.' + e.target.dataset.toggle
      e.target.parentNode.querySelector(className).classList.toggle('active')
    }
  }
}
</script>
