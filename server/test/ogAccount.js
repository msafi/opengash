'use strict'
var expect = require('expect.js')

describe('ogAccount', function() {
  var ogAccount = require('../ogAccount');
  describe('deleteAccount', function() {
    var user, gaViews
    before(function(done) {
      user = {
        id: 1,
        email: 'signed@user.eml'
      }

      gaViews = [{"name": "my name", "id": "1234"}]

      ogAccount.saveUser(user, function() {
        ogAccount.saveViews(user.email, gaViews, function() {
          done();
        })
      })
    })

    it ('should only accept a string as the first parameter', function(done) {
      ogAccount.deleteAccount({"user.email": 'some@email.eml'}, function(err) {
        expect(err.name).to.be('TypeError')
        done()
      })
    })

    it('should delete user account with a given email', function(done) {
      ogAccount.deleteAccount(user.email, function() {
        ogAccount.getGaViews(user.email, function(gaViews) {
          expect(gaViews).to.be(null)
          done()
        })
      })
    })
  })
})