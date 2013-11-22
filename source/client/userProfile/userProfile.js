'use strict'

angular.module('userProfile', [])

.controller('addViewsCtrl', [
  '$scope', 'userAccount', '$state', 'googleAnalytics',
  function($scope, userAccount, $state, googleAnalytics) {
    googleAnalytics.fetchViews().then(function(views) {
      $scope.allViews = views
    })
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
      userAccount.saveViews($scope.selectedViews)
      $state.go('dashboard')
    }
  }
])

.controller('accountLinkCtrl', [
  '$scope',
  function($scope) {

  }
])