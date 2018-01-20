import Item from '@/models/item'
import Project from '@/models/project'
import List from '@/models/list'
import User from '@/models/user'

export const STORAGE_KEY = 'facio-webclient'

export default () => ({
  items: Item.parse(JSON.parse(window.localStorage.getItem(STORAGE_KEY + '-items') || '[]')),
  lists: List.parse(JSON.parse(window.localStorage.getItem(STORAGE_KEY + '-lists') || '[]')),
  projects: Project.parse(JSON.parse(window.localStorage.getItem(STORAGE_KEY + '-projects') || '[]')),
  current_user: User.parse(JSON.parse(window.localStorage.getItem(STORAGE_KEY + '-current-user'))),
  current_project: Project.parse(JSON.parse(window.localStorage.getItem(STORAGE_KEY + '-current-project') || '[]'))
})
