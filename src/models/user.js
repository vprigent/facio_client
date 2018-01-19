import Record from './record'

export default class User extends Record {
  constructor (id, email, token) {
    super()

    this.id = id
    this.email = email
    this.token = token
  }
}
