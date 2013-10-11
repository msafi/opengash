var request = require('superagent')
  , Netmask = require('netmask').Netmask
  , exec = require('child_process').exec

module.exports = function(req, res) {
  request
    .get('https://api.github.com/meta')
    .end(function(gitHubResponse) {
      for (var i = 0; i < gitHubResponse.body.hooks.length; i++) {
        var block = new Netmask(gitHubResponse.body.hooks[i])
        if (block.contains(req.ip)) {
          res.send(200, 'Deployment script launched')
          // run script
          exec('sudo shjs deploy-script.js',{cwd: __dirname})
          return
        }
      }
      res.send(403)
    })
  return
}