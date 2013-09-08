'use strict';

/**
 * The AngularJS opengash bootstrapper.
 *
 * @namespace ng.opengash
 */
var opengash = angular.module('opengash', ['ngCookies', 'ui.router']);

/**
 * Sets up the initial configurations of opengash app.
 *
 * @member ng.opengash.config
 */
opengash.config([
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