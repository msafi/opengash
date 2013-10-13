'use strict';
angular.module('ogControllers', [])

.controller('mainCtrl', [
  '$state', '$cookies', 'ogAccount',
  function($state, $cookies, ogAccount) {
    if (typeof $cookies.loggedIn !== 'undefined' && typeof $cookies.accessToken !== 'undefined') {
      // User is logged in and has a fresh access token.
      ogAccount.getSavedViews().then(
        function() {
          // GA properties exist. Show them.
          $state.go('dashboard')
        },
        function() {
          // GA properties don't exist. Prompt user to add them.
          $state.go('addViews')
        }
      )
    }
    else {
      // User is not logged in. Display login page.
      $state.go('login')
    }
  }
])

.controller('connectCtrl', [
  '$scope', 'authUrl',
  function($scope, authUrl) {
    $scope.authUrl = authUrl
  }
])


.controller('addViewsCtrl', [
  '$scope', 'ogAccount', '$state',
  function($scope, ogAccount, $state) {
    $scope.allViews = ogAccount.getAllViews() // directly from Google API
    $scope.selectedViews = []

    $scope.updateSelection = function($event, view) {
      // Checked view doesn't exist. Add it.
      if ($event.target.checked && $scope.selectedViews.indexOf(view) === -1) {
        $scope.selectedViews.push(view)
      }

      // Unchecked view exists. Remove it.
      if (!$event.target.checked && $scope.selectedViews.indexOf(view) !== -1) {
        $scope.selectedViews.splice($scope.selectedViews.indexOf(view), 1)
      }
    }

    $scope.saveSelectedViews = function() {
      ogAccount.saveViews($scope.selectedViews)
      $state.go('dashboard')
    }
  }
])

// todo: cache profile names, so that they don't flash like some crappy software
// todo: inform the user when the latest update happened
.controller('dashboardCtrl', [
  '$scope', 'gaApi', 'ogAccount', 'periods', 'metricsData',
  function($scope, gaApi, ogAccount, periods, metricsData) {
    ogAccount.getSavedViews().then(function(arrViews) {

      var arrIds = arrViews.map(function(view) {
        return 'ga:' + view.id
      })

      $scope.tableStructure = { metrics: metricsData.raw, views: arrIds, periods: periods.ordered }
      $scope.tableContent = {}
      $scope.tableComparisonContent = {}
      $scope.metricPrettyNameFinder = metricsData.names

      ogAccount.shouldServeCache().then(function(shouldServeCache) {
        periods.forEach(arrIds, function(id, period) {

          var startDate = periods.dates[period].start
            , endDate = periods.dates[period].end
            , comparison = (period != 'today')

          ogAccount.getReport(id, startDate, endDate, metricsData.raw.toString(), shouldServeCache).then(function(results) {
            if (typeof $scope.tableContent[results.profileInfo.tableId] == 'undefined')
              $scope.tableContent[results.profileInfo.tableId] = {}

            $scope.tableContent[results.profileInfo.tableId][period] = results
          })

          if (comparison) {
            // Setup for comparison data iteration
            startDate = periods.comparisonDates[period].start
            endDate = periods.comparisonDates[period].end

            ogAccount.getReport(id, startDate, endDate, metricsData.raw.toString(), shouldServeCache).then(function(results) {
              if (typeof $scope.tableComparisonContent[results.profileInfo.tableId] == 'undefined')
                $scope.tableComparisonContent[results.profileInfo.tableId] = {}

              $scope.tableComparisonContent[results.profileInfo.tableId][period] = results
            })
          }
        })
      })
    })
  }
])