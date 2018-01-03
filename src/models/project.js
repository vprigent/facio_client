import Record from './record'

export default class Project extends Record {
  constructor (attrs) {
    super()

    this.id = attrs['id']
    this.name = attrs['name']
  }
}

Project.attributes = ['name']
Project.tableName = 'projects'
