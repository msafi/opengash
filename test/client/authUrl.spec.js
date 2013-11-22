describe('authUrl', function() {
  var inject_authUrl
    , scope

  beforeEach(module('welcome', 'mocks'))

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('mock_$httpBackend')

    inject_authUrl = function() {
      return $injector.get('authUrl')
    }

    scope = $injector.get('$rootScope')
  }))

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation()
    $httpBackend.verifyNoOutstandingRequest()
  })

  it('should fetch data from server', function() {
    $httpBackend.expectGET('api/authurl')
    inject_authUrl()
    $httpBackend.flush()
  })

  it("should contain a Google OAuth 2.0 compatible URL", function() {
    inject_authUrl().then(function(results) {
      var parser = document.createElement('a')
      parser.href = results
      expect(parser.hostname).toBe('accounts.google.com')
    })

    $httpBackend.flush()
  })
})