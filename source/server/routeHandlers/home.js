var deps = require('./dependencies')
  , ogGaApi = deps.ogGaApi

module.exports = function(req, res) {
  if (typeof req.signedCookies.loggedIn !== 'undefined' &&
      typeof req.cookies.accessToken === 'undefined') {
    // User is logged in, but has an expired token. Redirect to authentication URL silently.
    res.redirect(307, ogGaApi.url(req.cookies.csrf))
  }
  else {
    res.ogRender('index')
  }
}