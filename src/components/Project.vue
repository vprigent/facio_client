<template>
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
</template>

<script type="text/javascript">
import { mapActions } from 'vuex'

import List from './List.vue'
import store from '@/services/store.js'

export default {
  name: 'Project',
  components: {
    List
  },
  data () {
    return {
      currentList: null
    }
  },
  computed: {
    lists () {
      return store.getters.getCurrentLists
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
      this.currentList = {title: e.target.value, project_id: store.state.current_project.id, sequence: store.state.projects.length}
      this.newList(this.currentList)
      this.currentList = null
    }
  }
}

</script>
