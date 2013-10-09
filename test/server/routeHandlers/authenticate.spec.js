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
  , qs = require('querystring')
  , async = require('async')

describe('authentication', function() {
  after(function() {
    mockery.deregisterAll()
    mockery.disable()
  })

  it('should pass authentication through verifyCsrf first', function(done) {
    request
      .get(config.relativeRedirectUrl)
      .expect(401, done)
  })

  describe('success', function() {

    it('should save user to database', function(done) {
      request
        .get(config.relativeRedirectUrl)
        .set('Cookie', 'csrf=123')
        .query({'csrf': '123'})
        .end(function() {
          ogAccount.findAccount('example@example.com', function(account) {
            var user = account.user
            expect(user).to.have.property('email', 'example@example.com')
            done()
          })
        })
    })

    it('should set access token and log-in cookies and redirect to homepage', function(done) {
      request
        .get(config.relativeRedirectUrl)
        .set('Cookie', 'csrf=123') // mock verifyCsrf always sets 123 as csrf unique ID
        .query({'csrf': '123'})
        .expect(302)
        .end(function(err, res) {
          var cookies = qs.parse(res.headers['set-cookie'].toString(), ',')
          expect(cookies).to.have.property('loggedIn')
          expect(cookies).to.have.property('accessToken')
          expect(res.headers['location']).to.be('/')

          done()
        })
    })
  })
})