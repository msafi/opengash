describe('mainCtrl', function() {
  var $state
    , $cookies
    , ogAccount
    , $controller

  beforeEach(module('ogControllers', 'ogMocks'))

  beforeEach(inject(function(_$controller_, mock_$cookies, mock_ogAccount, mock_$state) {
    $controller = _$controller_
    $state = mock_$state
    $cookies = mock_$cookies
    ogAccount = mock_ogAccount
  }))

  it('should redirect to `dashboard` when cookies are set and ogAccount.getSavedViews succeeds', function() {
    $cookies = { accessToken: true, loggedIn: true }
    ogAccount.succeed = true

    $controller('mainCtrl', { $state: $state, $cookies: $cookies, ogAccount: ogAccount })

    waitsFor(function() {
      return $state.name == 'dashboard'
    }, '$state to be dashboard', 1000)

    runs(function() {
      expect($state.name).toBe('dashboard')
    })
  })

  it('should redirect to `addViews` when cookies are set but ogAccount.getSavedViews fails', function() {
    $cookies = { accessToken: true, loggedIn: true }
    ogAccount.succeed = false

    $controller('mainCtrl', { $state: $state, $cookies: $cookies, ogAccount: ogAccount })

    waitsFor(function() {
      return $state.name == 'addViews'
    }, '$state to be addViews', 1000)

    runs(function() {
      expect($state.name).toBe('addViews')
    })
  })

  it('should redirect to `login` when either loggedIn or accessToken are undefined', function() {
    $cookies = { accessToken: true, loggedIn: undefined }
    ogAccount.succeed = true
    $controller('mainCtrl', { $state: $state, $cookies: $cookies, ogAccount: ogAccount })
    expect($state.name).toBe('login')


    $cookies = { accessToken: undefined, loggedIn: true }
    ogAccount.succeed = true
    $controller('mainCtrl', { $state: $state, $cookies: $cookies, ogAccount: ogAccount })
    expect($state.name).toBe('login')
  })
})