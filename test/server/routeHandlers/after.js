after(function(done) {
  var base = req('../pathBase')
  var ogAccount = require('../' + base + './ogAccount')

  ogAccount.deleteAccount('example@example.com', function() {
    done()
  })
})