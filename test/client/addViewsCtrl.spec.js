describe('addViewsCtrl', function() {
  var scope
  var $state
  var userAccount

  beforeEach(function() {
    module('userProfile', 'mocks')

    inject(function($injector) {
      $state = $injector.get('mock_$state')
      userAccount = $injector.get('mock_userAccount')
      googleAnalytics = $injector.get('mock_googleAnalytics')

      var $rootScope = $injector.get('$rootScope')
      var $controller = $injector.get('$controller')
      var googleAnalytics

      scope = $rootScope.$new()
      $controller('addViewsCtrl', {$scope: scope, userAccount: userAccount, $state: $state, googleAnalytics: googleAnalytics})
    })
  })

  describe('allViews', function() {
    it('should have views back from Google API', function() {
      scope.$apply()
      expect(scope.allViews.length).toBe(5)
    })
  })

  describe('updateSelection', function() {
    var $event = { target: { checked: true } }
      , view = {name: 'foo', id: 1}

    it('should add a checked view to `selectedViews` array', function() {
      scope.updateSelection($event, view)
      expect(scope.selectedViews[0].name).toBe('foo')
    })

    it('should remove an unchecked view from `selectedViews` array', function() {
      $event.target.checked = false
      scope.updateSelection($event, view)
      expect(typeof scope.selectedViews[0]).toEqual('undefined')
    })
  })

  describe('saveSelectedViews', function() {
    it('should save selected views to ogAccount and load the dashboard state', function() {
      scope.selectedViews = [{name:'foo', id:1}, {name:'bar', id:2}]
      scope.saveSelectedViews()
      expect(userAccount.savedViews[0].name).toBe('foo')
      expect($state.name).toBe('dashboard')
    })
  })
})