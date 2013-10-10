'use strict'

describe('home', function() {
  it('should redirect to Google if user is logged in but has an expired token', function(done) {
    request
      .get('/')
      .set('Cookie', 'loggedIn=' + signedEmail + '; csrf=123')
      .query({csrf: '123'})
      .expect(307)
      .end(function(err, res) {
        var redirectLocation = urlParser.parse(res.headers['location']).hostname
        expect(redirectLocation).to.be('accounts.google.com')
        done()
      })
  })

  it('should otherwise serve index', function(done) {
    async.series(
      [
        // Authenticated user with a fresh/valid token
        function(cb) {
          request
            .get('/')
            .set('Cookie', 'loggedIn=' + signedEmail + '; csrf=123; accessToken=123')
            .query({csrf: '123'})
            .expect(200)
            .end(function(err, res) {
              cb(err, res)
            })
        },
        // A new, unidentified user
        function(cb) {
          request
            .get('/')
            .expect(200)
            .end(function(err, res) {
              cb(err, res)
            })
        }
      ],
      function(err, results) {
        expect(results[0].redirect).to.be(false)
        expect(results[1].redirect).to.be(false)
        done()
      }
    )
  })
})