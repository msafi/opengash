'use strict';

/**
 * The AngularJS opengash bootstrapper.
 *
 * @namespace ng.opengash
 */
angular.module('opengash', [
    // Dependency modules
    'ngCookies',
    'ui.router',
    'ogControllers',
    'ogServices',
    'ogDirectives',
    'ogMetricsData'
])

/**
 * Sets up the initial configurations of opengash app.
 *
 * @member ng.opengash.config
 */
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
      hashPrefix('!');
  }
]);