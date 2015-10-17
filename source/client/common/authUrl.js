'use strict'

angular.module('authUrl', [])

.factory('authUrl', [
  '$http', '$q',
  function($http, $q) {
    var deferred = $q.defer()

    // todo: cache this response
    $http({method: 'GET', url: 'api/authurl', cache: true}).then(function(body) {
      deferred.resolve(body.data.url)
    })

    return deferred.promise
  }
])