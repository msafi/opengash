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
opengash.factory('gaApi' ,[
	'$http',
	'$cookies',
	'$q',
	function($http, $cookies, $q) {
		var gaApi = {};
		gaApi.call = function(apiUrl, callback) {
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
		gaApi.fetchViews = function(callback) {
			var url = 'https://www.googleapis.com/analytics/v3/management/accounts/~all/webproperties/~all/profiles';
			gaApi.call(url,
				function(json) {
					var profileIds = [];
					for (i = 0; i < json.items.length; i++) {
						profileIds.push(json.items[i].id);
					}
					console.log(profileIds);
				}
			);
//			(function iterator(url) {
//				gaApi.call(url, function (json) {
//					console.log(json);
//					for (var i = 0; i < json.items.length; i++) {
//						switch(json.kind) {
//							case 'analytics#accounts':
//								console.log('Accounts: ', json.items[i].id);
//								iterator(json.items[i].selfLink + '/webproperties');
//								break;
//							case 'analytics#webproperties':
//								console.log('Properties: ', json.items[i].id);
//								iterator(json.items[i].selfLink + '/profiles');
//								break;
//							case 'analytics#profiles':
//								console.log(json.items[i].id);
//								break;
//						}
//					}
//				});
//			})(urlx);
		}

		return gaApi;
	}
]);

opengash.factory('ogAccount', [
	'$http',
	'$cookies',
	'gaApi',
	'$q',
	function ($http, $cookies, gaApi, $q) {
		var qs = {csrf: $cookies.csrf}
		var ogAccount = {};

		ogAccount.getSavedViews = function() {
			var gaViews = $q.defer();
			$http({method:'GET', url:'api/ga-views/json', params: qs})
				.success(function (json) {
					if (json)
						gaViews.resolve(json);
					else
						gaViews.reject(false);
				});
			return gaViews.promise;
		}

		ogAccount.getAllViews = function() {
			var gaViews = $q.defer();
			gaApi.fetchViews();
			return gaViews.promise;
		}
		return ogAccount;
	}
]);