import Record from './record'

export default class Item extends Record {
  constructor (attrs) {
    super()

    this.id = attrs['id']
    this.label = attrs['label']
    this.description = attrs['description']
    this.sequence = attrs['sequence']
    this.done = attrs['done']
    this.list_id = attrs['list_id']
  }

  updateSequence (sequence) {
    this.sequence = sequence
  }
}

Item.attributes = ['label', 'done', 'description', 'sequence', 'list_id']
Item.tableName = 'items'
