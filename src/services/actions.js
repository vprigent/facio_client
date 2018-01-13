import axios from 'axios'
import qs from 'qs'

import router from '@/router'
import Project from '@/models/project.js'
import List from '@/models/list.js'
import Item from '@/models/item.js'

axios.defaults.baseURL = 'http://localhost:4000/'
axios.defaults.withCredentials = true

export const newProject = (context, attrs) => {
  Project.create(context, attrs)
}

export const newList = (context, attrs) => {
  List.create(context, attrs)
}

export const newItem = (context, attrs) => {
  Item.create(context, attrs)
}

export const updateItem = (context, attrs) => {
  Item.update(context, attrs)
}

export const deleteList = (context, list) => {
  List.destroy(context, list.id)
}

export const deleteItem = (context, item) => {
  Item.destroy(context, item.id)
}

export const deleteProject = (context, project) => {
  Project.destroy(context, project.id)
}

export const loginUser = (context, attrs) => {
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
  })
}

export const logoutUser = (context, attrs) => {
  axios({
    method: 'delete',
    url: '/users/logout'
  })
  .then(function (response) {
    context.commit('deleteUser')
  })
  .catch(function (error) {
    console.log(error)
  })
}

export const checkItem = (context, item) => {
  updateItem(context, {record: item, done: !item.done})
}
