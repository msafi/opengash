'use strict'

describe('gaViews', function() {
  var gaViews
    , rh = require('./dependencies')

  beforeEach(function() {
    gaViews = rh.rewire(rh.base + 'gaViews')

    gaViews.__set__('verifyCsrf', rh.verifyCsrf)
    gaViews.__set__('ogAccount', rh.ogAccount)

    rh.req.cookies.csrf = 123
    rh.req.query.csrf = 123
  })

  it('should return false when the request is unauthorized', function(done) {
    rh.req.cookies.csrf = 123
    rh.req.query.csrf = 124

    expect(gaViews(rh.req, rh.res)).to.be.false
    done()
  })

  it('should return an empty body when views are not found', function(done) {
    rh.req.signedCookies.loggedIn = 'missingViews@example.com'
    gaViews(rh.req, rh.res)
    expect(rh.ogAccount.getGaViewsResponse).to.be('')
    done()
  })

  it('should return a views array in body when views are found', function(done) {
    rh.req.signedCookies.loggedIn = 'existingViews@example.com'
    gaViews(rh.req, rh.res)
    expect(rh.ogAccount.getGaViewsResponse[0]).to.have.property('name')
    done()
  })
})