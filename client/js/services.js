'use strict';

opengash.factory('authUrl', [
	'$http', '$q',
	function ($http, $q) {
		var authUrl = $q.defer();
		return authUrl.promise = $http({method: 'GET', url: 'api/authurl/json'}).then(function (body) {
			return body.data.url;
		});
	}
]);

opengash.factory('gaApi', [
	'$http', '$cookies', '$q',
	function ($http, $cookies, $q) {
		var gaApi = {};

		gaApi.call = function (apiUrl, callback) {
			var qs = { access_token: $cookies.accessToken };
			$http({method: 'GET', url: apiUrl, params: qs })
				.success(function (body) {
					callback(body);
				});
		}

		gaApi.fetchViews = function (callback) {
			var url = 'https://www.googleapis.com/analytics/v3/management/accounts/~all/webproperties/~all/profiles';
			gaApi.call(url,
				function (json) {
					var gaViews = [];
					for (var i = 0; i < json.items.length; i++) {
						gaViews.push({name: json.items[i].name, id: json.items[i].id});
					}
					callback(gaViews);
				}
			);
		}

		gaApi.getReport = function (ids, startDate, endDate, metrics) {
			var qs = {
				access_token: $cookies.accessToken,
				ids: ids,
				'start-date': startDate,
				'end-date': endDate,
				metrics: metrics
			}
			var report = $q.defer();
			$http({method: 'GET', url: 'https://www.googleapis.com/analytics/v3/data/ga', params: qs})
				.success(function (body) {
					report.resolve(body);
				});

			return report.promise;
		}
		return gaApi;
	}
]);

opengash.factory('ogAccount', [
	'$http', '$cookies', 'gaApi', '$q',
	function ($http, $cookies, gaApi, $q) {
		var qs = {csrf: $cookies.csrf}
		var ogAccount = {};

		ogAccount.getSavedViews = function () {
			var gaViews = $q.defer();
			$http({method: 'GET', url: 'api/ga-views/json', params: qs})
				.success(function (json) {
					if (json)
						gaViews.resolve(json);
					else
						gaViews.reject(false);
				});
			return gaViews.promise;
		}

		ogAccount.getAllViews = function () {
			var gaViews = $q.defer();
			gaApi.fetchViews(function (results) {
				gaViews.resolve(results);
			});
			return gaViews.promise;
		}

		ogAccount.saveViews = function (arrViews) {
			// TODO: maybe return success & faliure.
			// TODO: Do server side checking of the data being submitted.
			$http({method: 'POST', url: 'api/ga-views/json', params: qs, data: arrViews});
		}

		return ogAccount;
	}
]);

opengash.factory('periods', [
	'dateFilter',
	function periods(dateFilter) {

		// You can ask this for a nicely formatted date by giving it the number of days it should go back.
		var _getNiceDate = function (days) {
			var currentTime;
			currentTime = new Date().getTime();
			return dateFilter(currentTime - (days * 86400000), 'yyyy-MM-dd');
		}

		periods.dates = {
			today: { start: _getNiceDate(0), end: _getNiceDate(0) },
			yesterday: {start: _getNiceDate(1), end: _getNiceDate(1) },
			week: {start: _getNiceDate(8), end: _getNiceDate(1) },
			month: {start: _getNiceDate(31), end: _getNiceDate(1) },
			year: {start: _getNiceDate(366), end: _getNiceDate(1) }
		};

		periods.comparisonDates = {
			yesterday: {start: _getNiceDate(8), end: _getNiceDate(8) }, // Compare yesterday to the same day the previous week.
			week: {start: _getNiceDate(16), end: _getNiceDate(9) }, // Compare to the previous 7 days.
			month: {start: _getNiceDate(62), end: _getNiceDate(32) }, // Compare to the previous 30 days
			year: {start: _getNiceDate(732), end: _getNiceDate(367) } // Compare to the previous 365 days
		}

		periods.ordered = ['Today', 'Yesterday', 'Week', 'Month', 'Year'];

		periods.determineResultsPeriod = function (results) {
			var periodName;
			var returnVal = function (periodName) {
				return periodName;
			}

			for (periodName in periods.dates) {
				if (results.query['start-date'] == periods.dates[periodName].start) {
					return returnVal(periodName);
				}
			}
		}

		periods.determineComparisonResultsPeriod = function (results) {
			var periodName;
			var returnVal = function (periodName) {
				return periodName;
			}

			for (periodName in periods.comparisonDates) {
				if (results.query['start-date'] == periods.comparisonDates[periodName].start) {
					return returnVal(periodName);
				}
			}
		}

		periods.totalPeriods = (function() {
			var i, x, arrPeriods, counter = 0;

			arrPeriods = [periods.dates, periods.comparisonDates];
			for (i = 0; i < arrPeriods.length; i++) {
				for (x in arrPeriods[i]) {
					counter++;
				}
			}

			return counter;
		})();

		periods.forEach = function(items, callback) {
			var i = 0,
					eachPeriod;
			// iterate over each web property
			for (i = 0; i < items.length; i++) {
				// iterate over each period
				for (eachPeriod in periods.dates) {
					// Comply with Google Analytics QPS policy. Queue API calls at 150 milliseconds intervals.
					// Create a new self-invoking function to return the values of "i" and "period" to preserve them in a queued scope.
					callback(items[i], eachPeriod);
				}
			}
		}

		return periods;
	}
]);