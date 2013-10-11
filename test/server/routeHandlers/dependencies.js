var rootBase = require('../pathBase');
var OgGaApi = require('../mocks/ogGaApi.mock')
var ogGaApi = new OgGaApi('foo', 'bar', 'baz')

exports.base = '../' + rootBase + 'routeHandlers/'
exports.rewire = require('rewire')
exports.verifyCsrf = require('../mocks/ogUtil.mock').verifyCsrf
exports.req = require('../mocks/req.mock')
exports.res = require('../mocks/res.mock')
exports.ogGaApi = ogGaApi
exports.ogAccount = require('../mocks/ogAccount.mock')