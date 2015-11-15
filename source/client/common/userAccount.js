'use strict'

angular.module('opengash')

.factory('userAccount', function($http, lStorage, googleAnalytics, $q, dateFilter, $rootScope, utils) {
    var userAccount = {}

    userAccount.getSavedViews = function() {
      var gaViews = $q.defer()

      if (_.isEmpty(lStorage.getVal('gaViews'))) {
        gaViews.reject(null)
      } else {
        gaViews.resolve(lStorage.getVal('gaViews'))

      }

      return gaViews.promise
    }

    userAccount.saveViews = function(arrViews) {
      lStorage.setVal('gaViews', arrViews)
    }

    userAccount.shouldServeCache = function() {
      return $q.resolve(false)
    }

    userAccount.getReport = function(ids, startDate, endDate, metrics, shouldUseCache) {
      var report = $q.defer()
      var key = '' + ids + startDate + endDate + metrics
      var currentTime = new Date().getTime()

      function doGetReport () {
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

    userAccount.isAuthenticated = function() {
      var currentTime = utils.currentTime()
      var credentialsExpirationTime = lStorage.getVal('credentialsExpirationTime')

      return credentialsExpirationTime !== undefined &&
             credentialsExpirationTime > currentTime
    }
    userAccount.status = function() {
      var status = $q.defer()

      if (userAccount.isAuthenticated()) {
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
      return $http({
        method: 'GET',
        url: 'https://www.googleapis.com/oauth2/v1/userinfo',
        params: {access_token: lStorage.getVal('accessToken')}
      }).then(function(response) {
        return {
          user: response.data,
          gaViews: lStorage.getVal('gaViews') || []
        }
      })
    }

    return userAccount
  }
)
