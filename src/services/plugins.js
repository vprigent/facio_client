import { STORAGE_KEY } from './mutations'

const localStoragePlugin = store => {
  store.subscribe((mutation, { lists, items, projects, last_item_id, last_list_id, last_project_id, current_user }) => {
    window.localStorage.setItem(STORAGE_KEY + '-items', JSON.stringify(items))
    window.localStorage.setItem(STORAGE_KEY + '-lists', JSON.stringify(lists))
    window.localStorage.setItem(STORAGE_KEY + '-projects', JSON.stringify(projects))
    window.localStorage.setItem(STORAGE_KEY + '-last-list-id', last_list_id)
    window.localStorage.setItem(STORAGE_KEY + '-last-item-id', last_item_id)
    window.localStorage.setItem(STORAGE_KEY + '-last-project-id', last_project_id)
    window.localStorage.setItem(STORAGE_KEY + '-current-user', current_user)
  })
}

export default [localStoragePlugin]
