// Load the route handlers
var routes = require('./handlers');

module.exports = function(app) {
	app.get('/', routes.home);

	app.get('/authenticate', routes.authenticate);

	app.get('/api/authurl/json', routes.authUrl);

	app.get('/api/gaviews/json', routes.gaViews);
};