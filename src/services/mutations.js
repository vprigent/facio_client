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
  current_user: JSON.parse(window.localStorage.getItem(STORAGE_KEY + '-current-user') || null)
}

export const mutations = {
  createUser (state, attrs) {
    state.current_user = new User(attrs.id, attrs.email)
  },

  createProject (state, attrs) {
    state.projects.push(new Project(
      ++state.last_project_id,
      attrs['title']
    )
    )
  },

  createList (state, attrs) {
    state.lists.push(new List(
      ++state.last_list_id,
      attrs['title']
    )
    )
  },

  destroyList (state, list) {
    state.lists.splice(state.lists.indexOf(list), 1)
  },

  updateList (state, { list, attrs }) {
    list.title = attrs['title']
  },

  toggleItem (state, { item }) {
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

  updateItem (state, { item, attrs }) {
    item.label = attrs['label']
  },

  toggleAll (state, { done }) {
    state.items.forEach((todo) => {
      todo.done = done
    })
  }
}

export const actions = {
  newProject (context, attrs) {
    context.commit('createProject', attrs)
  },

  newList (context, attrs) {
    context.commit('createList', attrs)
  },

  deleteList (context, list) {
    context.commit('destroyList', list)
  },

  editList (context, { list, attrs }) {
    context.commit('updateList', list, attrs)
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
  }
}

export const getters = {
  itemsForList: (state) => (listId) => {
    return state.items.filter((i) => { return i.listId === listId })
  },

  getProject: (state) => (projectId) => {
    return state.projects.map(project =>  project.id == projectId)[0]
  },

  getUser: (state) => {
    return state.current_user
  }
}
