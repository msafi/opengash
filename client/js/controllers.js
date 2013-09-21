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
  function ($state, $cookies, ogAccount) {
    if (typeof $cookies.loggedIn !== 'undefined' && typeof $cookies.accessToken !== 'undefined') {
      // User is logged in and has a fresh access token.
      ogAccount.getSavedViews().then(
        function () {
          // GA properties exist. Show them.
          $state.go('dashboard');
        },
        function () {
          // GA properties don't exist. Prompt user to add them.
          $state.go('addViews');
        }
      );
    }
    else {
      // User is not logged in. Display login page.
      $state.go('login');
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
  function ($scope, authUrl) {
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
  function ($scope, ogAccount, $state) {
    $scope.allViews = ogAccount.getAllViews();
    $scope.selectedViews = [];

    $scope.updateSelection = function ($event, view) {
      if ($event.target.checked && $scope.selectedViews.indexOf(view) === -1) {
        $scope.selectedViews.push(view);
      }
      if (!$event.target.checked && $scope.selectedViews.indexOf(view) !== -1) {
        $scope.selectedViews.splice($scope.selectedViews.indexOf(view), 1);
      }
    };

    $scope.saveSelectedViews = function () {
      ogAccount.saveViews($scope.selectedViews);
      $state.go('dashboard');
    };
  }
])

/**
 * This is the monster that displays the main dashboard. It needs a lot of clean up.
 *
 * @requires $scope
 * @requires gaApi
 * @requires ogAccount
 * @requires $timeout
 * @requires periods
 * @requires $sce
 *
 * @namespace ng.controller.dashboardCtrl
 */
.controller('dashboardCtrl', [
  '$scope', 'gaApi', 'ogAccount', '$timeout', 'periods', '$sce',
  function ($scope, gaApi, ogAccount, $timeout, periods, $sce) {

    ogAccount.getSavedViews().then(function (arrViews) {

      // Initialize stuff.
      var arrIds = arrViews.map(function (view) {
            return 'ga:' + view.id;
          })
        , strMetrics = 'ga:visitors,ga:pageviews,ga:pageviewsPerVisit,ga:avgTimeOnSite,ga:visitBounceRate,ga:percentNewVisits,ga:avgPageLoadTime'
        , numApiCallsNeeded = periods.totalPeriods * arrIds.length
        , apiCallsCounter = 0

      $scope.tableStructure = { metrics: strMetrics.replace(/ga:/g, '').split(','), views: arrIds, periods: periods.ordered };
      $scope.tableContent = {};
      $scope.tableComparisonContent = {};

      periods.forEach(arrIds, function (id, period) {

        var startDate = periods.dates[period].start
          , endDate = periods.dates[period].end
          , comparison = (period != 'today')
          , content = $scope.tableContent
        
        var numberOfLoops = 1
        do {
          (function (content) {
            gaApi.getReport(id, startDate, endDate, strMetrics).then(function (results) {
              if (typeof content[results.profileInfo.tableId] == 'undefined')
                content[results.profileInfo.tableId] = {};

              content[results.profileInfo.tableId][period] = results;

              // This block of code is used to calculate metric movements once all API calls have returned.
              //
              // I'm thinking I will move this to a directive to make the app more resposive and organized.
              apiCallsCounter++;
              if (apiCallsCounter == numApiCallsNeeded) {
                $scope.movement = angular.copy($scope.tableComparisonContent);

                periods.forEach(arrIds, function (id, period) {

                  var arrMetrics = strMetrics.split(',')
                    , contentResult
                    , comparisonContentResult
                    , movementContent
                    , movementPercentage

                  for (var metricsIndex = 0; metricsIndex < arrMetrics.length; metricsIndex++) {
                    if (period != 'today') {

                      contentResult = $scope.tableContent[id][period]['totalsForAllResults'][arrMetrics[metricsIndex]]
                      comparisonContentResult = $scope.tableComparisonContent[id][period]['totalsForAllResults'][arrMetrics[metricsIndex]]
                      movementPercentage = parseFloat((((contentResult - comparisonContentResult) / contentResult) * 100).toFixed(1));
                      movementContent = movementPercentage + '%'

                      if (movementPercentage > 0) {
                        movementContent = '<span class="text-success">' + movementContent + '</span>';
                      }
                      else {
                        movementContent = '<span class="text-danger">' + movementContent + '</span>';
                      }

                      $scope.movement[id][period]['totalsForAllResults'][arrMetrics[metricsIndex]] = $sce.trustAsHtml(movementContent);
                    }
                  }
                })
              }
            })
          })(content)

          if (comparison) {
            // Setup comparison data
            startDate = periods.comparisonDates[period].start
            endDate = periods.comparisonDates[period].end
            content = $scope.tableComparisonContent

            // No need for another comparison
            comparison = false
          }
          else {
            break
          }

          numberOfLoops++
        } while (numberOfLoops < 3)
      })
    });
  }
])