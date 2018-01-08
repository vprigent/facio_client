<template>
  <div class='list'>
    <div class="title" v-bind:id="'list-' + list.id">
      {{ list.title }}

      <submenu class="pull-right">
        <div class="actions submenu">
          <a href='#' class="delete" v-on:click="removeList(list)">Delete list</a>
        </div>
      </submenu>
    </div>

    <div class="items">
      <div class="new-item">
        <input type="text" name="label" value="" placeholder="New item" @keydown.enter="submit">
      </div>
      <item
          v-for="item in items"
          :key="item.id"
          :item="item">
      </item>
    </div>
  </div>

</template>

<script>
import { mapActions } from 'vuex'

import Item from './Item.vue'
import Submenu from './utils/Submenu.vue'

import store from '@/services/store.js'

export default {
  name: 'list',
  props: ['list'],
  components: {
    Item,
    Submenu
  },
  computed: {
    items () {
      return store.getters.itemsForList(this.list.id)
    }
  },
  methods: {
    ...mapActions([
      'deleteList',
      'editList',
      'newItem'
    ]),
    removeList: function (list) {
      this.deleteList(list)
    },
    changeList: function (list) {
      this.updateList(list)
    },
    submit: function (e) {
      this.currentItem = {label: e.target.value, list_id: this.list.id}
      e.target.value = ''
      this.newItem(this.currentItem)
    }

  }
}
</script>
