'use strict'
var base = require('./pathBase')
  , expect = require('expect.js')

describe('ogAccount:', function() {
  var ogAccount = require(base + './ogAccount')
  jasmine.getEnv().defaultTimeoutInterval = 9000


//  afterEach(function(done) {
//    ogAccount.deleteAccount('example@example.com', function() {
//      done()
//    })
//  })

  describe('saveUser', function() {
    it ('should use a unique email to insert a user in the database', function(done) {
      ogAccount.saveUser({id: 1, email: 'example@example.com'}, function(err, results) {
        expect(results).to.be(1)
        done()
      })
    })

    // it ('should upsert if email already exists')
    // todo: test this by saving twice, deleting once. Now trying to find a user should fail.
  })

  describe('getGaViews', function() {
    it('should return user views if they exist', function(done) {
      ogAccount.saveUser({id: 1, email: 'example@example.com'}, function() {
        ogAccount.saveViews('example@example.com', [{name: 'xyz', id: '123'}], function() {
          ogAccount.getGaViews('example@example.com', function(gaViews) {
            expect(gaViews[0]).to.have.property('name', 'xyz')
            done()
          })
        })
      })
    })

    it('should return null if views do not exist', function(done) {
      ogAccount.saveUser({id: 1, email: 'example@example.com'}, function () {
        ogAccount.getGaViews('example@example.com', function (gaViews) {
          expect(gaViews).to.be(null)
          done()
        })
      })
    })
  })

  describe('getUser', function() {
    it('should return entire user document if it exists', function(done) {
      ogAccount.saveUser({id: 1, email: 'example@example.com'}, function() {
        ogAccount.saveViews('example@example.com', [{name: 'xyz', id: '123'}], function() {
          ogAccount.getUser('example@example.com', function(userDocument) {
            expect(userDocument.user.id).to.be(1)
            done()
          })
        })
      })
    })

    it('should return null if user document does not exist', function(done) {
      ogAccount.getUser('foobar@example.com', function (userDocument) {
        expect(userDocument).to.be(null)
        done()
      })
    })
  })

  describe('saveViews', function () {
    it('should save provided value to the `gaViews` field of the user', function (done) {
      // User already exist from the previous test.
      ogAccount.saveViews('example@example.com', [{name: 'foobar', id: 1}], function() {
        ogAccount.getUser('example@example.com', function(account) {
          expect(account.gaViews[0]).to.have.property('name', 'foobar')
          done()
        })
      })
    })
  })

  describe('deleteAccount', function() {
    var user, gaViews
    beforeEach(function(done) {
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