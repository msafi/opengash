var deps = require('./dependencies')
  , ogAccount = deps.OgAccount
  , verifyCsrf = deps.verifyCsrf

module.exports = function(req, res) {

  if (!verifyCsrf(req, res))
    return;

  var userEmail = req.signedCookies.loggedIn;
  ogAccount.saveViews(userEmail, req.body, function(err, results) {
    if (err) {
      res.send(500)
      throw err
    }

    res.json(200, {results: results})
  });
}