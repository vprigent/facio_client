<template>
  <div class='list'>
    <div class="title" v-bind:id="'list-' + list.id" v-bind:data-id="list.id">
      <input type="hidden" name="list_sequence" v-model="list.sequence">

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
      @dragover="dragOver($event)"
      @dragexit="dragExit($event)">
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
      'updateList',
      'updateItemsSequence'
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
      this.currentItem = {label: e.target.value, list_id: this.list.id, sequence: this.items.length}
      e.target.value = ''
      this.newItem(this.currentItem)
    },
    dropItem: function (event) {
      event.preventDefault()

      var itemId = event.dataTransfer.getData('text/plain')
      var list = event.target.closest('ul.items')
      var item_node = document.querySelector("input[name='item_id'][value='" + itemId + "']").closest('li.item')

      var clickX = event.clientX + window.scrollX
      var clickY = event.clientY + window.scrollY
      var targetTop = event.target.offsetTop
      var targetBottom = event.target.offsetHeight + targetTop

      var lis = list.querySelectorAll('li.item:not(.dragged)')

      var firstBefore = null
      var lastAfter = null

      for (var i = 0; i < lis.length; i++) {
        var liTop = lis[i].offsetTop
        var liBottom = liTop + lis[i].offsetHeight
        var liMiddle = (liBottom - liTop)/2 + liTop

        if (clickY > liMiddle) {
          lastAfter = lis[i]
        } else if (clickY < liMiddle && firstBefore == null) {
          firstBefore = lis[i]
        }
      }

      if (lastAfter != null) {
        list.insertBefore(item_node, lastAfter.nextSibling)
      } else if (firstBefore != null) {
        list.insertBefore(item_node, firstBefore)
      } else if (clickY - targetTop < 50 ) {
        list.insertBefore(item_node, lis[0])
      } else if (targetBottom - clickY < 50) {
        list.appendChild(item_node)
      }

      event.target.classList.remove('dragged')

      if (list.dataset.id != this.getItem(itemId).list_id) {
        this.changeItemsSequence([list, document.getElementById('list-' + this.getItem(itemId).list_id)])
      } else {
        this.changeItemsSequence([list])
      }
    },
    dragOver: function (event) {
      event.preventDefault()
      if (event.target.nodeType == 3) {
        return
      }
    },
    dragExit: function (event) {
      if (event.target.nodeType == 3) {
        return
      }

      var node = event.target.closest('li.item')
      if (node != null) {
        node.closest('li.item').style = "background-color: default"
      }
    },
    changeItemsSequence: function (lists) {
      for (var i = 0; i < lists.length; i++) {
        var items = lists[i].querySelectorAll('li.item')

        var items_ids = []
        for (var j = 0; j < items.length; j++) {
          items_ids.push(items[j].querySelector("input[name='item_id']").value)
        }

        if (items_ids.length > 0) {
          this.updateItemsSequence(items_ids)
        }
      }
    }
  }
}
</script>
