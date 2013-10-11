describe('authentication', function() {
  var authenticate
    , rh = require('./dependencies')

  beforeEach(function() {
    authenticate = rh.rewire(rh.base + 'authenticate')

    authenticate.__set__('verifyCsrf', rh.verifyCsrf)
    authenticate.__set__('ogGaApi', rh.ogGaApi)
    authenticate.__set__('ogAccount', rh.ogAccount)
  })

  describe('failure', function() {
    it('should return false if verifyCsrf fails', function(done) {
      expect(authenticate(rh.req, rh.res)).to.be.false
      done()
    })
  })

  describe('success', function() {
    beforeEach(function() {
      // make verifyCsrf pass
      rh.req.query.csrf = '123'
      rh.req.cookies.csrf = '123'
    })

    it('should save user to database', function(done) {
      authenticate(rh.req,rh.res)
      expect(rh.ogAccount.saveUserCalls).to.be.greaterThan(0)
      done()
    })

    it('should set access token and log-in cookies and redirect to homepage', function(done) {
      authenticate(rh.req, rh.res)
      expect(rh.res.cookieValues[0].name).to.be('loggedIn')
      expect(rh.res.cookieValues[1].name).to.be('accessToken')
      done()
    })
  })
})