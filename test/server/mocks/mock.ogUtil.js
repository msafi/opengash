var express = require('express'),
    qs = require('querystring');

module.exports.ogRender = express.response.ogRender = function (arg1, arg2) {

  if (this.req.path.substr(1, 3) == 'api' && this.req.path.substr(-4, 4) == 'json') {
    // API call. Send JSON.
    this.req.res.json(arg1);
  }
  else {
    // Human request
    this.req.res.render(arg1, arg2); // arg1 = template. arg2 = JSON data.
  }
};

module.exports.csrf = function (req, res, next) {
  if (typeof req.cookies.csrf === 'undefined') {
    res.cookie('csrf', 123, {maxAge: 631138519494}); // 20 years in milliseconds.
  }
  next();
};

module.exports.verifyCsrf = function (req, res) {
  var sourcesOfCsrf = [qs.parse(req.query.state).csrf, req.query.csrf];

  if (sourcesOfCsrf.indexOf(req.cookies.csrf) == -1 || typeof req.cookies.csrf == 'undefined') {
    res.send(401, 'Unable to authorize. Make sure you accept cookies.');
    return false;
  }

  return true;
};