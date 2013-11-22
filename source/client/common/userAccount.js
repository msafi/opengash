'use strict'

angular.module('userAccount', [])

.factory('userAccount', [
  '$http', '$cookies', 'googleAnalytics', '$q', 'dateFilter',
  function ($http, $cookies, googleAnalytics, $q, dateFilter) {
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

    userAccount.getReport = function(ids, startDate, endDate, metrics, shouldUseCache) {
      var report = $q.defer()
        , key = '' + ids + startDate + endDate + metrics
        , currentTime = new Date().getTime()

      currentTime = dateFilter(currentTime, 'yyyy-MM-dd')

      shouldUseCache = shouldUseCache || false

      if (shouldUseCache && (currentTime !== endDate)) {
        // todo: it should still call gaApi.getReport if localStorage doesn't have a good value
        report.resolve(JSON.parse(localStorage[key]))
      } else {
        googleAnalytics.getReport(ids, startDate, endDate, metrics).then(function(results) {
          localStorage[key] = JSON.stringify(results)
          localStorage['latestCall'] = currentTime

          report.resolve(results)
        })
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
            status.resolve('addViews')
          }
        )
      }
      else {
        status.resolve('login')
      }

      return status.promise
    }

    userAccount.retrieve = function() {
      var user = $q.defer()
      $http({method: 'GET', url: 'api/user-data'})
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