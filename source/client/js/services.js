'use strict'

angular.module('ogServices', [])

.factory('authUrl', [
  '$http', '$q',
  function ($http, $q) {
    var deferred = $q.defer()

    $http({method: 'GET', url: 'api/authurl/json'}).then(function(body) {
      deferred.resolve(body.data.url)
    })

    return deferred.promise
  }
])


.factory('gaApi', [
  '$http', '$cookies', '$q', '$timeout',
  function ($http, $cookies, $q, $timeout) {
    var gaApi = {}
      , reportCallSleep

    gaApi.call = function (apiUrl, callback) {
      var qs = { access_token: $cookies.accessToken }
      $http({method: 'GET', url: apiUrl, params: qs })
        .success(function (body) {
          callback(body)
        })
    }

    gaApi.fetchViews = function (callback) {
      var url = 'https://www.googleapis.com/analytics/v3/management/accounts/~all/webproperties/~all/profiles'
      gaApi.call(url,
        function (json) {
          var gaViews = []
          for (var i = 0; i < json.items.length; i++) {
            gaViews.push({name: json.items[i].name, id: json.items[i].id})
          }
          callback(gaViews)
        }
      )
    }

    reportCallSleep = 0
    gaApi.getReport = function(ids, startDate, endDate, metrics) {
      var REPORT_CALL_THROTTLE_BY = 160
        , qs = {
            access_token: $cookies.accessToken,
                     ids: ids,
            'start-date': startDate,
              'end-date': endDate,
                 metrics: metrics
          }
        , report = $q.defer()

      function doGetReport() {
        $timeout(function() {
          $http({method: 'GET', url: 'https://www.googleapis.com/analytics/v3/data/ga', params: qs})
            .success(function(body) {
              report.resolve(body)
            })
            .error(function() {
              doGetReport()
            })
        }, reportCallSleep)
      }
      doGetReport()
      reportCallSleep = reportCallSleep + REPORT_CALL_THROTTLE_BY

      return report.promise
    }

    return gaApi
  }
])

.factory('ogAccount', [
  '$http', '$cookies', 'gaApi', '$q', 'dateFilter',
  function ($http, $cookies, gaApi, $q, dateFilter) {
    var qs = {csrf: $cookies.csrf}
    var ogAccount = {};

    ogAccount.getSavedViews = function () {
      var gaViews = $q.defer()
      $http({method: 'GET', url: 'api/ga-views/json', params: qs})
        .success(function (json) {
          if (json)
            gaViews.resolve(json)
          else
            gaViews.reject()
        })
      return gaViews.promise
    }

    ogAccount.getAllViews = function () {
      var gaViews = $q.defer()

      gaApi.fetchViews(function (results) {
        gaViews.resolve(results)
      })

      return gaViews.promise
    }

    ogAccount.saveViews = function (arrViews) {
      // todo: maybe return success & faliure.
      // todo: Do server side checking of the data being submitted.
      $http({method: 'POST', url: 'api/ga-views/json', params: qs, data: arrViews})
    }

    ogAccount.shouldServeCache = function() {
      var shouldServeCache = $q.defer()
        , currentTime = new Date().getTime()
        , latestCall = localStorage['latestCall']

      currentTime = dateFilter(currentTime, 'yyyy-MM-dd')

      if (currentTime == latestCall) {
        shouldServeCache.resolve(true)
      } else {
        localStorage.clear()
        shouldServeCache.resolve(false)
      }

      return shouldServeCache.promise
    }

    ogAccount.getReport = function(ids, startDate, endDate, metrics, shouldUseCache) {
      var report = $q.defer()
        , key = '' + ids + startDate + endDate + metrics
        , currentTime = new Date().getTime()

      currentTime = dateFilter(currentTime, 'yyyy-MM-dd')

      shouldUseCache = shouldUseCache || false

      if (shouldUseCache && (currentTime !== endDate)) {
        report.resolve(JSON.parse(localStorage[key]))
      } else {
        gaApi.getReport(ids, startDate, endDate, metrics).then(function(results) {
          localStorage[key] = JSON.stringify(results)
          localStorage['latestCall'] = currentTime

          report.resolve(results)
        })
      }

      return report.promise
    }

    return ogAccount;
  }
])

.factory('periods', [
  'dateFilter',
  function (dateFilter) {

    var periods = {}

    var _getNiceDate = function (days) {
      var currentTime
      currentTime = new Date().getTime()
      return dateFilter(currentTime - (days * 86400000), 'yyyy-MM-dd')
    }


    periods.dates = {
      today: { start: _getNiceDate(0), end: _getNiceDate(0) },
      yesterday: {start: _getNiceDate(1), end: _getNiceDate(1) },
      week: {start: _getNiceDate(7), end: _getNiceDate(1) },
      month: {start: _getNiceDate(30), end: _getNiceDate(1) },
      year: {start: _getNiceDate(365), end: _getNiceDate(1) }
    };


    periods.comparisonDates = {
      yesterday: {start: _getNiceDate(8), end: _getNiceDate(8) }, // Compare yesterday to the same day the previous week.
      week: {start: _getNiceDate(14), end: _getNiceDate(8) }, // Compare to the previous 7 days.
      month: {start: _getNiceDate(60), end: _getNiceDate(31) }, // Compare to the previous 30 days
      year: {start: _getNiceDate(730), end: _getNiceDate(366) } // Compare to the previous 365 days
    };

    periods.ordered = ['Today', 'Yesterday', 'Week', 'Month', 'Year']

    periods.totalPeriods = (function () {
      return Object.keys(periods.dates).length + Object.keys(periods.comparisonDates).length
    })();

    periods.forEach = function (arrProfileIds, callback) {
      var eachPeriod;

      // iterate over each web property
      arrProfileIds.forEach(function(profileId) {
        // iterate over each period
        for (eachPeriod in periods.dates) {
          callback(profileId, eachPeriod)
        }
      });
    };

    return periods;
  }
])