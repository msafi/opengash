var OgConnect = require('../ogConnect'),
	config = require('../config'),
	i = require('util').inspect;

var ogConnect = new OgConnect(config.clientId, config.clientSecret, config.redirectUrl);
var ogDb = app.ogDb;

exports.home = function (req, res) {
	res.ogRender('index');
};

exports.authenticate = function (req, res) {

	ogConnect.requestAccessToken(req.query.code, function(err, _res, body) {
		// Get user basic information.
		var accessToken = JSON.parse(body);

		var url = 'https://www.googleapis.com/oauth2/v1/userinfo';
		ogConnect.callApi(accessToken.access_token, url, function(err, _res, body) {
			var user = JSON.parse(body);
			user.id = parseInt(user.id);
			user.verified_email = (user.verified_email) ? 1 : 0;

			// Find a user in the database by their ID and upsert.
			ogDb.collection.update({"user.id": user.id}, {user: user}, {upsert:true}, function(err, results) {
				if (err)
					res.end(i(err));

				res.cookie('loggedIn', '1', {maxAge: 631138519494}); // 20 years in milliseconds.
				res.cookie('accessToken', accessToken.access_token, {maxAge:accessToken.expires_in * 1000});
				res.redirect('/');
			});
		});
	});
};

exports.post = function(req, res) {
	console.log(i(req, {colors: true}));
	debugger;
}