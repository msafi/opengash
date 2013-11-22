module.exports = {
  error: null,
  saveUserCalls: 0,
  saveUser: function(user, callback) {
    this.saveUserCalls++
    callback(this.error)
  },
  getGaViewsCalls: undefined,
  getGaViewsResponse: undefined,
  getGaViews: function(userEmail, callback) {
    var response

    switch(userEmail) {
      case 'existingViews@example.com':
        response = [{name:'foo', id:1}, {name:'bar', id:2}]
        this.getGaViewsResponse = response
        callback(response)
        break
      case 'missingViews@example.com':
        response = ''
        this.getGaViewsResponse = response
        callback(response)
        break
    }
  },
  saveViewsCalls: undefined,
  saveViewsResponse: undefined,
  saveViews: function(userEmail, views, callback) {
    var response

    switch (userEmail) {
      case 'existingAccount@example.com':
        response = 1
        this.saveViewsResponse = response
        callback(null, response)
        break
      case 'missingAccount@example.com':
        response = 0
        this.saveViewsResponse = response
        callback(null, response)
        break
    }
  }
}