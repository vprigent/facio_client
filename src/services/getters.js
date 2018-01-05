export const itemsForList = state => (listId) => {
  return state.items.filter((i) => { return i.list_id === listId })
}

export const getCurrentLists = state => {
  return state.lists.filter((l) => { return l.project_id === state.current_project.id })
}

export const getProject = state => projectId => {
  return state.projects.filter(project => project.id === projectId)[0]
}

export const getCurrentProject = state => {
  return state.current_project
}

export const getProjects = state => {
  return state.projects
}

export const getUser = state => {
  return state.current_user
}
