import Record from './record'

export default class Project extends Record {
  constructor (attrs) {
    super()

    this.id = attrs['id']
    this.name = attrs['name']
    this.sequence = attrs['sequence']
  }
}

Project.attributes = ['name', 'sequence']
Project.tableName = 'projects'
