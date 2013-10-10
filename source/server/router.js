var handlers = require('./routeHandlers')
var config = require('./config')

module.exports = function (app) {
  app.get('/', handlers.home)

  app.get(config.relativeRedirectUrl, handlers.authenticate)

  app.get('/api/authurl/json', handlers.authUrl)

  app.get('/api/ga-views/json', handlers.gaViews)
  app.post('/api/ga-views/json', handlers.gaSaveViews)

  app.get('/deploy', handlers.deploy)
}