var OgGaApi = require('../ogGaApi'),
	config = require('../config'),
	i = require('util').inspect,
	qs = require('querystring'),
	verifyCsrf = require('../ogUtil').verifyCsrf,
	OgAccount = require('../ogAccount');

var ogGaApi = new OgGaApi(config.clientId, config.clientSecret, config.redirectUrl);

exports.home = function (req, res) {
	if (typeof req.signedCookies.loggedIn !== 'undefined' && typeof req.cookies.accessToken === 'undefined') {
		// User is logged in, but has an expired token. Redirect to authentication URL silently.
		res.redirect(307, ogGaApi.url(req.cookies.csrf));
	}
	else {
		res.ogRender('index');
	}
};

exports.authenticate = function (req, res) {

	verifyCsrf(req,res);

	ogGaApi.requestAccessToken(req.query.code, function(err, _res, body) {
		// Get user basic information.
		var accessToken = JSON.parse(body);

		var url = 'https://www.googleapis.com/oauth2/v1/userinfo';
		ogGaApi.call(accessToken.access_token, url, function(err, _res, body) {
			var user = JSON.parse(body);
			user.id = parseInt(user.id);
			user.verified_email = (user.verified_email) ? 1 : 0;

			// Find a user in the database by their ID and upsert.
			OgAccount.saveUser(user, function(err, _results) {
				if (err)
					res.end(i(err));

				res.cookie('loggedIn', user.email, {maxAge: 631138519494, signed: true}); // 20 years in milliseconds.
				res.cookie('accessToken', accessToken.access_token, {maxAge:accessToken.expires_in * 1000});
				res.redirect(302, '/');
			});
		});
	});
};

exports.authUrl = function(req, res) {
	var data = {
		url: ogGaApi.url(req.cookies.csrf)
	}
	res.ogRender(data);
}

exports.gaViews = function(req, res) {
	verifyCsrf(req,res);
	var userEmail = req.signedCookies.loggedIn;
	OgAccount.getGaViews(userEmail, function(gaViews) {

		if (gaViews) {
			res.ogRender(gaViews);
		}
		else {
			res.end('');
		}
	});
}

exports.gaSaveViews = function(req,res) {
	verifyCsrf(req,res);
	var userEmail = req.signedCookies.loggedIn;
	OgAccount.saveViews(userEmail, req.body);
}

exports.post = function(req, res) {
	console.log(i(req, {colors: true}));
	debugger;
}