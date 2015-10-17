describe('gaSaveViews', function() {
  var gaSaveViews
    , rh = require('./dependencies')

  beforeEach(function() {
    gaSaveViews = rh.rewire(rh.base + 'gaSaveViews')

    gaSaveViews.__set__('verifyCsrf', rh.verifyCsrf)
    gaSaveViews.__set__('ogAccount', rh.ogAccount)

    rh.req.query.csrf = 123
    rh.req.cookies.csrf = 123
  })

  it('should save views to an account if account is found by its email', function(done) {
    rh.req.body = [{name:'foo', id:1}, {name:'bar', id:2}]
    rh.req.signedCookies.loggedIn = 'existingAccount@example.com'

    gaSaveViews(rh.req, rh.res)
    expect(rh.res.jsonValues[0].body.results).toBe(1)
    done()
  })

  it('should return {results: 0} when trying to save to unavailable account', function(done) {
    rh.req.body = [{name:'foo', id:1}, {name:'bar', id:2}]
    rh.req.signedCookies.loggedIn = 'missingAccount@example.com'

    gaSaveViews(rh.req, rh.res)
    expect(rh.res.jsonValues[1].body.results).toBe(0)
    done()
  })
})