export const STORAGE_KEY = 'facio-webclient'

export const state = {
  items: JSON.parse(window.localStorage.getItem(STORAGE_KEY + '-items') || '[]'),
  lists: JSON.parse(window.localStorage.getItem(STORAGE_KEY + '-lists') || '[]'),
  last_item_id: 0,
  last_list_id: 0
}

export const mutations = {
  createList (state, attrs) {
    state.lists.push({
      id: ++state.last_list_id,
      title: attrs['title']
    })
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
    state.items.push({
      id: ++state.last_item_id,
      label: attrs['label'],
      list_id: attrs['list_id']
    })
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
  }
}

export const getters = {
  itemsForList: (state) => (listId) => {
    return state.items.filter((i) => { return i.list_id === listId })
  }
}
