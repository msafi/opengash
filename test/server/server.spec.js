"use strict"
var base = require('./pathBase')
var app = require(base + './server.js');
var request = require('supertest')(app);
var fs = require('fs');

describe('server configurations:', function () {
  it('should be possible to reach stuff in /client/ through homepage root URL', function (done) {

    // Put a file in /client/.
    fs.writeFile(__dirname + '/' + base + '../client/dummy.txt', '', function (err) {
      if (err) throw err;

      // request this file through the root URL
      request.get('/dummy.txt').expect(200).end(function(err) {
        if (err) return done(err);

        // Clean up
        fs.unlink(__dirname + '/' + base + '../client/dummy.txt', done);
      });
    });
  });
});