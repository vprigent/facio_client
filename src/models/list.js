import Record from './record'

export default class List extends Record {
  constructor (attrs) {
    super()

    this.id = attrs['id']
    this.title = attrs['title']
    this.project_id = attrs['project_id']
    this.sequence = attrs['sequence']
  }
}

List.attributes = ['title', 'project_id', 'sequence']
List.tableName = 'lists'
