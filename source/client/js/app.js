'use strict'

angular.module('opengash', [
  // Dependency modules
  'ngCookies',
  'ui.router',
  'ogControllers',
  'ogServices',
  'ogDirectives',
  'ogMetricsData'
])

.config([
  '$stateProvider', '$locationProvider',
  function ($stateProvider, $locationProvider) {
    $stateProvider.
      state('login', {
        templateUrl: 'connect.html'
      }).state('addViews', {
        templateUrl: 'add-views.html'
      }).state('dashboard', {
        templateUrl: 'dashboard.html'
      });
    $locationProvider.
      html5Mode(true).
      hashPrefix('!')
  }
])