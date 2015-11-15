angular.module('opengash')

.service('lStorage',
  function() {
    return {
      setVal: function(key, value) {
        localStorage[key] = angular.toJson({ value: value })
      },

      getVal: function(key) {
        return (localStorage[key] === undefined) ? undefined : angular.fromJson(localStorage[key]).value
      },

      removeItem: function(key) {
        return (localStorage[key] === undefined) ? undefined : localStorage.removeItem(key)
      },

      clear: function() {
        return localStorage.clear()
      }
    }
  }
)
