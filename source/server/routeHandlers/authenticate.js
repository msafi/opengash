var deps = require('./dependencies')
  , ogGaApi = deps.ogGaApi
  , ogAccount = deps.OgAccount
  , verifyCsrf = deps.verifyCsrf

module.exports = function(req, res) {

  if (!verifyCsrf(req, res) || (req.query.error !== undefined)) {
    res.redirect(302, '/signup-error')
    return false
  }

  ogGaApi.requestAccessToken(req.query.code, function(accessToken) {
    // Get user basic information.
    var url = 'https://www.googleapis.com/oauth2/v1/userinfo'
    ogGaApi.call(accessToken.access_token, url, function(user) {

      // Find a user in the database by their ID and upsert.
      ogAccount.saveUser(user, function(err) {
        if (err) throw err

        res.cookie('loggedIn', user.email, {maxAge: 631138519494, signed: true}) // 20 years in milliseconds.
        res.cookie('accessToken', accessToken.access_token, {maxAge: accessToken.expires_in * 1000})
        res.redirect(302, '/')
      })
    })
  })
}