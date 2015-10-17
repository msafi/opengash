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
      expect(authenticate(rh.req, rh.res)).toBe(false)
      done()
    })

    it('should return false if query contains error', function(done) {
      rh.req.query.csrf = '123'
      rh.req.cookies.csrf = '123'
      rh.req.query.error = true

      expect(authenticate(rh.req, rh.res)).toBe(false)
      done()
    })
  })

  describe('success', function() {
    beforeEach(function() {
      rh.req.query.csrf = '123'
      rh.req.cookies.csrf = '123'
      delete rh.req.query.error
    })

    it('should save user to database', function(done) {
      authenticate(rh.req,rh.res)
      expect(rh.ogAccount.saveUserCalls).toBeGreaterThan(0)
      done()
    })

    it('should set access token and log-in cookies and redirect to homepage', function(done) {
      authenticate(rh.req, rh.res)
      expect(rh.res.cookieValues[0].name).toBe('loggedIn')
      expect(rh.res.cookieValues[1].name).toBe('accessToken')
      done()
    })
  })
})