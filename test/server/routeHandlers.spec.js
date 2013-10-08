'use strict'
var reqBase = require('./reqBase')
  , mockery = require('mockery')

mockery.enable({ warnOnReplace: false, warnOnUnregistered: false, useCleanCache: true })
mockery.registerSubstitute('./ogGaApi', '../../test/server/mocks/mock.ogGaApi')
mockery.registerSubstitute('./ogUtil', '../../test/server/mocks/mock.ogUtil')

var ogAccount = require(reqBase + '../ogAccount')
  , app = require(reqBase + '../server.js')
  , config = require(reqBase + '../config.js')

  , request = require('supertest')(app)
  , expect = require('expect.js')
  , qs = require('querystring')
  , sign = require('express/node_modules/cookie-signature').sign
  , urlParser = require('url')
  , async = require('async')

  , signedEmail = "s:" + sign('example@example.com', config.cookieSignature) // Mimic Express cookie signing
  , secondSignedEmail = "s:" + sign('fake@example.com', config.cookieSignature)

describe('handlers:', function() {
  after(function (done) {
    mockery.deregisterAll()
    mockery.disable()

    ogAccount.deleteAccount('example@example.com', function () {
      done()
    })
  })

  describe('authentication', function () {

    it ('should pass authentication through verifyCsrf first', function(done) {
      request
        .get(config.relativeRedirectUrl)
        .expect(401, done)
    })

    describe('success', function() {

      it('should save user to database', function (done) {
        request
          .get(config.relativeRedirectUrl)
          .set('Cookie', 'csrf=123')
          .query({'csrf': '123'})
          .end(function () {
            ogAccount.findAccount('example@example.com', function (account) {
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
          .end(function (err, res) {
            var cookies = qs.parse(res.headers['set-cookie'].toString(), ',')
            expect(cookies).to.have.property('loggedIn')
            expect(cookies).to.have.property('accessToken')
            expect(res.headers['location']).to.be('/')

            done()
          })
      })
    })
  })

  describe('home', function() {
    it('should redirect to Google if user is logged in but has an expired token', function(done) {
      request
        .get('/')
        .set('Cookie', 'loggedIn=' + signedEmail + '; csrf=123')
        .query({csrf: '123'})
        .expect(307)
        .end(function(err, res) {
          var redirectLocation = urlParser.parse(res.headers['location']).hostname
          expect(redirectLocation).to.be('accounts.google.com')
          done()
        })
    })

    it('should otherwise serve index', function(done) {
      async.series(
        [
          // Authenticated user with a fresh/valid token
          function(cb) {
            request
              .get('/')
              .set('Cookie', 'loggedIn=' + signedEmail + '; csrf=123; accessToken=123')
              .query({csrf: '123'})
              .expect(200)
              .end(function(err, res) {
                cb(err, res)
              })
          },
          // A new, unidentified user
          function(cb) {
            request
              .get('/')
              .expect(200)
              .end(function (err, res) {
                cb(err, res)
              })
          }
        ],
          function(err, results) {
            expect(results[0].redirect).to.be(false)
            expect(results[1].redirect).to.be(false)
            done()
          }
      )
    })
  })

  describe('authUrl', function() {
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

  describe('gaViews', function() {
    it('should return an empty body when views are not found', function(done) {
      request
        .get('/api/ga-views/json')
        .set('Cookie', 'loggedIn=' + secondSignedEmail + '; csrf=123')
        .query({csrf: '123'})
        .end(function(err, res) {
          expect(res.body).to.be.empty()
          done()
        })
    })

    it('should return a views array in body when views are found', function (done) {
      // Create a user with saved views
      ogAccount.saveUser({id: 1, email: 'example@example.com'}, function() {
        ogAccount.saveViews('example@example.com', [{name: 'view name', id: '123'}], function() {
          request
            .get('/api/ga-views/json')
            .set('Cookie', 'loggedIn=' + signedEmail + '; csrf=123')
            .query({csrf: '123'})
            .end(function (err, res) {
              expect(res.body[0]).to.have.property('name')
              done()
            })
        })
      })
    })
  })

  describe('gaSaveViews', function() {

    it('should save views to an account if account is found by its email', function(done) {
      // Save a new user first
      ogAccount.saveUser({id:1, email:'example@example.com'}, function() {
        request
          .post('/api/ga-views/json')
          .set('Cookie', 'loggedIn=' + signedEmail + '; csrf=123')
          .query({csrf: '123'})
          .send([{name: 'xyz', id: 1}])
          .end(function () {
            // Check if views indeed have been saved.
            ogAccount.getGaViews('example@example.com', function(gaViews) {
              expect(gaViews[0]).to.have.property('name', 'xyz')
              done()
            })
          })
      })
    })

    it('should return {results: 0} when trying to save to unavailable account', function (done) {
      request
        .post('/api/ga-views/json')
        .set('Cookie', 'loggedIn=' + secondSignedEmail + '; csrf=123')
        .query({csrf: '123'})
        .send([{name: 'xyz', id: 1}])
        .end(function (err ,res) {
          expect(res.body.results).to.be(0)
          done()
        })
    })
  })
})