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

  updateProject (state, project) {
    var projectId = project.id
    var index = state.projects.indexOf(state.projects.filter(project => project.id === projectId)[0])
    if (index > -1 ) {
      state.projects.splice(index, 1)
    }
    state.projects.push(project)
  },

  destroyProject (state, projectId) {
    var index = state.projects.indexOf(state.projects.filter(project => project.id === projectId)[0])
    if (index > -1) {
      state.projects.splice(index, 1)
    }
  },

  createList (state, list) {
    state.lists.push(list)
  },

  updateList (state, list) {
    var listId = list.id
    var index = state.lists.indexOf(state.lists.filter(list => list.id === listId)[0])
    if (index > -1 ) {
      state.lists.splice(index, 1)
    }
    state.lists.push(list)
  },

  destroyList (state, listId) {
    var index = state.lists.indexOf(state.lists.filter(list => list.id === listId)[0])
    if (index > -1) {
      state.lists.splice(index, 1)
    }
  },

  createItem (state, item) {
    state.items.push(item)
  },

  updateItem (state, item) {
    var itemId = item.id
    var index = state.items.indexOf(state.items.filter(item => item.id === itemId)[0])
    if (index > -1) {
      state.items.splice(index, 1)
    }
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
