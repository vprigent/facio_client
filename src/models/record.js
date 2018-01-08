import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = 'http://localhost:4000/'
axios.defaults.withCredentials = true

export default class Record {

}

Record.create = function (context, attrs) {
  var resourceName = this.name.toLowerCase()
  var attributes = {}
  attributes[resourceName] = this.attributesHash(attrs)

  var self = this

  return axios({
    method: 'post',
    url: '/' + this.tableName,
    data: qs.stringify(attributes)
  })
  .then(function (response) {
    context.commit('create' + self.name, new self(response.data.data))
  })
  .catch(function (error) {
    console.log(error)
  })
}

Record.update = function () {
  // todo
}

Record.destroy = function (context, id) {
  var self = this

  return axios({
    method: 'delete',
    url: '/' + this.tableName + '/' + id
  })
  .then(function (response) {
    context.commit('destroy' + self.name, id)
  })
  .catch(function (error) {
    console.log(error)
  })
}

Record.attributesHash = function (attrs) {
  var hash = {}

  for (var i = 0; i < this.attributes.length; i++) {
    if (attrs[this.attributes[i]] !== undefined) {
      hash[this.attributes[i]] = attrs[this.attributes[i]]
    }
  }

  return hash
}
