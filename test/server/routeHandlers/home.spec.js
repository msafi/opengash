'use strict'

describe('home', function() {
  var home
    , rh = require('./dependencies')

  beforeEach(function() {
    home = rh.rewire(rh.base + 'home')

    home.__set__('ogGaApi', rh.ogGaApi)
  })

  it('should redirect to Google if user is logged in but has an expired token', function(done) {
    rh.req.signedCookies.loggedIn = 123
    rh.req.cookies.accessToken = undefined

    rh.res.redirectValues.length = 0
    home(rh.req, rh.res)

    var url = require('url')
    expect(url.parse(rh.res.redirectValues[0].url).hostname).to.be('accounts.google.com')
    done()
  })

  it('should otherwise serve index', function(done) {
    // both loggedIn and accessToken cookies are undefined
    rh.req.cookies.accessToken = undefined
    rh.req.signedCookies.loggedIn = undefined

    rh.res.ogRenderValues.length = 0

    home(rh.req, rh.res)

    rh.res.ogRenderValues

    expect(rh.res.ogRenderValues[0].arg1).to.be('index')

    // accessToken exists but not loggedIn!
    rh.req.cookies.accessToken = 123
    home(rh.req, rh.res)

    expect(rh.res.ogRenderValues[1].arg1).to.be('index')

    done()
  })
})