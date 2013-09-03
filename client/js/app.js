'use strict';

var opengash = angular.module('opengash', ['ngCookies', 'ui.router']);

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