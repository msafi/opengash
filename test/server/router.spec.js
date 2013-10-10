var base = require('./pathBase')
  , expect = require('expect.js')
  , app = require('./mocks/app.mock')
  , router = require(base + './router')

describe('route handling:', function() {
  it('should know about /deploy route', function(done) {
    router(app)
    expect(app.paths['/deploy']).to.be.true
    done()
  })
})