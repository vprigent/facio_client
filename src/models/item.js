import Record from './record'

export default class Item extends Record {
  constructor (attrs) {
    super()

    this.id = attrs['id']
    this.label = attrs['label']
    this.done = false
    this.list_id = attrs['list_id']
  }
}

Item.attributes = ['label', 'done', 'list_id']
Item.tableName = 'items'
