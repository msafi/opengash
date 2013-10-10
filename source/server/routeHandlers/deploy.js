var request = require('superagent');

module.exports = function(req, res) {
  request
    .get('https://api.github.com/meta')
    .end(function(res) {
      ''
    })
}