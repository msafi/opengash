"use strict";
var expect = require('expect.js')
var app = require('../server.js')
var request = require('supertest')(app)

describe('handlers:', function() {
  var handlers = require('../routes/handlers')

  describe('home', function() {
    var req, res, sideEffect

    beforeEach(function () {
      req = {
        signedCookies: {loggedIn: 'value'},
        cookies: {accessToken: 'value'}
      };

      res = {
        ogRender: function (template) {
          sideEffect = template;
        },
        redirect: function (status) {
          sideEffect = status
        }
      };
    });

    it ('should redirect to "index" when loggedIn and accessToken both have values', function(done) {
      handlers.home(req, res);
      expect(sideEffect).to.equal('index');
      done();
    });

    it('should redirect to auth URL with 307 status if loggedIn is defined but accessToken is not defined', function(done) {
      delete req.cookies.accessToken;
      handlers.home(req,res);
      expect(sideEffect).to.equal(307);
      done();
    });

    it ('should return "index" when both loggedIn and accessToken are undefined', function(done) {
      delete req.signedCookies.loggedIn;
      delete req.cookies.accessToken;
      handlers.home(req, res);
      expect(sideEffect).to.equal('index');
      done();
    });
  })

  describe('authenticate', function() {
    var req, res, sideEffect

    beforeEach(function() {
      req = {
        query: {csrf: 1},
        cookies: {csrf: 1}
      }
      res = {
        send: function(status) {
          sideEffect = status;
        }
      }

    })

    it ("shouldn't authenticate when cookie CSRF doesn't match query CSRF", function(done) {
      delete req.cookies.csrf;
      handlers.authenticate(req,res)
      expect(sideEffect).to.equal(401)
      done()
    })
  })

  describe("authUrl", function() {
    var req, res, sideEffect

    beforeEach(function() {
      req = {cookies:{csrf:1}}
      res = {
        ogRender: function(data) {
          sideEffect = data;
        }
      }
    })
    it("should have an object side-effect", function(done) {
      handlers.authUrl(req,res)
      expect(sideEffect).be.an('object')
      done()
    })
  })

  describe('gaViews', function() {
    it('should respond with a JSON of user views if user is logged in and has saved views', function(done) {
      request
        .get('/api/ga-views/json')
        .set('Accept', 'application/json')
        .set('Set-Cookie', '')

    })
  })

  describe.skip('gaSaveViews', function() {
    var ogAccount = require('../ogAccount')
    var req, user
    beforeEach(function(done) {

      user = {"id": 1, "email": "signed@user.eml"}

      req = {
        query: {csrf: 1},
        cookies: {csrf: 1},
        signedCookies: {loggedIn: 'signed@user.eml'},
        body: [{"name": "foo", "id": 1234}]
      }

      ogAccount.saveUser(user, function () {
        done()
      })

    })

    it('should save an array of objects given in `req.body`', function(done) {
      handlers.gaSaveViews(req, res)
    })

    afterEach(function(done) {
      ogAccount.deleteAccount(user.email, function() {
        done()
      })
    })

  })
})