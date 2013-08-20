var OgConnect = require('../lib/ogConnect'),
	config = require('../config'),
	i = require('util').inspect;

var ogConnect = new OgConnect(config.clientId, config.clientSecret, config.redirectUrl);
var ogDb = app.ogDb;

exports.home = function (req, res) {
	if (req.signedCookies.loggedIn && req.signedCookies.accessToken) {

		// Check if properties are saved.
		if (true) {
			// Show properties.
		}
		if (false) {
			// Prompt to select properties
			var url = 'https://www.googleapis.com/analytics/v3/management/accounts';
			ogConnect.callApi(accessToken, url, function (err, res, body) {
				var url = JSON.parse(body).items[0].selfLink + '/webproperties';
				ogConnect.callApi(accessToken, url, function (err, res, body) {
//				console.log(i(JSON.parse(body), {colors:true}));
				});
			});
		}

		res.ogRender('gaViews', {msg:'Should render Google Analytics views...'})
	}
	else if (req.signedCookies.loggedIn && !req.signedCookies.accessToken) {
		res.redirect(ogConnect.url());
	}
	else {
		var data = {url: ogConnect.url()};
		res.ogRender('home', data);
	}
};

exports.authenticate = function (req, res) {
	ogConnect.requestAccessToken(req.query.code, function(err, res, body) {
		// Get user basic information.
		var accessToken = JSON.parse(body).access_token;
		accessToken.expiry = (parseInt(JSON.parse(body).expires_in) * 1000); // Convert Google's response to milliseconds.
		var url = 'https://www.googleapis.com/oauth2/v1/userinfo';
		ogConnect.callApi(accessToken, url, function(err, res, body) {

			var user = JSON.parse(body);
			user.id = parseInt(user.id);
			user.verified_email = (user.verified_email) ? 1 : 0;

			// Find a user in the database by their ID and upsert.
			ogDb.collection.update({"user.id": user.id}, {user: user}, {upsert:true}, function(err, results) {
				if (err)
					return false;

				res.cookie('loggedIn', true, {signed:true, maxAge: 631138519494}); // 20 years in milliseconds.
				res.cookie('accessToken', accessToken, {signed:true, maxAge:accessToken.expiry});

				res.redirect('/');
			});
		});
	});
};

exports.post = function(req, res) {
	console.log(i(req, {colors: true}));
	debugger;
}