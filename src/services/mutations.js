import User from '@/models/user.js'

export default {
  createUser (state, attrs) {
    state.current_user = new User(attrs.id, attrs.email)
  },

  deleteUser (state) {
    state.current_user = null
  },

  createProject (state, project) {
    state.projects.push(project)
  },

  createList (state, list) {
    state.lists.push(list)
  },

  destroyList (state, listId) {
    var index = state.lists.indexOf(state.lists.filter(list => list.id === listId)[0])
    if (index > -1) {
      state.lists.splice(index, 1)
    }
  },

  toggleItem (state, item) {
    item.done = !item.done
  },

  createItem (state, item) {
    state.items.push(item)
  },

  destroyItem (state, itemId) {
    var index = state.items.indexOf(state.items.filter(item => item.id === itemId)[0])
    if (index > -1) {
      state.items.splice(index, 1)
    }
  },

  setCurrentProject (state, project) {
    state.current_project = project
  }
}
