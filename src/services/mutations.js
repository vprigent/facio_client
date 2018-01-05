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
    state.lists.splice(state.lists.indexOf(listId), 1)
  },

  toggleItem (state, item) {
    item.done = !item.done
  },

  createItem (state, item) {
    state.items.push(item)
  },

  destroyItem (state, itemId) {
    state.items.splice(state.items.indexOf(itemId), 1)
  },

  setCurrentProject (state, project) {
    state.current_project = project
  }
}
