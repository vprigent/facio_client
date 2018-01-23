<template>
  <li class="item"
    :class="[ item.id, {'editing': (editedItem == item)}]"
    draggable
    @dragstart="dragItem($event, item)"
    @dragend="dropItem($event, item)"
    >
    <input type="hidden" name="item_sequence" v-model="item.sequence">
    <input :id="'check-item-' + item.id" v-model="done" type="checkbox">

    <submenu class="pull-right">
      <ul class="actions submenu">
        <li>
          <a href='' class="delete" @click.prevent="removeItem()">Delete</a>
        </li>
        <li>
          <a href='' class="edit" @click.prevent="editItem($event)">Edit</a>
        </li>
      </ul>
    </submenu>

    <form v-if="editedItem == item" method="post" @submit.prevent="changeItem">
      <input v-model="item.label" type="text" name="item_label">

      <div class="form-group">
        <label for="item_description">Description</label>
        <input v-model="item.description" type="textarea" name="item_description">
      </div>

      <button type="submit" name="button">Submit</button>
      <button type="cancel" name="button" @click.prevent="cancelChanges">Cancel</button>
    </form>

    <span v-else>
      <label  :for="'check-item-' + item.id">{{ item.label }}</label>

      <div class="desc">{{ item.description }}</div>
    </span>
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
      event.currentTarget.parentNode.parentNode.classList.remove('active')
      this.editedItem = this.item
    },
    changeItem: function (event) {
      this.updateItem({record: this.item, label: this.item.label, description: this.item.description})
      this.editedItem = null
    },
    cancelChanges: function (event) {
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
