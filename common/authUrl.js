'use strict'

angular.module('opengash')

.factory('authUrl', function($q, lStorage, utils) {
  var clientId = '577114317990-7a6835et9gedrs3a605osqsb2mpc9inn.apps.googleusercontent.com'

  return function(options) {
    var googleAuthentication = $q.defer()

    options = options || {}
    options.immediate = options.immediate === undefined

    gapi.auth.authorize(
      {
        client_id: clientId,
        response_type: 'token id_token',
        cookie_policy: 'single_host_origin',
        immediate: options.immediate,
        scope: 'email https://www.googleapis.com/auth/analytics.readonly https://www.googleapis.com/auth/userinfo.profile',
      },

      function(authResults) {
        if (!_.isEmpty(authResults.error)) {
          googleAuthentication.reject(authResults)
        } else {
          lStorage.setVal('credentialsExpirationTime', utils.currentTime() + 3600000)
          lStorage.setVal('accessToken', authResults.access_token)
          lStorage.setVal('idToken', authResults.id_token)

          googleAuthentication.resolve(authResults)
        }
      }
    )

    return googleAuthentication.promise
  }
})
