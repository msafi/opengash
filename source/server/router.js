/**
 * Contains a list of URL paths and the functions that handle them.
 *
 * Those functions are in {@link request.handlers}
 *
 * @namespace url.index
 */

var handlers = require('./routeHandlers')
var config = require('./config')

var definedRoutes = {
  home: {
    path: '/', handler: 'home', method: 'get'
  },
  googleRedirectUrl: {
    path: config.relativeRedirectUrl, handler: 'authenticate', method: 'get'
  },
  authUrl: {
    path: '/api/authurl/json', handler: 'authUrl', method: 'get'
  },
  getGaViews: {
    path: '/api/ga-views/json', handler: 'gaViews', method: 'get'
  },
  postGaViews: {
    path: '/api/ga-views/json', handler: 'gaSaveViews', method: 'post'
  }
}

exports.definedRoutes = definedRoutes

module.exports = function (app) {
  for (var route in definedRoutes) {
    app[definedRoutes[route].method](definedRoutes[route].path, handlers[definedRoutes[route].handler])
  }
}