var reqBase = require('./reqBase')
  , ogUtil = require(reqBase + '../ogUtil')
  , expect = require('expect.js')

describe('ogUtil:', function() {

  describe('ogRender', function() {
    var response

    var fakeExpress = {
      req: {
        res: {
          json: function() {
            response = 'json'
          },
          render: function() {
            response = 'render'
          }
        },
        path: ''
      }
    }

    it('should augment express.response object', function(done) {
      var express = require('express')
      expect(express.response.ogRender).to.be.a('function')
      done()
    })

    it('should return JSON when path begins with /api/ and ands with /json', function(done) {
      fakeExpress.req.path = '/api/path/json'
      ogUtil.ogRender.apply(fakeExpress)
      expect(response).to.be('json')
      done()
    })

    it('should render given template when path does not begin with /api/ and ends with /json', function(done) {
      fakeExpress.req.path = '/some/fake/path'
      ogUtil.ogRender.apply(fakeExpress)
      expect(response).to.be('render')
      done()
    })
  })

  describe('csrf', function() {
    var fakeReq, fakeRes

    before(function() {
      fakeReq = {
        cookies: {}
      }

      fakeRes = {
        cookie: function (cookieName, cookieValue, cookieAge) {
          fakeReq.cookies[cookieName] = { cookieValue: cookieValue, cookieAge: cookieAge }
        }
      }
    })

    it('should set a unique ID cookie if one does not already exist', function(done) {
      ogUtil.csrf(fakeReq, fakeRes, function() { // Since it's a middleware, it takes a callback
        expect(fakeReq.cookies.csrf).to.be.ok()
        done()
      })
    })

    it('should not overwrite csrf if one already exists', function(done) {
      var existingCsrf = fakeReq.cookies.csrf // Value from the previous test.

      ogUtil.csrf(fakeReq, fakeRes, function() {
        expect(existingCsrf).to.equal(fakeReq.cookies.csrf)
        done()
      })
    })
  })

  describe('verifyCsrf', function () {
    var fakeReq = {
      query: { csrf: 123 },
      cookies: { csrf: 321 }
    }
    var fakeRes = { send: function() {} }

    it('should return false if request csrf does not match cookie csrf or if cookie csrf does not exist', function(done) {
      expect(ogUtil.verifyCsrf(fakeReq, fakeRes)).to.be(false)

      delete fakeReq.cookies.csrf
      expect(ogUtil.verifyCsrf(fakeReq, fakeRes)).to.be(false)

      done()
    })

    it('should return true if request csrf matches cookie csrf', function (done) {
      fakeReq.query.csrf = 321
      fakeReq.cookies.csrf = 321
      expect(ogUtil.verifyCsrf(fakeReq, fakeRes)).to.be(true)
      done()
    })
  })
})