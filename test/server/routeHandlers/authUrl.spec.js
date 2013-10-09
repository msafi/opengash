var mockery = require('mockery')

mockery.enable({ warnOnReplace: false, warnOnUnregistered: false, useCleanCache: true })
mockery.registerSubstitute('../ogGaApi', '../../../test/server/mocks/ogGaApi.mock')
mockery.registerSubstitute('../ogUtil', '../../../test/server/mocks/ogUtil.mock')

var base = require('../pathBase')
  , ogAccount = require('../' + base + './ogAccount')
  , app = require('../' + base + './server.js')
  , config = require('../' + base + './config.js')

  , request = require('supertest')(app)
  , expect = require('expect.js')

describe('authUrl', function() {
  after(function() {
    mockery.deregisterAll()
    mockery.disable()
  })

  it('should only return a JSON with a URL property in the body', function(done) {
    request
      .get('/api/authurl/json')
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        expect(res.body).to.have.property('url')
        done()
      })
  })
})