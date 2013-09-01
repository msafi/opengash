/**
 * Module dependencies.
 */
var express = require('express'),
	http = require('http'),
	path = require('path'),
	config = require('./config'),
	i = require('util').inspect,
	fs = require('fs'),
	ogUtil = require('./ogUtil');

// Global 'app'. Accessible across files.
app = express();

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', '../client');
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser(config.cookieSignature));
app.use(express.cookieSession({secret: config.cookieSignature}));
app.use(ogUtil.csrf);
app.use(express.static('../client'));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

var routes = require('./routes')(app);

http.createServer(app).listen(app.get('port'), config.hostName, function () {
	console.log('Express server listening on port ' + app.get('port'));
});