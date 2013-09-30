'use strict';
angular.module('ogControllers', [])


/**
 * This is the main controller for all pages. Its job is to determine the status of the user: logged in, has saved
 * properties, has access token, etc. Then, load the appropriate template accordingly.
 *
 * @requires $state
 * @requires $cookies
 * @requires ogAccount
 *
 * @namespace ng.controller.mainCtrl
 */
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


/**
 * Controls the `connect.html` template. That template only needs a Google OAuth 2.0 URL, and that's what this
 * controller gives it.
 *
 * @requires authUrl
 *
 * @namespace ng.controller.connectCtrl
 */
.controller('connectCtrl', [
  '$scope', 'authUrl',
  function($scope, authUrl) {
    $scope.authUrl = authUrl;
  }
])


/**
 * This is the controller for `add-views.html` template.
 *
 * It uses {@link ng.service.ogAccount} to retrieve a all the profiles/views that a user has in Google Analytics in
 * JSON format. The template then displays this information. The controller listens for user interactions with
 * checkboxes.
 *
 * Once the user clicks submit, checked checkboxes are saved to the database and the `dashboard.html` template is
 * loaded using the `$state` service.
 *
 * @requires ogAccount
 * @requires $state
 *
 * @namespace ng.controller.addViewsCtrl
 */
// todo: validate views and make sure they are saved to the DB before $state.go('dashboard')?
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

/**
 * Dashboard controller for `dashboard.html`
 *
 * @namespace ng.controller.dashboardCtrl
 */
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

      periods.forEach(arrIds, function(id, period) {

        var startDate = periods.dates[period].start
          , endDate = periods.dates[period].end
          , comparison = (period != 'today')

        gaApi.getReport(id, startDate, endDate, metricsData.raw.toString()).then(function(results) {
          if (typeof $scope.tableContent[results.profileInfo.tableId] == 'undefined')
            $scope.tableContent[results.profileInfo.tableId] = {}

          $scope.tableContent[results.profileInfo.tableId][period] = results
        })

        if (comparison) {
          // Setup for comparison data iteration
          startDate = periods.comparisonDates[period].start
          endDate = periods.comparisonDates[period].end

          gaApi.getReport(id, startDate, endDate, metricsData.raw.toString()).then(function(results) {
            if (typeof $scope.tableComparisonContent[results.profileInfo.tableId] == 'undefined')
              $scope.tableComparisonContent[results.profileInfo.tableId] = {}

            $scope.tableComparisonContent[results.profileInfo.tableId][period] = results
          })
        }
      })
    })
  }
])