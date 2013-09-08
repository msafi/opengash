/**
 * Contains a list of URL paths and the functions that handle them.
 *
 * Those functions are in {@link request.handlers}
 *
 * @namespace url.index
 */

var routes = require('./handlers');
    config = require('../config');

/**
 * This is a list of routes/URLs to be intercepted and handled by {@link request.handlers}
 */
module.exports = function (app) {
  app.get('/', routes.home);

  app.get(config.relativeRedirectUrl, routes.authenticate);

  app.get('/api/authurl/json', routes.authUrl);

  app.get('/api/ga-views/json', routes.gaViews);
  app.post('/api/ga-views/json', routes.gaSaveViews);
};