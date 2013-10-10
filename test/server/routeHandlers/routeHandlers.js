describe('routeHandlers', function() {
  var base = require('../pathBase')
  var handlers = require('../' + base + './routeHandlers')

  it('should have a deploy method', function() {
    expect(handlers.deploy).to.be.true
  })
})