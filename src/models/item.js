export default class Item {
  constructor (id, label, listId) {
    this.id = id
    this.label = label
    this.done = false
    this.listId = listId
  }
}
