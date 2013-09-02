var express = require('express'),
  qs = require('querystring');

// Extend express.response object with a method called ogRender.
// It inspects the URL. If it's an API call, sends JSON.
// Otherwise, it uses the default express res.render()
module.exports = express.response.ogRender = function (arg1, arg2) {

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

module.exports.verifyCsrf = function (req, res) {
  if (qs.parse(req.query.state).csrf !== req.cookies.csrf &&
    req.query.csrf !== req.cookies.csrf) {
    res.send(401, 'Unable to authorize. Make sure you accept cookies.');
  }
}