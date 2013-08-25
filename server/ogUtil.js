var express = require('express'),
		qs = require('querystring');

// Extend express.response object with a method called ogRender
module.exports = express.response.ogRender = function (template, data) {

	if (this.req.url.substr(1, 3) == 'api' && this.req.url.substr(-4, 4) == 'json') {
		// API request
		if (arguments.length === 1) {
			this.req.res.json(template); // "template" is actually "data" if only one parameter is passed.
		}
		else {
			this.req.res.json(data);
		}
	} else {
		// Human request
		this.req.res.render(template, data);
	}
};

module.exports.csrf = function (req, res, next) {
	if (typeof req.cookies.csrf === 'undefined') {
		var uid = function () {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
				var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			});
		}
		res.cookie('csrf', uid(), {maxAge: 631138519494}); // 20 years in milliseconds.
	}
	next();
}

module.exports.verifyCsrf = function(req,res) {
	if (qs.parse(req.query.state).csrf !== req.cookies.csrf &&
	req.query.csrf !== req.cookies.csrf) {
		res.send(401, 'Unable to authorize. Make sure you accept cookies.');
	}
}