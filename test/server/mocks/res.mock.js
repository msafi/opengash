module.exports = {
  sendValues: [],
  send: function(status, message) {
    this.sendValues.push({status: status, message: message})
  },
  cookieValues: [],
  cookie: function(name, value, options) {
    this.cookieValues.push({name: name, value: value})
  },
  redirectValues: [],
  redirect: function(status, url) {
    this.redirectValues.push({status: status, url: url})
  },
  ogRenderValues: [],
  ogRender: function(arg1, arg2) {
    this.ogRenderValues.push({arg1: arg1, arg2: arg2})
  },
  jsonValues: [],
  json: function(status, body) {
    this.jsonValues.push({status: status, body: body})
  }
}