// Load the route handlers
var routes = require('./handlers');

module.exports = function(app) {
	app.get('/', routes.home);
	app.get('/api/json', routes.home);

	app.get('/authenticate', routes.authenticate);
	app.get('/api/authenticate/json', routes.authenticate)
};