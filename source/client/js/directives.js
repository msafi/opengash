angular.module('ogDirectives', [])

/**
 * This is responsible for showing change percentage in each cell
 *
 * @namespace ng.directive.movement
 */
.directive('movement', [
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
              if (metricsData.biggerIsBetter[scope.metric] && movementPercentage != 0)
                movementPercentage = "<span class='text-success'>" + movementPercentage + "%</span>"
              else
                movementPercentage = "<span class='text-danger'>" + movementPercentage + "%</span>"
            }
            else {
              if (metricsData.biggerIsBetter[scope.metric] || movementPercentage == 0)
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