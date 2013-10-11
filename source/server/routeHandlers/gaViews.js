var deps = require('./dependencies')
  , ogAccount = deps.OgAccount
  , verifyCsrf = deps.verifyCsrf

module.exports = function(req, res) {
  if (!verifyCsrf(req, res))
    return false

  var userEmail = req.signedCookies.loggedIn;
  ogAccount.getGaViews(userEmail, function(gaViews) {
    var response

    if (gaViews) {
      response = gaViews
      res.ogRender(response);
    }
    else {
      response = ''
      res.send(response);
    }
  });
}