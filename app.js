/**
 * Module dependencies.
 */
var express = require('express')
	, routes = require('./routes')
	, http = require('http')
	, path = require('path')
	, mongoose = require('mongoose')
	, config = require('./config');

var app = express();

mongoose.connect('mongodb://localhost/data', function(err) {
	if (err) {
		throw err;
	}
});

var Schema = mongoose.Schema
	, ObjectId = Schema.ObjectId;

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.home);
app.post('/authenticate', routes.authenticate);

http.createServer(app).listen(app.get('port'), config.hostName, function () {
	console.log('Express server listening on port ' + app.get('port'));
});