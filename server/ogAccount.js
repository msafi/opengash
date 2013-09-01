/*
	Provides the database functions to CRUD with opengash accounts.
	To get an idea of what the schema might look like, see SCHEMA.md
	in the docs folder.
*/
var MongoClient = require('mongodb').MongoClient;
var async = require('async');

var connect = function(callback) {
	MongoClient.connect('mongodb://localhost:27017/opengash', function (err, ogDb) {
		// I guess this ensures I only close the DB after all callbacks are done? I hope!
		async.series([
			function() { callback(err, ogDb); },
			function() { ogDb.close(); }
		]);
	});
}

module.exports.saveUser = function(user, callback) {
	connect(function (err, ogDb) {
		if (err) {
			callback(err);
		}
		else {
			ogDb.collection('ogAccount').update({"user.id": user.id}, {$set: {user: user}}, {upsert: true}, function (err, results) {
				callback(err, results);
			});
		}
	});
}

module.exports.getGaViews = function(email, callback) {
	connect(function(err, ogDb) {
		ogDb.collection('ogAccount').findOne({"user.email": email}, function(err, ogAccount) {
			try {
				var gaViews = ogAccount.gaViews;
				callback(gaViews, err);
			}
			catch(e) {
				callback(null, err);
			}
		});
	});
}

module.exports.saveViews = function(email, views, callback) {
	connect(function(err, ogDb) {
		console.log('icu');
		ogDb.collection('ogAccount').update({"user.email": email}, {$set: {gaViews: views}}, function(err, results) {
			callback(err, results);
		});
	});
}