'use strict'

angular.module('opengash', [
  // Dependency modules
  'ngCookies',
  'ui.router',
  'userProfile',
  'dashboard',
  'commonServices',
])

.config([
  '$stateProvider', '$locationProvider',
  function ($stateProvider, $locationProvider) {
    $stateProvider
      .state('home', {
        url: "/",
        controller: 'AppCtrl',
      })
      .state('welcome', {
        views: {
          "main": {templateUrl: 'welcome/welcome.html'},
          "navLink": {templateUrl: 'userProfile/loginLink.html'}
        }
      })
      .state('userProfile', {
        'url': '/user-profile',
        views: {
          "main": {
            templateUrl: 'userProfile/userProfile.html',
            resolve: {
              userDocument: ['userAccount', function(userAccount) {
                return userAccount.getUser()
              }],
              googleAnalyticsViews: ['googleAnalytics', function(googleAnalytics) {
                return googleAnalytics.fetchViews()
              }]
            },
            controller: 'UserProfileCtrl',
          },
          "navLink": {templateUrl: 'userProfile/accountLink.html'}
        },
      })
      .state('dashboard', {
        views: {
          "main": {templateUrl: 'dashboard/dashboard.html'},
          "navLink": {templateUrl: 'userProfile/accountLink.html'}
        }
      })
      .state('signupError', {
        url: '/signup-error',
        views: {
          "main": {templateUrl: 'signupError/signupError.html'},
          "navLink": {templateUrl: 'userProfile/loginLink.html'}
        }
      })

    $locationProvider.
      html5Mode(true).
      hashPrefix('!')
  }
])

.controller('AppCtrl', [
  '$state', '$location', 'userAccount',
  function($state, $location, userAccount) {
    if ($location.path() === '/') {
      userAccount.status().then(function(status) {
        $state.go(status)
      })
    }
  }
])

.controller('MainCtrl', [
  '$scope', '$rootScope', 'authUrl',
  function($scope, $rootScope, authUrl) {
    authUrl.then(function(authUrl) {
      $scope.authUrl = authUrl
    })

    var unbindables = []

    unbindables.push($rootScope.$on('alert', function(event, alert) {
      $scope.alert = {
        show: alert.show,
        message: alert.message,
        type: alert.type,
      }
    }))

    var saveAlertShowStatus
    unbindables.push($rootScope.$on('$stateChangeStart', function() {
      if ($scope.alert !== undefined && $scope.alert.show === true) {
        saveAlertShowStatus = true
        $scope.alert.show = false
      }

      $scope.loading = true
    }))

    unbindables.push($rootScope.$on('$stateChangeSuccess', function() {
      if (saveAlertShowStatus)
        $scope.alert.show = true

      saveAlertShowStatus = false
      $scope.loading = false
    }))

    $scope.$on('$destroy', function() {
      unbindables.forEach(function(unbindable) {
        unbindable()
      })
    })
  }
])