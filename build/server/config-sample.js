/**
 * Manages the configurations of opengash.
 *
 * Replace the strings in this file with your own values then rename it to `config.js`
 *
 * @namespace server.config
 *
 * @property clientID             {string} Google API client ID
 * @property clientSecret         {string} Google API client secret
 * @property redirectUrl          {string} Google OAuth 2.0 redirect URL.
 * @property relativeRedirectUrl  {string} Your redirect URL again. This time use a relative path. i.e `/authenticate`
 *
 * @property hostName             {string} The domain name where you intend to host opengash app
 * @property cookieSignature      {string} A unique string to be used as a cookie signature
 * @property dbUri                {string} URI to your MongoDB. It can be a local DB or a cloud DB
 */
var config = {};

config.clientID = 'Your client ID';
config.clientSecret = 'Your client secret';
config.redirectUrl = 'http://dev.opengash.com/authenticate';
config.relativeRedirectUrl = '/authenticate';

config.hostName = 'opengash.com';
config.cookieSignature = 'Your random & unique cookie signature';
config.dbUri = 'mongodb://localhost:27017/opengash';

module.exports = config;