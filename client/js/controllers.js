'use strict';

opengash.controller('mainCtrl', [
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
]);

opengash.controller('connectCtrl', [
  '$scope', 'authUrl',
  function ($scope, authUrl) {
    $scope.authUrl = authUrl;
  }
]);

// This is a good question and answer on how to handle checkboxes in AngularJS
// http://stackoverflow.com/a/14864244/604296
opengash.controller('addViewsCtrl', [
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
]);

/**
 * This is the monster that displays the main dashboard.
 * It needs a lot of clean up.
 */
opengash.controller('dashboardCtrl', [
  '$scope', 'gaApi', 'ogAccount', '$timeout', 'periods', '$sce',
  function ($scope, gaApi, ogAccount, $timeout, periods, $sce) {

    ogAccount.getSavedViews().then(function (arrViews) {

      // Initialize stuff.
      var arrIds = arrViews.map(function (view) { return 'ga:' + view.id; }),
          strMetrics = 'ga:visitors,ga:pageviews,ga:pageviewsPerVisit,ga:avgTimeOnSite,ga:visitBounceRate,ga:percentNewVisits,ga:avgPageLoadTime',
          numApiCallsNeeded = periods.totalPeriods * arrIds.length,
          executionDelay = 0,
          tableContentConstructor,
          apiCallsCounter = 0;

      $scope.tableStructure = { metrics: strMetrics.replace(/ga:/g, '').split(','), views: arrIds, periods: periods.ordered };
      $scope.tableContent = {};
      $scope.tableComparisonContent = {};

      tableContentConstructor = function (id, startDate, endDate, comparison) {
        return function () {

          gaApi.getReport(id, startDate, endDate, strMetrics).then(function (results) {

            if (!comparison) {
              if (typeof $scope.tableContent[results.profileInfo.tableId] == 'undefined')
                $scope.tableContent[results.profileInfo.tableId] = {};

              $scope.tableContent[results.profileInfo.tableId][periods.determineResultsPeriod(results)] = results;
            }
            else {
              if (typeof $scope.tableComparisonContent[results.profileInfo.tableId] == 'undefined')
                $scope.tableComparisonContent[results.profileInfo.tableId] = {};

              $scope.tableComparisonContent[results.profileInfo.tableId][periods.determineComparisonResultsPeriod(results)] = results;
            }

            // TODO: Use promises for control-flow instead
            apiCallsCounter++;
            if (apiCallsCounter == numApiCallsNeeded) {
              // All needed API results have been received. Do stuff with it here.
              // Calculate metric movements.
              $scope.movement = angular.copy($scope.tableComparisonContent);
              periods.forEach(arrIds, function (id, period) {
                var arrMetrics = strMetrics.split(',');
                var contentResult, comparisonContentResult, movementContent, movementPercentage;

                for (var metricsIndex = 0; metricsIndex < arrMetrics.length; metricsIndex++) {
                  if (period != 'today') {
                    contentResult = $scope.tableContent[id][period]['totalsForAllResults'][arrMetrics[metricsIndex]],
                      comparisonContentResult = $scope.tableComparisonContent[id][period]['totalsForAllResults'][arrMetrics[metricsIndex]];
                    movementPercentage = parseFloat((((contentResult - comparisonContentResult) / contentResult) * 100).toFixed(1));
                    movementContent = movementPercentage + '%';
                    if (movementPercentage > 0) {
                      movementContent = '<span class="text-success">' + movementContent + '</span>';
                    }
                    else {
                      movementContent = '<span class="text-danger">' + movementContent + '</span>';
                    }

                    $scope.movement[id][period]['totalsForAllResults'][arrMetrics[metricsIndex]] = $sce.trustAsHtml(movementContent);
                  }
                }
              });
            }
          });
        }
      }

      periods.forEach(arrIds, function (id, period) {
        // Get original content
        $timeout(
          tableContentConstructor(id, periods.dates[period].start, periods.dates[period].end, false),
          executionDelay
        );
        executionDelay += 150;

        // Get comparison content
        if (period != 'today') {
          $timeout(
            tableContentConstructor(id, periods.comparisonDates[period].start, periods.comparisonDates[period].end, true),
            executionDelay
          );
          executionDelay += 150;
        }
      });
    });
  }
]);