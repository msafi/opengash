describe('routeHandlers', function() {
  var rh = require('./dependencies')
  var handlers = require(rh.base)

  it('should have a deploy method', function(done) {
    expect(handlers.deploy).to.be.true
    done()
  })
})