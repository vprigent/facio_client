import Record from './record'

export default class Item extends Record {
  constructor (attrs) {
    super()

    this.id = attrs['id']
    this.label = attrs['label']
    this.description = attrs['description']
    this.sequence = attrs['sequence']
    this.done = false
    this.list_id = attrs['list_id']
  }
}

Item.attributes = ['label', 'done', 'description', 'sequence', 'list_id']
Item.tableName = 'items'
