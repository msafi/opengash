after(function(done) {
  mockery.deregisterAll()
  mockery.disable()

  ogAccount.deleteAccount('example@example.com', function() {
    done()
  })
})