<template>
  <div class='list'>
    <div class="title" v-bind:id="'list-' + list.id">
      <input v-if="editedList == list" v-model="list.title" @keydown.enter="changeList"></input>
      <label v-else>{{ list.title }}</label>

      <submenu class="pull-right">
        <ul class="actions submenu">
          <li>
            <a href='#' class="delete" @click="removeList()">Delete list</a>
          </li>
          <li>
            <a href='#' class="edit" @click="editList($event)">Edit list</a>
          </li>
        </ul>
      </submenu>
    </div>

    <ul class="items"
      @drop="dropItem($event)"
      @dragover="dragOverItem($event)">
      <div class="new-item">
        <input type="text" name="label" value="" placeholder="New item" @keydown.enter="submit">
      </div>
      <item
          v-for="item in items"
          :key="item.id"
          :item="item">
      </item>
    </ul>
  </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'

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
  data: function () {
    return {
      item: '',
      editedList: null
    }
  },
  computed: {
    ...mapGetters([
      'getItem'
    ]),
    items () {
      return store.getters.itemsForList(this.list.id)
    }
  },
  methods: {
    ...mapActions([
      'deleteList',
      'editList',
      'newItem',
      'updateItem',
      'updateList'
    ]),
    removeList: function () {
      this.deleteList(this.list)
    },
    editList: function (event) {
      event.target.parentNode.parentNode.classList.remove('active')
      this.editedList = this.list
    },
    changeList: function (event) {
      this.updateList({record: this.list, title: event.target.value})
      this.editedList = null
    },
    submit: function (e) {
      this.currentItem = {label: e.target.value, list_id: this.list.id}
      e.target.value = ''
      this.newItem(this.currentItem)
    },
    dropItem: function (event) {
      event.preventDefault()

      var itemId = event.dataTransfer.getData('text/plain')
      var item = this.getItem(itemId)

      event.target.classList.remove('dragged')

      if (item.list_id !== this.list.id) {
        this.updateItem({record: item, list_id: this.list.id})
      }
    },
    dragOverItem: function (event, item) {
      event.preventDefault()
    }
  }
}
</script>
