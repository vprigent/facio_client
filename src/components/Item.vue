<template>
  <div class="list-item">
    <span class="label">{{ item.label }}</span>
    <span class="actions">
      <a href='#' class="edit" v-on:click="editItem(item)">Edit</a>
      <a href='#' class="delete" v-on:click="removeItem(item)">Delete</a>
    </span>
    <div class="desc">{{ item.description }}</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'item',
  props: ['item'],
  methods: {
    ...mapActions([
      'deleteItem'
    ]),
    removeItem: function (item) {
      this.deleteItem(item)
    }
  }
}
</script>
