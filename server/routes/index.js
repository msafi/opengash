// Load the route handlers
var routes = require('./handlers');

module.exports = function(app) {
	app.get('/', routes.home);

	app.get('/authenticate', routes.authenticate);

	app.get('/api/authurl/json', routes.authUrl);

	app.get('/api/ga-views/json', routes.gaViews);
	app.post('/api/ga-views/json', routes.gaSaveViews);
};