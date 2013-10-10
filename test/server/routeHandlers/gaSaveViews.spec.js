describe('gaSaveViews', function() {
  it('should save views to an account if account is found by its email', function(done) {
    // Save a new user first
    ogAccount.saveUser({id: 1, email: 'example@example.com'}, function() {
      request
        .post('/api/ga-views/json')
        .set('Cookie', 'loggedIn=' + signedEmail + '; csrf=123')
        .query({csrf: '123'})
        .send([
          {name: 'xyz', id: 1}
        ])
        .end(function() {
          // Check if views indeed have been saved.
          ogAccount.getGaViews('example@example.com', function(gaViews) {
            expect(gaViews[0]).to.have.property('name', 'xyz')
            done()
          })
        })
    })
  })

  it('should return {results: 0} when trying to save to unavailable account', function(done) {
    request
      .post('/api/ga-views/json')
      .set('Cookie', 'loggedIn=' + secondSignedEmail + '; csrf=123')
      .query({csrf: '123'})
      .send([
        {name: 'xyz', id: 1}
      ])
      .end(function(err, res) {
        expect(res.body.results).to.be(0)
        done()
      })
  })
})