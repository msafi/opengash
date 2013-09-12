describe('server configurations:', function () {
  var request = require('supertest');
  var app = require('../server.js');
  var fs = require('fs');

  it('should be possible to reach stuff in /client/ through homepage root URL', function (done) {

    // Put a file in /client/.
    fs.writeFile('../../client/dummy.txt', '', function (err) {
      if (err) throw err;

      // request this file through the root URL
      request(app).get('/dummy.txt').expect(200).end(function(err) {
        if (err) return done(err);

        // Clean up
        fs.unlink('../../client/dummy.txt', done);
      });
    });
  });
});