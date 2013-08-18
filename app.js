/**
 * Module dependencies.
 */
var express = require('express'),
	http = require('http'),
	path = require('path'),
	config = require('./config');


var app = express();

// Database
var MongoClient = require('mongodb').MongoClient;

// First and foremost: connect to the database.
MongoClient.connect('mongodb://localhost:27017/opengash', function(err, ogdb) {
	if (err) throw err;

	// all environments
	app.set('port', process.env.PORT || 80);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser(config.cookieSignature));
	app.use(express.cookieSession({secret: config.cookieSignature}));
//	app.use(express.csrf());
	app.use("/public", express.static(__dirname + '/public'));
	app.use(app.router);

	// development only
	if ('development' == app.get('env')) {
		app.use(express.errorHandler());
	}

	var routes = require('./routes')(app);

	http.createServer(app).listen(app.get('port'), config.hostName, function () {
		console.log('Express server listening on port ' + app.get('port'));
	});
});