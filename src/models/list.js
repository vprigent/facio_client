import Record from './record'

export default class List extends Record {
  constructor (attrs) {
    super()

    this.id = attrs['id']
    this.title = attrs['title']
    this.project_id = attrs['project_id']
  }
}

List.attributes = ['title', 'project_id']
List.tableName = 'lists'
