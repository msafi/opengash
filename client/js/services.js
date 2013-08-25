opengash.factory('authUrl', [
	'$http',
	'$q',
	function ($http, $q) {
		var authUrl = $q.defer();
		return authUrl.promise = $http({method:'GET', url:'api/authurl/json'}).then(function(body) {
			return body.data.url;
		})
	}
]);

// This service is like a static class that's used to communicate with Google APIs.
opengash.factory('gaApis' ,[
	'$http',
	'$cookies',
	function($http, $cookies) {
		var gaApis = {};
		gaApis.call = function(apiUrl, callback) {
			var qs = { access_token: $cookies.accessToken }
			$http({
				method: 'GET',
				url: apiUrl,
				params: qs
			})
			.success(function(body) {
				callback(body);
			});
		}
		return gaApis;
	}
]);

opengash.factory('ogAccount', [
	'$http',
	'$cookies',
	'gaApis',
	'$q',
	function ($http, $cookies, gaApis, $q) {
		var qs = {csrf: $cookies.csrf}
		var ogAccount = {};

		ogAccount.getGaViews = function () {
			var gaViews = $q.defer();
			$http({method:'GET', url:'api/gaviews/json', params: qs})
				.success(function (json) {
					gaViews.resolve(json);
					// Google Analytics views exist. Return them in a JSON.
				})
				.error(function() {
					gaViews.reject(false);
				})
			return gaViews.promise;
		}
		return ogAccount;
	}
]);

//gaApis.call('https://www.googleapis.com/analytics/v3/management/accounts', function (body) {
//	console.log(body.items[0].id);
//});