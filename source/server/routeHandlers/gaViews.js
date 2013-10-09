var deps = require('./dependencies')
  , OgAccount = deps.OgAccount
  , verifyCsrf = deps.verifyCsrf

module.exports = function(req, res) {
  if (!verifyCsrf(req, res))
    return;

  var userEmail = req.signedCookies.loggedIn;
  OgAccount.getGaViews(userEmail, function(gaViews) {
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