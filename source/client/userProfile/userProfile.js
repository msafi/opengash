'use strict'

angular.module('userProfile', [])

.controller('UserProfileCtrl', [
  '$scope', 'userDocument', '$state', 'googleAnalyticsViews', 'userAccount',
  function($scope, userDocument, $state, googleAnalyticsViews, userAccount) {
    var selectedViews = []

    $scope.user = userDocument.user
    $scope.user.views = userDocument.gaViews || []

    if (!$scope.user.name) {
      $scope.user.name = 'User account'
    }

    $scope.user.views.ids = {}
    $scope.user.views.forEach(function(view) {
      $scope.user.views.ids[view.id] = true
      selectedViews.push(view)
    })

    $scope.allViews = googleAnalyticsViews


    $scope.updateSelection = function(view) {
      var viewExists = false
      selectedViews.forEach(function(selectedView, index) {
        if (view.id === selectedView.id)
          viewExists = index
      })

      if (viewExists === false) {
        selectedViews.push(view)
      } else {
        selectedViews.splice(viewExists, 1)
      }

      userAccount.saveViews(selectedViews)
    }

    $scope.home = function() {
      $state.go('home')
    }
  }
])

.controller('accountLinkCtrl', [
  '$scope', 'userAccount', '$state', '$rootScope', '$cookies',
  function($scope, userAccount, $state, $rootScope, $cookies) {
    $scope.userPicture = 'images/gear.png'

    userAccount.getUser().then(function(response) {
      var user = response.user

      if (user.picture)
        $scope.userPicture = user.picture
    })

    $scope.settings = function() {
      $state.go('userProfile')
    }

    $scope.signOut = function() {
      localStorage.clear()
      delete $cookies.loggedIn

      $rootScope.$emit('alert', {
        show: true,
        message: "You've been signed out.",
        type: "info",
      })
      $state.go('home')
    }
}])