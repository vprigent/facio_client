import axios from 'axios'
import qs from 'qs'

import router from '@/router'
import Project from '@/models/project.js'
import List from '@/models/list.js'
import Item from '@/models/item.js'
import User from '@/models/user.js'


axios.defaults.baseURL = 'http://localhost:4000/'
axios.defaults.withCredentials = true

export const STORAGE_KEY = 'facio-webclient'

export const state = {
  items: JSON.parse(window.localStorage.getItem(STORAGE_KEY + '-items') || '[]'),
  lists: JSON.parse(window.localStorage.getItem(STORAGE_KEY + '-lists') || '[]'),
  projects: JSON.parse(window.localStorage.getItem(STORAGE_KEY + '-projects') || '[]'),
  last_list_id: window.localStorage.getItem(STORAGE_KEY + '-last-list-id') || 0,
  last_item_id: window.localStorage.getItem(STORAGE_KEY + '-last-item-id') || 0,
  last_project_id: window.localStorage.getItem(STORAGE_KEY + '-last-project-id') || 0,
  current_user: JSON.parse(window.localStorage.getItem(STORAGE_KEY + '-current-user') || null),
  current_project: JSON.parse(window.localStorage.getItem(STORAGE_KEY + '-current-project') || null)
}

export const mutations = {
  createUser (state, attrs) {
    state.current_user = new User(attrs.id, attrs.email)
  },

  createProject (state, attrs) {
    state.projects.push(new Project(
      ++state.last_project_id,
      attrs['name']
    )
    )
  },

  createList (state, attrs) {
    state.lists.push(new List(
      ++state.last_list_id,
      attrs['title'],
      attrs['project_id']
    )
    )
  },

  destroyList (state, list) {
    state.lists.splice(state.lists.indexOf(list), 1)
  },

  toggleItem (state, item ) {
    item.done = !item.done
  },

  createItem (state, attrs) {
    state.items.push(new Item(
      ++state.last_item_id,
      attrs['label'],
      attrs['list_id']
    ))
  },

  destroyItem (state, { item }) {
    state.items.splice(state.items.indexOf(item), 1)
  },

  setCurrentProject (state, project) {
    state.current_project = project
  }
}

export const actions = {
  newProject (context, attrs) {
    axios({
      method: 'post',
      url: '/projects',
      data: qs.stringify({project: attrs})
    })
    context.commit('createProject', attrs)
  },

  newList (context, attrs) {
    context.commit('createList', attrs)
  },

  deleteList (context, list) {
    context.commit('destroyList', list)
  },

  deleteItem (context, item) {
    context.commit('destroyItem', item)
  },

  toggleItem (context, { item }) {
    item.done = !item.done
  },

  newItem (context, attrs) {
    context.commit('createItem', attrs)
  },

  changeCurrentProject (context, project) {
    context.commit('setCurrentProject', project)
  },

  loginUser (context, attrs) {
    axios({
      method: 'post',
      url: '/users/login',
      data: qs.stringify(attrs)
    })
    .then(function (response) {
      context.commit('createUser', response.data.user)
      router.push('/')
    })
    .catch(function (error) {
      console.log(error)
    });
  },

  checkItem (context, item) {
    context.commit('toggleItem', item)
  }
}

export const getters = {
  itemsForList: (state) => (listId) => {
    return state.items.filter((i) => { return i.listId === listId })
  },

  getCurrentLists: (state) => {
    return state.lists.filter((l) => { return l.project_id === state.current_project.id })
  },

  getProject: (state) => (projectId) => {
    return state.projects.filter(project =>  project.id == projectId)[0]
  },

  getUser: (state) => {
    return state.current_user
  }
}
