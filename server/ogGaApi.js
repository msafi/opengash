/*
 You give this class your Google client ID, client secret,
 and redirect URL, and it'll do things with Google Analytics
 API and Google OAuth 2.0 login.

 TODOs:
 ======
 * Validate ID Tokens using Google's public certificates

 */
var request = require('request');
var qs = require('querystring');

function OgGaApi(clientId, clientSecret, redirectUrl) {
  this.clientId = clientId;
  this.clientSecret = clientSecret;
  this.redirectUrl = redirectUrl;
}

/*
 Accepts an optional CSRF token and returns a string that contains the URL
 that the user should follow in order to authenticate with Google.
 */
OgGaApi.prototype.url = function (csrf) {
  var params = {
    client_id: this.clientId,
    response_type: "code",
    scope: "email https://www.googleapis.com/auth/analytics.readonly https://www.googleapis.com/auth/userinfo.profile",
    redirect_uri: this.redirectUrl
  }
  if (csrf) params.state = "csrf=" + csrf;
  if (process.env.NODE_ENV !== 'production') params.prompt = 'consent';

  return "https://accounts.google.com/o/oauth2/auth?" + qs.stringify(params);
}

/*
 POST an access token request to Google.
 Allow the caller to execute a callback function.
 */
OgGaApi.prototype.requestAccessToken = function (code, callback) {
  var params = {
    code: code,
    client_id: this.clientId,
    client_secret: this.clientSecret,
    redirect_uri: this.redirectUrl,
    grant_type: 'authorization_code'
  }
  var url = "https://accounts.google.com/o/oauth2/token";

  request.post({url: url, form: params}, function (err, res, body) {
    callback(err, res, body);
  });
}

/*
 Sends a GET request to specified API.
 Executes callback.
 */
OgGaApi.prototype.call = function (accessToken, apiUrl, callback) {
  var qs = {access_token: accessToken};
  request.get({url: apiUrl, qs: qs}, function (err, res, body) {
    callback(err, res, body);
  });
}

module.exports = OgGaApi;