describe('authUrl', function() {
  it('should only return a JSON with a URL property in the body', function(done) {
    request
      .get('/api/authurl/json')
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        expect(res.body).to.have.property('url')
        done()
      })
  })
})