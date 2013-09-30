describe('addViewsCtrl', function() {
  var scope
    , $state
    , ogAccount

  beforeEach(module('ogControllers', 'ogMocks'))

  beforeEach(inject(function($rootScope, $controller, mock_ogAccount, mock_$state) {
    $state = mock_$state
    ogAccount = mock_ogAccount
    scope = $rootScope.$new()

    $controller('addViewsCtrl', {$scope: scope, ogAccount: ogAccount, $state: $state})
  }))

  describe('allViews', function() {
    it('should have views back from Google API', function() {
      expect(scope.allViews.kind).toBe('analytics#profiles')
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
      expect(ogAccount.savedViews[0].name).toBe('foo')
      expect($state.name).toBe('dashboard')
    })
  })
})