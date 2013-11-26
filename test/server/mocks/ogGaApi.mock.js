var qs = require('querystring');

function OgGaApi(clientId, clientSecret, redirectUrl) {
  this.clientId = clientId;
  this.clientSecret = clientSecret;
  this.redirectUrl = redirectUrl;

  return this;
}


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

OgGaApi.prototype.requestAccessToken = function (code, callback) {

  var googleResponse = '{ "access_token": 123, "id_token": 321, "expires_in": 3600, "token_type": "Bearer" }'

  callback(JSON.parse(googleResponse))
}

OgGaApi.prototype.call = function (_accessToken, apiUrl, callback) {
  var response;

  switch (apiUrl) {
    case 'https://www.googleapis.com/oauth2/v1/userinfo':
      response = '{ "id": "1234123412341234", "email": "example@example.com", "verified_email": true, "hd": "msafi.com" }'
      break;
    case 'https://www.googleapis.com/analytics/v3/management/accounts/~all/webproperties/~all/profiles':
      response = '{ "id": "1234123412341234", "email": "example@example.com", "verified_email": true, "hd": "msafi.com" }'
  }

  callback(JSON.parse(response));
}

module.exports = OgGaApi;