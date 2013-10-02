"use strict"

/**
 * Provides the database functions to CRUD opengash accounts.
 *
 * To get an idea of what the schema might look like, see SCHEMA.md in the `docs/static` folder.
 *
 * @namespace ogAccount
 */
var MongoClient = require('mongodb').MongoClient
  , async = require('async')
  , config = require('./config')

/**
 * A helper function that:
 *
 * 1. Opens a database connection
 * 2. Executes the callback function
 * 3. Closes the database connection.
 *
 * To ensure flow-control, it uses Node.js async module.
 *
 * See other functions in this module for how it is used.
 *
 * @param callback {function} The function to be executed upon connecting to the database.
 *
 * @function ogAccount.connect
 */
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



/**
 * Saves a parsed JSON object, `user`, to the database. Then, executes a callback function.
 *
 * It uses `user.id` to find out if the record already exists in the database. If so, it updates it.
 * If the record isn't found, a new record is created.
 *
 * @param user {object} a parsed JSON object.
 * @param callback {function} a function to be executed upon success or failure.
 *
 * @function ogAccount.saveUser
 */
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


/**
 * Retrieves the Google Analytics profiles, aka views, of a user and passes the results array to a callback function.
 *
 * The results array looks like:
 *
 * ```
 * [{"Property Name", "id:12345678"}]
 * ```
 *
 * @param email {string} the user email string to query the database
 * @param callback {function} a callback function to do something with the returned results.
 *
 * @function ogAccount.getGaViews
 */
module.exports.getGaViews = function (email, callback) {
  connect(function (err, ogDb) {
    ogDb.collection('ogAccount').findOne({"user.email": email}, function (err, ogAccount) {
      try {
        var gaViews = ogAccount.gaViews;
        callback(gaViews, err);
      }
      catch (e) {
        callback(null, err);
      }
    });
  });
}



/**
 * Saves a user's selected views to the database. It finds the user by the provided email.
 *
 * The views are saved as an array of parsed JSON objects under the field `gaViews`.
 *
 * @param email {string} search query
 * @param views {object} parsed JSON object
 * @param callback {function} function to let you do something with the results.
 *
 * @function ogAccount.saveViews
 */
// todo: make it type-check array for 'views'
module.exports.saveViews = function (email, views, callback) {
  connect(function (err, ogDb) {
    ogDb.collection('ogAccount').update({"user.email": email}, {$set: {gaViews: views}}, function (err, results) {
      callback(err, results);
    });
  });
}


/**
 * Takes an email of user and deletes it from the database.
 *
 * @param email {string} Of the user to be deleted.
 * @param callback {function} do something after deleting the user
 *
 * @function ogAccount.deleteUser
 */
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

/**
 * Takes an email and passes either ogAccount or null to callback
 *
 * @param email {string} to be searched for
 * @param callback {function} to be called back
 *
 * @function ogAccount.findAccount
 */
module.exports.findAccount = function(email, callback) {
  connect(function(err, ogDb) {
    ogDb.collection('ogAccount').findOne({"user.email": email}, function(err, results) {
      if (err) throw err
      callback(results)
    })
  })
}