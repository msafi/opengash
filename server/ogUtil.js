/**
 * Miscellaneous utilities and helper functions for opengash app
 * @namespace ogUtil
 */

var express = require('express'),
    qs = require('querystring');

/**
 * Augments express.response (aka Node.js response) object. This function automatically
 * determines whether to respond with a template and JSON data or just a JSON based
 * on the request URL.
 * @function ogUtil.ogRender
 *
 * @param arg1 {object|string} This can either be a JSON object to be sent to the
 * browser. Or a template name for when the browser should respond with an HTML
 * file.
 *
 * @param [arg2] {object} This is used to provide data in a JSON format
 * when `arg1` is a template name.
 */
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



/**
 * A middleware that sets a cookie of a randomly generated UID value.
 * @function ogUtil.csrf
 *
 * @param req {object} express framework request object
 * @param res {object} express framework response object
 * @param next {object} the next function in the middleware chain
 */
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
};


/**
 * This function is used at the beginning of each request handler ({@link request.handlers})
 * to verify that the request contains a valid anti cross site request forgery token.
 *
 * It looks for a CSRF in the request query and compares it with the value of the CSRF
 * token in the cookies. If a match is found, things continue. Otherwise the process
 * gets aborted prematurely.
 *
 * @example
 * ```
 * ogUtil.verifyCsrf();
 * ```
 *
 * @param req {object} Node.js/express request object
 * @param res {object} Node.js/express response object
 *
 * @function ogUtil.verifyCsrf
 */
module.exports.verifyCsrf = function (req, res) {
  var sourcesOfCsrf = [qs.parse(req.query.state).csrf, req.query.csrf];

  if (sourcesOfCsrf.indexOf(req.cookies.csrf) == -1) {
    res.send(401, 'Unable to authorize. Make sure you accept cookies.');
  }
};