'use strict'

describe('userData', function() {
  var userData
  var rh = require('./dependencies')

  beforeEach(function() {
    userData = rh.rewire(rh.base + 'userData')

    userData.__set__('verifyCsrf', rh.verifyCsrf)
    userData.__set__('ogAccount', rh.ogAccount)

    rh.req.cookies.csrf = 123
    rh.req.query.csrf = 123

    rh.res.ogRenderValues = []
    rh.res.sendValues = []
  })

  it('should return false when the request is unauthorized', function(done) {
    rh.req.cookies.csrf = 123
    rh.req.query.csrf = 124

    expect(userData(rh.req, rh.res)).to.be(false)
    done()
  })

//  it('should return an empty body when user is not found', function(done) {
//    rh.req.signedCookies.loggedIn = 'missinguser@example.com'
//    userData(rh.req, rh.res)
//    console.log(rh.res)
//    expect().to.be('')
//    done()
//  })
//
//  it('should return a views array in body when views are found', function(done) {
//    rh.req.signedCookies.loggedIn = 'existingViews@example.com'
//    expect(userData(rh.req, rh.res).user).to.have.property('name')
//    done()
//  })

})