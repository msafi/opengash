'use strict'

angular.module('welcome', [])

.controller('connectCtrl', [
  '$scope', 'authUrl',
  function($scope, authUrl) {
    $scope.authUrl = authUrl
  }
])

.factory('authUrl', [
  '$http', '$q',
  function ($http, $q) {
    var deferred = $q.defer()

    $http({method: 'GET', url: 'api/authurl'}).then(function(body) {
      deferred.resolve(body.data.url)
    })

    return deferred.promise
  }
])