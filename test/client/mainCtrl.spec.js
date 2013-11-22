//describe('mainCtrl', function() {
//  var $state
//    , $cookies
//    , userAccount
//    , $controller
//
//  beforeEach(module('ogControllers', 'ogMocks'))
//
//  beforeEach(inject(function(_$controller_, mock_$cookies, mock_userAccount, mock_$state) {
//    $controller = _$controller_
//    $state = mock_$state
//    $cookies = mock_$cookies
//    userAccount = mock_userAccount
//  }))
//
//  it('should redirect to `dashboard` when cookies are set and ogAccount.getSavedViews succeeds', function() {
//    $cookies = { accessToken: true, loggedIn: true }
//    userAccount.succeed = true
//
//    $controller('mainCtrl', { $state: $state, $cookies: $cookies, ogAccount: userAccount })
//
//    waitsFor(function() {
//      return $state.name == 'dashboard'
//    }, '$state to be dashboard', 1000)
//
//    runs(function() {
//      expect($state.name).toBe('dashboard')
//    })
//  })
//
//  it('should redirect to `addViews` when cookies are set but ogAccount.getSavedViews fails', function() {
//    $cookies = { accessToken: true, loggedIn: true }
//    userAccount.succeed = false
//
//    $controller('mainCtrl', { $state: $state, $cookies: $cookies, ogAccount: userAccount })
//
//    waitsFor(function() {
//      return $state.name == 'addViews'
//    }, '$state to be addViews', 1000)
//
//    runs(function() {
//      expect($state.name).toBe('addViews')
//    })
//  })
//
//  it('should redirect to `login` when either loggedIn or accessToken are undefined', function() {
//    $cookies = { accessToken: true, loggedIn: undefined }
//    userAccount.succeed = true
//    $controller('mainCtrl', { $state: $state, $cookies: $cookies, ogAccount: userAccount })
//    expect($state.name).toBe('login')
//
//
//    $cookies = { accessToken: undefined, loggedIn: true }
//    userAccount.succeed = true
//    $controller('mainCtrl', { $state: $state, $cookies: $cookies, ogAccount: userAccount })
//    expect($state.name).toBe('login')
//  })
//})