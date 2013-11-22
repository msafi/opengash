'use strict'

angular.module('googleAnalytics', [])

.factory('googleAnalytics', [
  '$http', '$cookies', '$q', '$timeout', 'metricsData', 'periods',
  function ($http, $cookies, $q, $timeout, metricsData, periods) {
    var googleAnalytics = {}
    var reportCallSleep

    googleAnalytics.call = function (apiUrl) {
      var qs = { access_token: $cookies.accessToken }
      var response = $q.defer()

      $http({method: 'GET', url: apiUrl, params: qs })
        .success(function (body) {
          response.resolve(body)
        })

      return response.promise
    }

    googleAnalytics.fetchViews = function () {
      var url = 'https://www.googleapis.com/analytics/v3/management/accounts/~all/webproperties/~all/profiles'
      var views = $q.defer()

      googleAnalytics.call(url).then(function(response) {
        var viewsArr = []

        for (var i = 0; i < response.items.length; i++) {
          viewsArr.push({name: response.items[i].name, id: response.items[i].id})
        }

        views.resolve(viewsArr)
      })

      return views.promise
    }

    reportCallSleep = 0
    googleAnalytics.getReport = function(ids, startDate, endDate, metrics) {
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

    googleAnalytics.linkToReport = function(period, metric, profileInfo) {
      var link = ''

      link += 'https://www.google.com/analytics/web/?#report/'
      link += metricsData[metric].urlFragment + '/'
      link += 'a' + profileInfo.accountId + 'w' + profileInfo.internalWebPropertyId + 'p' + profileInfo.profileId + '/'
      link += '%3F' + // ?
              '_u.date00' +
              '%3D' +  // =
              periods.dates[period].start +
              '%26' + // &
              '_u.date01' +
              '%3D' + // =
              periods.dates[period].end +
              '%26' + // &
              '_u.date10' +
              '%3D' + // =
              periods.comparisonDates[period].start +
              '%26' + // &
              '_u.date11' +
              '%3D' + // =
              periods.comparisonDates[period].end +
              '/'

      return link
    }

    return googleAnalytics
  }
])