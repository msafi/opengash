describe('connectCtrl', function() {
  beforeEach(module('ogControllers', 'ogMocks'))

  it('should simply return a Google OAuth 2.0 compatible URL', function() {
    inject(function($rootScope, $controller, mock_authUrl) {

      var scope = $rootScope.$new()
        , parser = document.createElement('a')

      $controller('connectCtrl', {$scope: scope, authUrl: mock_authUrl})
      parser.href = scope.authUrl

      expect(parser.hostname).toBe('accounts.google.com')
    })
  })
})