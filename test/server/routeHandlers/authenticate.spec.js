describe('authentication', function() {
  var authenticate

  before(function() {
    authenticate = require('../' + base + 'routeHandlers/authenticate')
  })
  it('should pass authentication through verifyCsrf first', function(done) {
    request
      .get(config.relativeRedirectUrl)
      .expect(401, done)
  })

  describe('success', function() {
    it('should save user to database', function(done) {
      request
        .get(config.relativeRedirectUrl)
        .set('Cookie', 'csrf=123')
        .query({'csrf': '123'})
        .end(function() {
          ogAccount.findAccount('example@example.com', function(account) {
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
        .end(function(err, res) {
          var cookies = qs.parse(res.headers['set-cookie'].toString(), ',')
          expect(cookies).to.have.property('loggedIn')
          expect(cookies).to.have.property('accessToken')
          expect(res.headers['location']).to.be('/')

          done()
        })
    })
  })
})