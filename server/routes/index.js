// Load the route handlers
var routes = require('./handlers');

module.exports = function(app) {
	app.get('/', routes.home);
	app.get('/api/json', routes.home);

	app.get('/authenticate', routes.authenticate);
};