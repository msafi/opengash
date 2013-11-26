"use strict"

var MongoClient = require('mongodb').MongoClient
  , async = require('async')
  , config = require('./config')


// todo: the use of `async` here is probably faulty. Fix it.
var connect = function (callback) {
  MongoClient.connect(config.dbUri, function (err, ogDb) {
    async.series([
      function () {
        callback(err, ogDb)
      },
      function () {
        ogDb.close()
      }
    ]);
  });
}


module.exports.saveUser = function (user, callback) {
  connect(function (err, ogDb) {
    if (err) {
      callback(err);
    }
    else {
      ogDb.collection('ogAccount').update({"user.email": user.email}, {$set: {user: user}}, {upsert: true}, function (err, results) {
        callback(err, results);
      });
    }
  });
}


module.exports.getGaViews = function (email, callback) {
  connect(function (err, ogDb) {
    ogDb.collection('ogAccount').findOne({"user.email": email}, function (err, ogAccount) {
      try {
        var gaViews = ogAccount.gaViews
        if (gaViews.length > 0)
          callback(gaViews, err)
        else
          callback(null, err)
      }
      catch (e) {
        callback(null, err)
      }
    })
  })
}

// todo: make it type-check array for 'views'
module.exports.saveViews = function (email, views, callback) {

  // Create a new array with unique values
  var arrUniqueViews = []
  views.forEach(function(view) {
    var isUnique = true
    arrUniqueViews.forEach(function(uniqueView) {
      if (view.id === uniqueView.id)
        isUnique = false
    })
    if (isUnique)
      arrUniqueViews.push(view)
  })

  connect(function (err, ogDb) {
    ogDb.collection('ogAccount').update({"user.email": email}, {$set: {gaViews: arrUniqueViews}}, function (err, results) {
      callback(err, results)
    })
  })
}


module.exports.deleteAccount = function(email, callback) {
  if (typeof email != 'string') {
    var err = TypeError('First argument should be a string')

    callback(err)

    return
  }

  connect(function(err, ogDb) {
    ogDb.collection('ogAccount').remove({"user.email": email}, 0, function(err, results) {
      callback(err, results)
    })
  })
}

module.exports.getUser = function(email, cb) {
  connect(function(err, ogDb) {
    ogDb.collection('ogAccount').findOne({"user.email": email}, function(err, user) {
      cb(user, err)
    })
  })
}