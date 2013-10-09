'use strict'
var base = require('./pathBase')
  , OgGaApi = require(base + './ogGaApi')
  , config = require(base + './config')
  , ogGaApi = new OgGaApi(config.clientId, config.clientSecret, config.redirectUrl)
  , expect = require('expect.js')
  , urlUtils = require('url')

describe('ogGaApi:', function () {

  // These tests send real requests to Google API, so there is latency.
  // So let's increase the default timeout threshold from 2 seconds
  // to 5 seconds. for these specific unit tests.
  this.timeout(9000)

  it('should have a valid client ID, secret key, and redirect URL', function(done) {
    expect(ogGaApi.clientId && ogGaApi.clientSecret && ogGaApi.redirectUrl).to.be.ok()
    done()
  })

  describe('url', function () {
    it('should return a link to accounts.google.com without state when an argument is not specified', function(done) {
      var url = ogGaApi.url()
      url = urlUtils.parse(url)
      expect(url.hostname).to.be('accounts.google.com')
      expect(url.query.indexOf('state')).to.be(-1)
      done()
    })

    it('should return a link to accounts.google.com with state when an argument is not specified', function (done) {
      var url = ogGaApi.url('secretToken')
      url = urlUtils.parse(url)
      expect(url.hostname).to.be('accounts.google.com')
      expect(url.query.indexOf('state')).to.not.be(-1)
      done()
    })
  })

  describe('requestAccessToken', function () {
    it('should post an access token request to Google', function(done) {
      ogGaApi.requestAccessToken('none', function(accessToken) {
        expect(accessToken).to.have.property('error', 'invalid_grant')
        done()
      })
    })
  })

  describe('call', function () {
    it('should send an API request to Google', function(done) {
      var url = 'https://www.googleapis.com/oauth2/v1/userinfo';
      ogGaApi.call('none', url, function(results) {
        expect(results).to.have.property('error')
        done()
      })
    })
  })
})

