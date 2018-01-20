export const itemsForList = state => (listId) => {
  return state.items.filter((i) => { return i.list_id === listId }).sort((i, j) => { return i.sequence > j.sequence })
}

export const getCurrentLists = state => {
  return state.lists.filter((l) => { return l.project_id === state.current_project.id }).sort((i, j) => { return i.sequence > j.sequence })
}

export const getProject = state => projectId => {
  return state.projects.filter(project => project.id === projectId)[0]
}

export const getItem = state => itemId => {
  return state.items.filter(item => item.id === itemId)[0]
}

export const getCurrentProject = state => {
  return state.current_project
}

export const getProjects = state => {
  return state.projects.sort((i, j) => { return i.sequence > j.sequence })
}

export const getUser = state => {
  return state.current_user
}
