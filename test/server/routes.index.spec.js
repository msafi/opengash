var reqBase = require('./reqBase')
  , expect = require('expect.js')

describe('route handling:', function() {
  var routes, handlers;

  before(function() {
    routes = require(reqBase + '../routes').definedRoutes;
    handlers = require(reqBase + '../routes/handlers');
  });

  it('should handle all defined routes by handlers.js functions', function(done) {
    for (var route in routes) {
      expect(handlers.hasOwnProperty(routes[route].handler)).to.be.true
    }
    done();
  });
});