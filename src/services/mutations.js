import axios from 'axios'
import qs from 'qs'
import uuid from 'uuid/v4'

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
  current_user: JSON.parse(window.localStorage.getItem(STORAGE_KEY + '-current-user') || null),
  current_project: JSON.parse(window.localStorage.getItem(STORAGE_KEY + '-current-project') || null)
}

export const mutations = {
  createUser (state, attrs) {
    state.current_user = new User(attrs.id, attrs.email)
  },

  createProject (state, project) {
    state.projects.push(project)
  },

  createList (state, list) {
    state.lists.push(list)
  },

  destroyList (state, list) {
    state.lists.splice(state.lists.indexOf(list), 1)
  },

  toggleItem (state, item ) {
    item.done = !item.done
  },

  createItem (state, item) {
    state.items.push(item)
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
    Project.create(context, attrs)
  },

  newList (context, attrs) {
    List.create(context, attrs)
  },

  newItem (context, attrs) {
    Item.create(context, attrs)
  },

  deleteList (context, list) {
    context.commit('destroyList', list)
  },

  deleteItem (context, item) {
    context.commit('destroyItem', item)
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
    return state.items.filter((i) => { return i.list_id === listId })
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
