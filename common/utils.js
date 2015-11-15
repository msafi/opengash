angular.module('opengash')

.service('utils',
  function() {

    return {
      currentTime: function() {
        return Date.now()
      }
    }
  }
)
