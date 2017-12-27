<template>
  <div class="list-item">
    <input :id="'check-item-' + item.id" v-on:change="toggleItem(item)" v-model="done" type="checkbox">
    <label :for="'check-item-' + item.id">{{ item.label }}</label>
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
  props: ['item', 'key'],
  computed: {
    done() {
      return this.item.done
    }
  },
  methods: {
    ...mapActions([
      'deleteItem',
      'checkItem'
    ]),
    toggleItem: function (item) {
      this.checkItem(item)
    },
    removeItem: function (item) {
      this.deleteItem(item)
    }
  }
}
</script>
