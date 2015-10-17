describe('mainCtrl', function() {
  var $state
  var userAccount
  var $controller
  var $location
  var $rootScope
  var $scope
  var authUrl
  var $httpBackend

  beforeEach(function() {
    module('opengash', 'mocks')

    inject(function($injector) {
      $controller = $injector.get('$controller')
      $state = $injector.get('mock_$state')
      userAccount = $injector.get('mock_userAccount')
      $location = $injector.get('$location')
      $rootScope = $injector.get('$rootScope')
      authUrl = $injector.get('authUrl')
      $httpBackend = $injector.get('mock_$httpBackend')
    })

    $scope = $rootScope.$new()

    $controller('MainCtrl', {
      $state: $state,
      userAccount: userAccount ,
      $location: $location,
      $scope: $scope,
      $rootScope: $rootScope,
      authUrl: authUrl,
    })
  })

  it("should set authUrl property to Google login URL", function() {
    $scope.$apply()
    $httpBackend.flush()

    var parser = document.createElement('a')

    parser.href = $scope.authUrl

    expect(parser.hostname).toBe('accounts.google.com')
  })

//  it("should call $state.go with the same value that userAccount.status() returns", function() {
//    $scope.$apply()
//    expect($state.name).toBe('foobarz')
//  })
})