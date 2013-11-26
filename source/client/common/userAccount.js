'use strict'

angular.module('userAccount', [])

.factory('userAccount', [
  '$http', '$cookies', 'googleAnalytics', '$q', 'dateFilter', '$rootScope',
  function ($http, $cookies, googleAnalytics, $q, dateFilter, $rootScope) {
    var qs = {csrf: $cookies.csrf}
    var userAccount = {}

    userAccount.getSavedViews = function () {
      var gaViews = $q.defer()
      $http({method: 'GET', url: 'api/ga-views', params: qs})
        .success(function (json) {
          if (json)
            gaViews.resolve(json)
          else
            gaViews.reject(null)
        })
      return gaViews.promise
    }

    userAccount.saveViews = function (arrViews) {
      // todo: maybe return success & faliure.
      // todo: Do server side checking of the data being submitted.
      $http({method: 'POST', url: 'api/ga-views', params: qs, data: arrViews})
    }

    userAccount.shouldServeCache = function() {
      var shouldServeCache = $q.defer()
      var currentTime = new Date().getTime()
      var latestCall = localStorage['latestCall']

      currentTime = dateFilter(currentTime, 'yyyy-MM-dd')

      if (currentTime == latestCall) {
        shouldServeCache.resolve(true)
      } else {
        localStorage.clear()
        shouldServeCache.resolve(false)
      }

      return shouldServeCache.promise
    }

    userAccount.getReport = function(ids, startDate, endDate, metrics, shouldUseCache) {
      var report = $q.defer()
      var key = '' + ids + startDate + endDate + metrics
      var currentTime = new Date().getTime()

      function doGetReport() {
        googleAnalytics.getReport(ids, startDate, endDate, metrics).then(function(results) {
          localStorage[key] = JSON.stringify(results)
          localStorage['latestCall'] = currentTime

          report.resolve(results)
        })
      }

      currentTime = dateFilter(currentTime, 'yyyy-MM-dd')

      shouldUseCache = shouldUseCache || false

      if (shouldUseCache && (currentTime !== endDate)) {
        if (localStorage[key] !== undefined) {
          report.resolve(JSON.parse(localStorage[key]))
        } else {
          doGetReport()
        }
      } else {
        doGetReport()
      }

      return report.promise
    }

    userAccount.status = function() {
      var status = $q.defer()

      if (typeof $cookies.loggedIn !== 'undefined' && typeof $cookies.accessToken !== 'undefined') {
        userAccount.getSavedViews().then(
          function() {
            status.resolve('dashboard')
          },
          function() {
            $rootScope.$emit('alert', {
              message: "Check at least one website",
              "show": true,
              "type": "warning"
            })
            googleAnalytics.fetchViews().then(function() {
              status.resolve('userProfile')
            }, function() {
              status.resolve('signupError')
            })
          }
        )
      }
      else {
        status.resolve('welcome')
      }

      return status.promise
    }

    userAccount.getUser = function() {
      var user = $q.defer()
      $http({method: 'GET', url: 'api/user-data', params: qs})
        .success(function(userData) {
          if (userData)
            user.resolve(userData)
          else
            user.reject(null)
        })
      return user.promise
    }

    return userAccount
  }
])