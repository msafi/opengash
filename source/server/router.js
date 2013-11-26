var handlers = require('./routeHandlers')
var config = require('./config')

// todo: write tests for this module
module.exports = function (app) {
  app.get(config.relativeRedirectUrl, handlers.authenticate)

  app.get('/api/authurl', handlers.authUrl)

  app.get('/api/ga-views', handlers.gaViews)
  app.post('/api/ga-views', handlers.gaSaveViews)

  app.get('/api/user-data', handlers.userData)

  app.get('*', handlers.home)
}