'use strict';
angular.module('ogServices', [])
/**
 * The authUrl service talks to the server to obtain a Google OAuth 2.0 compatible
 * login URL. See {@link ng.controller.connectCtrl} for how this service is used.
 *
 * @requires $http
 * @requires $q
 *
 * @returns {string} the URL
 * @namespace ng.service.authUrl
 */
.factory('authUrl', [
  '$http', '$q',
  function ($http, $q) {
    var authUrl = $q.defer();
    return authUrl.promise = $http({method: 'GET', url: 'api/authurl/json'}).then(function (body) {
      return body.data.url;
    });
  }
])


/**
 * gaApi is similar to {@link ogGaApi} in that its primary purpose is to interact with Google API,
 * but this one is for the front-end.
 *
 * @requires $http
 * @requires $cookies
 * @requires $q
 *
 * @returns gaApi service
 * @namespace ng.service.gaApi
 */
.factory('gaApi', [
  '$http', '$cookies', '$q', '$timeout',
  function ($http, $cookies, $q, $timeout) {
    var gaApi = {}
      , REPORT_CALL_THROTTLE_BY = 300
      , reportCallSleep = 0

    /**
     * Given a Google API end-point and a callback function, this method lets you do things with the results
     * of the API call.
     *
     * @param apiUrl {string} Google API end point.
     * @param callback {function} To be executed on the returned results
     *
     * @function ng.service.gaApi.call
     */
    gaApi.call = function (apiUrl, callback) {
      var qs = { access_token: $cookies.accessToken };
      $http({method: 'GET', url: apiUrl, params: qs })
        .success(function (body) {
          callback(body);
        });
    }


    /**
     * Retrieves the Google Analytics profiles/views of the user and passes the results
     * to the callback function.
     *
     * @param callback {function} To be executed on the returned profiles/views.
     *
     * @function ng.service.gaApi.fetchViews
     */
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


    /**
     * Retrieves a specific Google Analytics report
     *
     * @param ids {string} The ID of the profile to be queried, `id:12345678`
     * @param startDate {string} The start date of the report period, `yyyy-mm-dd`
     * @param endDate {string} The end date of the report period, `yyyy-mm-dd`
     * @param metrics {string} A comma separated list of Google Analytics metrics
     *
     * @returns {object} A promise of a parsed JSON object
     * @function ng.service.gaApi.getReport
     */
    gaApi.getReport = function (ids, startDate, endDate, metrics) {

      var qs = {
        access_token: $cookies.accessToken,
        ids: ids,
        'start-date': startDate,
        'end-date': endDate,
        metrics: metrics
      }
      var report = $q.defer();

      $timeout(function() {
        $http({method: 'GET', url: 'https://www.googleapis.com/analytics/v3/data/ga', params: qs})
          .success(function (body) {
            report.resolve(body);
          });
      }, reportCallSleep)
      reportCallSleep = reportCallSleep + REPORT_CALL_THROTTLE_BY

      return report.promise;
    }
    return gaApi;
  }
])


/**
 * This is a service for CRUDing opengash accounts. It's similar to
 * {@link ogAccount} on the server side.
 *
 * @requires $http
 * @requires $cookies
 * @requires gaApi
 * @requires $q
 *
 * @namespace ng.service.ogAccount
 */
.factory('ogAccount', [
  '$http', '$cookies', 'gaApi', '$q',
  function ($http, $cookies, gaApi, $q) {
    var qs = {csrf: $cookies.csrf}
    var ogAccount = {};


    /**
     * Query the server for a user's saved Google Analytics profiles. If the server finds previously saved
     * user profiles/views, they are returned in a parsed JSON object. Otherwise, the server returns an
     * empty string, which this function interprets as a failure.
     *
     * @returns {object} A promise of parsed JSON or failure
     * @function ng.service.ogAccount.getSavedViews
     */
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
    };



    /**
     * This function maps directly to {@link ng.service.gaApi.fetchViews}
     *
     * @returns {object} parsed JSON object of the user's profiles/views.
     * @function ng.service.ogAccount.getAllViews
     */
    ogAccount.getAllViews = function () {
      var gaViews = $q.defer();
      gaApi.fetchViews(function (results) {
        gaViews.resolve(results);
      });
      return gaViews.promise;
    };



    /**
     * POSTs a serialized array to the server to be saved as the user's Google Analytics
     * profiles/views.
     *
     * @param arrViews {array} containing the profile IDs to be saved for the user.
     *
     * @function ng.service.ogAccount.saveViews
     */
    ogAccount.saveViews = function (arrViews) {
      // todo: maybe return success & faliure.
      // todo: Do server side checking of the data being submitted.
      $http({method: 'POST', url: 'api/ga-views/json', params: qs, data: arrViews});
    };

    return ogAccount;
  }
])



/**
 * Helper functions for dealing with Google Analytics reports date periods
 *
 * @requires dateFilter
 *
 * @namespace ng.service.periods
 */
.factory('periods', [
  'dateFilter',
  function (dateFilter) {

    var periods = {};

    /**
     * Returns a Google Analytics API compatible date string, provided the days it should go back.*
     *
     * @param days {number} The number of days of how far back the date is.
     * @returns {string} in the format of `yyyy-MM-dd`
     *
     * @function ng.service.periods._getNiceDate
     */
    var _getNiceDate = function (days) {
      var currentTime;
      currentTime = new Date().getTime();
      return dateFilter(currentTime - (days * 86400000), 'yyyy-MM-dd');
    };


    /**
     * The fixed date periods that opengash currently supports.
     *
     * @member ng.service.periods.dates
     */
    periods.dates = {
      today: { start: _getNiceDate(0), end: _getNiceDate(0) },
      yesterday: {start: _getNiceDate(1), end: _getNiceDate(1) },
      week: {start: _getNiceDate(7), end: _getNiceDate(1) },
      month: {start: _getNiceDate(30), end: _getNiceDate(1) },
      year: {start: _getNiceDate(365), end: _getNiceDate(1) }
    };


    /**
     * The date periods that the original dates will be compared to in order to gauge a metric's movement
     *
     * @member ng.service.periods.comparisonDates
     */
    periods.comparisonDates = {
      yesterday: {start: _getNiceDate(8), end: _getNiceDate(8) }, // Compare yesterday to the same day the previous week.
      week: {start: _getNiceDate(14), end: _getNiceDate(8) }, // Compare to the previous 7 days.
      month: {start: _getNiceDate(60), end: _getNiceDate(31) }, // Compare to the previous 30 days
      year: {start: _getNiceDate(730), end: _getNiceDate(366) } // Compare to the previous 365 days
    };


    /**
     * An array of the date periods, ordered chronologically because the ordering in JavaScript object properties
     * isn't guaranteed.
     *
     * @member ng.service.periods.ordered
     */
    periods.ordered = ['Today', 'Yesterday', 'Week', 'Month', 'Year'];



    /**
     * Returns the total number of periods (original + comparison).
     *
     * @member ng.service.periods.totalPeriods
     */
    periods.totalPeriods = (function () {
      return Object.keys(periods.dates).length + Object.keys(periods.comparisonDates).length;
    })();



    /**
     * Iterates over a given array of Google Analytics profiles/views IDs and executes
     * a callback function for each period for each ID.
     *
     * @param arrProfileIds {array} Array of Google Analytics profiles/views IDs
     * @param callback {function} To be executed on the profile ID and period.
     *
     * @function ng.service.periods.forEach
     */
    periods.forEach = function (arrProfileIds, callback) {
      var eachPeriod;

      // iterate over each web property
      arrProfileIds.forEach(function(profileId) {
        // iterate over each period
        for (eachPeriod in periods.dates) {
          callback(profileId, eachPeriod);
        }
      });
    };

    return periods;
  }
])