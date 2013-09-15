/**
 * The functions that handle incoming requests.
 *
 * Each function is assigned to a URL by {@link url.index}
 *
 * @namespace request.handlers
 */

var OgGaApi = require('../ogGaApi');
var config = require('../config');
var verifyCsrf = require('../ogUtil').verifyCsrf;
var OgAccount = require('../ogAccount');

var ogGaApi = new OgGaApi(config.clientId, config.clientSecret, config.redirectUrl);

/**
 * Handles requests to root URL '/'
 *
 * If the user has a loggedIn cookie **but** an expired Google API access token, he is
 * automatically forwarded to Google to grant permission to opengash. In all other cases,
 * `index.ejs` is served. From there, AngularJS {@link controller.mainCtrl} on the
 * front-end determines what to display on the homepage.
 *
 * @param req {object} Node.js/express request object
 * @param res {object} Node.js/express response object
 *
 * @function request.handlers.home
 */
exports.home = function (req, res) {
  if (typeof req.signedCookies.loggedIn !== 'undefined' &&
  typeof req.cookies.accessToken === 'undefined') {
    // User is logged in, but has an expired token. Redirect to authentication URL silently.
    res.redirect(307, ogGaApi.url(req.cookies.csrf));
  }
  else {
    res.ogRender('index');
  }
};



/**
 * Handles requests to the URL that you specify as your Google API redirect URL
 * in {@link server.config}.
 *
 * When Google forwards your visitor to this URL, first an access token is
 * requested using {@link ogGaApi#requestAccessToken}. Using this access token,
 * an API call is made to Google using {@link ogGaApi#call} to get the visitor's
 * basic info, i.e. email, name, profile picture URL, etc.
 *
 * Upon the success of that call, {@link ogAccount.saveUser} is used to save the
 * user to the database. And when that succeeds, two cookies are given to the
 * user.
 *
 * 1. `loggedIn` to mark them as logged in. It lasts for 20 years.
 * 2. `accessToken` which is used to make further requests to the visitor's Google account.
 * This one lasts one hour only though because that's how long an access token is valid for.
 *
 * Finally, the user is redirected to the homepage with status of 302. Meaning `found`, I think.
 *
 * @param req {object} Node.js/express request object
 * @param res {object} Node.js/express response object
 *
 * @function request.handlers.authenticate
 */
exports.authenticate = function (req, res) {

  if (!verifyCsrf(req, res))
    return;

  ogGaApi.requestAccessToken(req.query.code, function (accessToken) {
    // Get user basic information.
    var url = 'https://www.googleapis.com/oauth2/v1/userinfo';
    ogGaApi.call(accessToken.access_token, url, function (user) {

      // Find a user in the database by their ID and upsert.
      OgAccount.saveUser(user, function (err) {
        if (err) throw err;

        res.cookie('loggedIn', user.email, {maxAge: 631138519494, signed: true}); // 20 years in milliseconds.
        res.cookie('accessToken', accessToken.access_token, {maxAge: accessToken.expires_in * 1000});
        res.redirect(302, '/');
      });
    });
  });
};



/**
 * This is an API request handler. It provides a JSON response containing
 * a Google OAuth 2.0 compatible URL using {@link ogGaApi#url}.
 *
 * @param req {object} Node.js/express request object
 * @param res {object} Node.js/express response object
 *
 * @function request.handlers.authUrl
 */
exports.authUrl = function (req, res) {
  var data = {
    url: ogGaApi.url(req.cookies.csrf)
  }
  res.ogRender(data);
}



/**
 * This is an API request handler. It looks for value of `loggedIn` cookie, which contains
 * the email of the logged in user. Then it uses that email to see if the user had
 * previously saved his Google Analytics profiles (aka views). If found,
 * the views are returned. Otherwise, an empty response is returned. The empty response
 * evaluates to false on the front-end, at {@link service.ogAccount} for example.
 *
 * @param req {object} Node.js/express request object
 * @param res {object} Node.js/express response object
 *
 * @function request.handlers.gaViews
 */
exports.gaViews = function (req, res) {
  if (!verifyCsrf(req, res))
    return;

  var userEmail = req.signedCookies.loggedIn;
  OgAccount.getGaViews(userEmail, function (gaViews) {
    var response

    if (gaViews) {
      response = gaViews
      res.ogRender(response);
    }
    else {
      response = ''
      res.end(response);
    }
  });
}



/**
 * This handler accepts a POST request. The POST is expected to carry
 * a JSON formatted array of views. The views are saved to the database
 * using {@link ogAccount.saveViews}. The user submitting this request
 * is identified by his `loggedIn` cookie, which has his email as its value.
 *
 * @param req {object} Node.js/express request object
 * @param res {object} Node.js/express response object
 *
 * @function request.handlers.gaSaveViews
 */
exports.gaSaveViews = function (req, res) {

  if (!verifyCsrf(req, res))
    return;

  var userEmail = req.signedCookies.loggedIn;
  OgAccount.saveViews(userEmail, req.body, function(err, results) {
    if (err) {
      res.send(500)
      throw err
    }

    res.json(200, {results: results})
  });
}