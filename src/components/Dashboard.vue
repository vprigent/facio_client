<template>
  <div class="dashboard">
    <div class="lists">
      <list
          v-for="list in lists"
          :key="list.id"
          :list="list">
      </list>
      <div class="list new-list" v-if='currentList'>
        <input type="text" name="title" value="" placeholder="New list" @keydown.enter="submit">
      </div>
      <div class="list">
        <a href='#' class="add-list" @click="addList()">Add new list</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import List from './List.vue'
import store from '@/services/store.js'

export default {
  name: 'Dashboard',
  components: {
    'list': List
  },
  data () {
    return {
      lists: store.state.lists,
      currentList: null
    }
  },
  methods: {
    ...mapActions([
      'newList'
    ]),
    addList: function () {
      this.currentList = {title: 'New List'}
    },
    submit: function (e) {
      this.currentList = {title: e.target.value}
      this.newList(this.currentList)
      this.currentList = null
    }

  }
}
</script>
