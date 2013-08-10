/*
 * GET home page.
 */
var googleapis = require('googleapis'),
	config = require('../config'),
	fs = require('fs');

var OAuth2Client = googleapis.OAuth2Client;

exports.home = function (req, res) {

	var oauth2Client =	new OAuth2Client(
		config.clientID,
		config.clientSecret,
		config.redirectURL);

	// We have an authorization code from Google Servers.
	// Get access token and refresh token.
	// Display data.
	if (req.query.code) {
		oauth2Client.getToken(req.query.code, function(err, tokens) {
			oauth2Client.credentials = tokens;

			googleapis
				.discover('plus', 'v1')
				.execute(function(err, client) {
//					debugger;
					client
						.plus.people.get({ userId: 'me' })
						.withAuthClient(oauth2Client)
						.execute(function printUserProfile(err, profile) {
							if (err) {
								profile = err;
							}
							res.render('data', { data: profile });
						});
				});
		});
	}
	// If user is logged in, check for access token
	else {

		var url = oauth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: 'https://www.googleapis.com/auth/plus.me',
			response_type: 'code'
		});

		res.render('connect', { title: 'opengash', url: url });
	}
};

exports.authenticate = function (req, res) {
	res.render('authenticate', { body: req.params });
};