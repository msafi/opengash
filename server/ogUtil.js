var express = require('express');

// Extend express.response object with a method called ogRender
module.exports = express.response.ogRender = function (template, data) {

	if (this.req.url.substr(1, 3) == 'api' && this.req.url.substr(-4, 4) == 'json') {
		// API request
		this.req.res.json(data);
	} else {
		// Human request
		this.req.res.render(template, data);
	}
};