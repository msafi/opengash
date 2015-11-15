'use strict';
angular.module('opengash')

// todo: cache profile names, so that they don't flash like some crappy software
// todo: inform the user when the latest update happened
.controller('dashboardCtrl', [
  '$scope', 'googleAnalytics', 'userAccount', 'periods', 'metricsData',
  function($scope, googleAnalytics, userAccount, periods, metricsData) {
    userAccount.getSavedViews().then(function(arrViews) {

      var arrIds = arrViews.map(function(view) {
        return 'ga:' + view.id
      })

      $scope.tableStructure = { metrics: metricsData.raw, views: arrIds, periods: periods.ordered }
      $scope.tableContent = {}
      $scope.tableComparisonContent = {}
      $scope.metricsData = metricsData
      $scope.periods = periods

      userAccount.shouldServeCache().then(function(shouldServeCache) {
        periods.forEach(arrIds, function(id, period) {
          var startDate = periods.dates[period].start
            , endDate = periods.dates[period].end
            , comparison = (period != 'today')

          userAccount.getReport(id, startDate, endDate, metricsData.raw.toString(), shouldServeCache).then(function(results) {
            if (typeof $scope.tableContent[results.profileInfo.tableId] == 'undefined')
              $scope.tableContent[results.profileInfo.tableId] = {}

            $scope.tableContent[results.profileInfo.tableId][period] = results
          })

          if (comparison) {
            startDate = periods.comparisonDates[period].start
            endDate = periods.comparisonDates[period].end

            userAccount.getReport(id, startDate, endDate, metricsData.raw.toString(), shouldServeCache).then(function(results) {
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

/**
 * This is responsible for showing change percentage in each cell
 *
 * @namespace ng.directive.movement
 */
.directive('ogMovement', [
  'metricsData', '$sce',
  function (metricsData, $sce) {
    return {
      scope: {
        current: '@',
        comparison: '@',
        metric: '@'
      },
      restrict: 'E',
      template: '<p class="movement" ng-bind-html="movement"></p>',
      link: function postLink(scope) {
        scope.$watchCollection('[current, comparison]', function() {
          var movementPercentage
          scope.movement = ''

          // scope.current and scope.comparison are sometimes strings, "0.0"
          if (parseFloat(scope.current) && parseFloat(scope.comparison)) {

            movementPercentage = ((scope.current - scope.comparison) / scope.comparison) * 100
            movementPercentage = parseFloat(movementPercentage.toFixed(1))

            if (movementPercentage > 0) {
              if (metricsData[scope.metric].biggerIsBetter && movementPercentage != 0)
                movementPercentage = "<span class='text-success'>" + movementPercentage + "%</span>"
              else
                movementPercentage = "<span class='text-danger'>" + movementPercentage + "%</span>"
            }
            else {
              if (metricsData[scope.metric].biggerIsBetter || movementPercentage == 0)
                movementPercentage = "<span class='text-danger'>" + movementPercentage + "%</span>"
              else
                movementPercentage = "<span class='text-success'>" + movementPercentage + "%</span>"
            }

            scope.movement = $sce.trustAsHtml(movementPercentage)

          }
        })
      }
    }
  }
])

/**
 * This filters returned metric results according to the metric's data type
 *
 * @namespace ng.filter.metrics
 */
.filter('metrics', [
  'metricsData', 'numberFilter',
  function(metricsData, numberFilter) {
    return function(input, metric) {
      if (!input)
        return ''

      switch (metricsData[metric].type) {
        case 'integer':
          return numberFilter(parseFloat(parseFloat(input).toFixed(2)))
        case 'seconds':
            // http://stackoverflow.com/a/6313008/604296
            var sec_num = parseInt(input, 10);
            var hours = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);

            if (hours < 10) { hours = "0" + hours; }
            if (minutes < 10) { minutes = "0" + minutes; }
            if (seconds < 10) { seconds = "0" + seconds; }

            var time = hours + ':' + minutes + ':' + seconds;

            return time;
        case 'percentage':
          return parseFloat(parseFloat(input).toFixed(1)) + '%'
        default:
          return input
      }
    }
  }
])
