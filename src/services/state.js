
export const STORAGE_KEY = 'facio-webclient'

export default () => ({
  items: JSON.parse(window.localStorage.getItem(STORAGE_KEY + '-items') || '[]'),
  lists: JSON.parse(window.localStorage.getItem(STORAGE_KEY + '-lists') || '[]'),
  projects: JSON.parse(window.localStorage.getItem(STORAGE_KEY + '-projects') || '[]'),
  current_user: JSON.parse(window.localStorage.getItem(STORAGE_KEY + '-current-user') || null),
  current_project: JSON.parse(window.localStorage.getItem(STORAGE_KEY + '-current-project') || null)
})
