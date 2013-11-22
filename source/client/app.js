'use strict'

angular.module('opengash', [
  // Dependency modules
  'ngCookies',
  'ui.router',
  'welcome',
  'userProfile',
  'dashboard',
  'commonServices',
])

.config([
  '$stateProvider', '$locationProvider',
  function ($stateProvider, $locationProvider) {
    $stateProvider
      .state('login', {
        views: {
          "main": {templateUrl: 'welcome/connect.html'},
          "navLink": {templateUrl: 'userProfile/loginLink.html'}
        }
      })
      .state('addViews', {
        views: {
          "main": {templateUrl: 'userProfile/addViews.html'},
          "navLink": {templateUrl: 'userProfile/accountLink.html'}
        }
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

.controller('mainCtrl', [
  '$state', 'userAccount', '$location',
  function($state, userAccount, $location) {
    if ($location.path() !== '/')
      return

    userAccount.status().then(function(status) {
      $state.go(status)
    })
  }
])