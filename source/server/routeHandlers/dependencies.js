exports.verifyCsrf = require('../ogUtil').verifyCsrf
exports.OgAccount = require('../ogAccount')

var OgGaApi = require('../ogGaApi')
  , config = require('../config')
exports.ogGaApi = new OgGaApi(config.clientId, config.clientSecret, config.redirectUrl)