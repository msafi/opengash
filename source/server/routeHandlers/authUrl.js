var deps = require('./dependencies')
  , ogGaApi = deps.ogGaApi

module.exports = function(req, res) {
  var data = {
    url: ogGaApi.url(req.cookies.csrf)
  }
  res.ogRender(data);
}