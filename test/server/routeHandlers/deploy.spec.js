describe.only('deploy handler', function() {

  var base = require('../pathBase')
  var deploy = require('../' + base + './routeHandlers/deploy.js')

  xit('should respond with `forbidden` to non-GitHub requests', function(done) {
    request.get('/deploy').expect(403).end(done)
  })

  it('should retrieve a fresh list of GitHub API IPs', function(done) {
    var superagent = require('superagent')

    deploy()
    superagent.results
    ''
  })
})