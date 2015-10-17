var deps = require('./dependencies')
var ogAccount = deps.OgAccount
var verifyCsrf = deps.verifyCsrf

module.exports = function(req, res) {
  if (!verifyCsrf(req, res))
    return false

  var userEmail = req.signedCookies.loggedIn
  ogAccount.getUser(userEmail, function(user) {
    var response

    if (user) {
      response = user
      res.ogRender(response)
    }
    else {
      response = ''
      res.send(response)
    }
  })
}