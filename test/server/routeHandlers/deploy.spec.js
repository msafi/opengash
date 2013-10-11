describe('deploy', function() {
  var deploy, request
    , rh = require('./dependencies')
    , execValue

  beforeEach(function() {
    deploy = rh.rewire(rh.base + 'deploy')

    request = require('../mocks/superagent.mock')
    deploy.__set__('request', request)
    deploy.__set__('exec', function(path) {
      execValue = path
    })
  })

  it('should get a fresh list of IPs from GitHub', function(done) {
    deploy(rh.req, rh.res)
    expect(request.response.body.hooks.length).to.be.greaterThan(1)
    done()
  })

  it('should respond with 403 and return false if the requesting IP is not GitHub', function(done) {
    rh.req.ip = "127.0.0.1"
    rh.res.sendValues.length = 0
    deploy(rh.req, rh.res)
    expect(rh.res.sendValues[0].status).to.be(403)
    done()
  })

  it('should run the deployment script if IP found to be of GitHub', function(done) {
    rh.req.ip = '192.30.252.10'
    rh.res.sendValues.length = 0
    deploy(rh.req, rh.res)
    expect(rh.res.sendValues[0].message).to.be('Deployment script launched')
    expect(execValue.substr(-16, execValue.length)).to.be('deploy-script.js')
    done()
  })
})