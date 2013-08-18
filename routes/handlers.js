var OgConnect = require('../lib/ogConnect'),
	config = require('../config'),
	i = require('util').inspect;

/*
	The Views
	==========
	Stranger: when an unknown user requests /, simply show a "Connect to Google" button.
	That button will redirect to a special URL. The URL is provided by the OgConnect class.

	Dashboard: when a known user requests /.
 */
exports.home = function (req, res, ogdb) {

	ogConnect = new OgConnect(config.clientId, config.clientSecret, config.redirectUrl);

	res.render('home');
};

exports.authenticate = function (req, res, ogdb) {

	ogConnect = new OgConnect(config.clientId, config.clientSecret, config.redirectUrl);

	ogConnect.requestAccessToken(req.query.code, function(err, res, body) {
		// Get user basic information.
		var accessToken = JSON.parse(body).access_token;
		var url = 'https://www.googleapis.com/oauth2/v1/userinfo';
		ogConnect.callApi(accessToken, url, function(err, res, body) {
			console.log(body);
		});

		var url = 'https://www.googleapis.com/analytics/v3/management/accounts';
		ogConnect.callApi(accessToken, url, function(err, res, body) {
			var url = JSON.parse(body).items[0].selfLink + '/webproperties';
			ogConnect.callApi(accessToken, url, function(err, res, body) {
				console.log(i(JSON.parse(body), {colors:true}));
			});
		});
	});
};

exports.post = function(req, res) {
	console.log(i(req, {colors: true}));
	debugger;
}