describe('googleAnalytics', function() {
  var googleAnalytics
    , $httpBackend
    , $cookies
    , $provide
    , userAccount
    , $timeout
    , metricsData

  beforeEach(function() {
    module(
      'mocks',
      'commonServices',
      function(_$provide_) {
        $provide = _$provide_
      }
    )

    inject(function($injector) {
      $cookies = $injector.get('mock_$cookies')
      $provide.value('$cookies', $cookies)

      $httpBackend = $injector.get('mock_$httpBackend')
      googleAnalytics = $injector.get('googleAnalytics')
      userAccount = $injector.get('mock_userAccount')
      metricsData = $injector.get('metricsData')
      $timeout = $injector.get('$timeout')
    })
  })

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation()
    $httpBackend.verifyNoOutstandingRequest()
  })

  describe('call', function() {
    it('should include accessToken from $cookies to a given API call', function() {
      $httpBackend.expectGET("http://www.example.com/?access_token=" + $cookies.accessToken)

      googleAnalytics.call('http://www.example.com/', function(results) {
        expect(results).toBe('OK!')
      })

      $httpBackend.flush()
    })
  })

  describe('fetchViews', function() {
    it("should return an array of the user's Google Analytics views", function() {
      googleAnalytics.fetchViews().then(function(views) {
        expect(views.length > 5).toBe(true)
      })

      $httpBackend.flush()
    })
  })

  describe('getReport', function() {
    it('should return report data from Google Analytics', function() {
      var id = 'ga:' + userAccount.savedViews[0].id

      googleAnalytics.getReport(id, '2013-25-09', '2013-25-09', metricsData.raw.toString()).then(function(body) {
        expect(body.kind).toBe('analytics#gaData')
      })

      $timeout.flush()
      $httpBackend.flush()
    })
  })
})