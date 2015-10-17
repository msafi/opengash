describe('authUrl', function() {
  var authUrl
    , rh = require('./dependencies')

  beforeEach(function() {
    authUrl = rh.rewire(rh.base + 'authUrl')

    authUrl.__set__('ogGaApi', rh.ogGaApi)
  })

  it('should only return a JSON with a URL property in the body', function(done) {
    authUrl(rh.req, rh.res)

    expect(rh.res.ogRenderValues[0].arg1.url).toBeDefined()
    done()
  })
})