<template>
  <div class="item">
    <input :id="'check-item-' + item.id" v-model="done" type="checkbox">
    <label :for="'check-item-' + item.id">{{ item.label }}</label>
    <span class="actions">
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
  computed: {
    done: {
      get: function () {
        return this.item.done
      },
      set: function (value) {
        this.toggleItem(this.item)
      }
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
