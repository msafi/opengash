/**
 * This is the entry point of the app.
 *
 * This file sets up the server and configures it.
 *
 * @namespace server
 */
var express = require('express')
  , http = require('http')
  , config = require('./config')
  , ogUtil = require('./ogUtil')
  , cachePeriod = 31557600000 // one year

if (process.env.NODE_ENV == 'development')
  cachePeriod = 0

var app = express()

// all environments
app.set('port', process.env.PORT || 80)
app.set('views', __dirname + '/../client')
app.set('view engine', 'ejs')

app.use(express.logger('dev'))
app.use(express.json())
app.use(express.urlencoded())
app.use(express.methodOverride())
app.use(express.cookieParser(config.cookieSignature))
app.use(express.cookieSession({secret: config.cookieSignature}))
app.use(ogUtil.csrf)
app.use(express.compress())
app.use('/', express.static(__dirname + '/../client', { maxAge: cachePeriod }))
app.use('/docs', express.static(__dirname + '/../docs', { maxAge: cachePeriod }))
app.use(app.router)

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler())
}

require('./router')(app)

http.createServer(app).listen(app.get('port'), config.hostName, function () {
  console.log('Express server listening on port ' + app.get('port'))
})

module.exports = app