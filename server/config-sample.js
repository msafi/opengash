// Enter real values then rename the file to config.js
var config = {}

// Google API configurations
config.clientID = 'Your client ID';
config.clientSecret = 'Your client secret';
config.redirectURL = 'Your redirect URL';

// App configurations
config.hostName = 'Your domain name, eg: opengash.com';
config.cookieSignature = 'Your unique cookies signature';
config.dbUri = 'URI to your MongoDB, something like mongodb://localhost:27017/opengash';

module.exports = config;