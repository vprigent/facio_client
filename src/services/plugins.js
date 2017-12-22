import { STORAGE_KEY } from './mutations'

const localStoragePlugin = store => {
  store.subscribe((mutation, { lists, items, last_item_id, last_list_id }) => {
    window.localStorage.setItem(STORAGE_KEY + '-items', JSON.stringify(items))
    window.localStorage.setItem(STORAGE_KEY + '-lists', JSON.stringify(lists))
    window.localStorage.setItem(STORAGE_KEY + '-list-last-id', last_list_id)
    window.localStorage.setItem(STORAGE_KEY + '-item-last-id', last_item_id)
  })
}

export default [localStoragePlugin]
