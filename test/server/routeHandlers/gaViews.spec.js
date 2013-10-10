describe('gaViews', function() {
  it('should return an empty body when views are not found', function(done) {
    request
      .get('/api/ga-views/json')
      .set('Cookie', 'loggedIn=' + secondSignedEmail + '; csrf=123')
      .query({csrf: '123'})
      .end(function(err, res) {
        expect(res.body).to.be.empty()
        done()
      })
  })

  it('should return a views array in body when views are found', function(done) {
    // Create a user with saved views
    ogAccount.saveUser({id: 1, email: 'example@example.com'}, function() {
      ogAccount.saveViews('example@example.com', [
        {name: 'view name', id: '123'}
      ], function() {
        request
          .get('/api/ga-views/json')
          .set('Cookie', 'loggedIn=' + signedEmail + '; csrf=123')
          .query({csrf: '123'})
          .end(function(err, res) {
            expect(res.body[0]).to.have.property('name')
            done()
          })
      })
    })
  })
})