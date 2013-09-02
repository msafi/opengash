var should = require('should'),
  http = require('http'),
  config = require('../config');

describe('Loading', function () {
  describe('application', function () {
    it('should be successful', function (done) {
      http.request('http://' + config.hostName,function (res) {
        res.on('data', function () {
          res.statusCode.should.equal(200);
          done();
        });
      }).end();
    });
  });
});

// Yay I do testing!!
// Actually, I don't know how to really test software. :(
// Maybe I'll come back to testing later on...