<template>
  <li class="item"
  :class=item.id
    draggable
    @dragstart="dragItem($event, item)"
    @dragend="dropItem($event, item)"
    >
    <input :id="'check-item-' + item.id" v-model="done" type="checkbox">
    <input v-if="editedItem == item" type="text" v-model="item.label" @keydown.enter="changeItem">
    <label v-else :for="'check-item-' + item.id">{{ item.label }}</label>

    <submenu class="pull-right">
      <ul class="actions submenu">
        <li>
          <a href='#' class="delete" @click="removeItem()">Delete</a>
        </li>
        <li>
          <a href='#' class="edit" @click="editItem($event)">Edit</a>
        </li>
      </ul>
    </submenu>
    <div class="desc">{{ item.description }}</div>
  </li>
</template>

<script>
import { mapActions } from 'vuex'
import Submenu from './utils/Submenu.vue'

export default {
  name: 'item',
  props: ['item'],
  components: {
    Submenu
  },
  data: function () {
    return {
      editedItem: null
    }
  },
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
      'updateItem',
      'checkItem',
      'updateItem'
    ]),
    toggleItem: function (item) {
      this.checkItem(item)
    },
    removeItem: function () {
      this.deleteItem(this.item)
    },
    editItem: function (event) {
      event.target.parentNode.parentNode.classList.remove('active')
      this.editedItem = this.item
    },
    changeItem: function (event) {
      this.updateItem({record: this.item, label: event.target.value})
      this.editedItem = null
    },
    dragItem: function (event, item) {
      event.target.classList.add('dragged')
      event.dataTransfer.setData('text/plain', item.id)
    },
    dropItem: function (event, item) {
      event.target.classList.remove('dragged')
    }
  }
}
</script>
