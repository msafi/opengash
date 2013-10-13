describe('gaApi', function() {
  var gaApi
    , $httpBackend
    , $cookies
    , $provide
    , ogAccount
    , $timeout
    , metricsData

  beforeEach(function() {
    module(
      'ogServices',
      'ogMocks',
      'ogMetricsData',
      function(_$provide_) {
        $provide = _$provide_
      }
    )

    inject(function($injector) {
      $cookies = $injector.get('mock_$cookies')
      $provide.value('$cookies', $cookies)

      $httpBackend = $injector.get('mock_$httpBackend')
      gaApi = $injector.get('gaApi')
      ogAccount = $injector.get('mock_ogAccount')
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

      gaApi.call('http://www.example.com/', function(results) {
        expect(results).toBe('OK!')
      })

      $httpBackend.flush()
    })
  })

  describe('fetchViews', function() {
    it("should call back with an array of the user's Google Analytics views", function() {
      gaApi.fetchViews(function(views) {
        expect(views.length > 5).toBe(true)
      })

      $httpBackend.flush()
    })
  })

  describe('getReport', function() {
    it('should return report data from Google Analytics', function() {
      var id = 'ga:' + ogAccount.savedViews[0].id

      gaApi.getReport(id, '2013-25-09', '2013-25-09', metricsData.raw.toString()).then(function(body) {
        expect(body.kind).toBe('analytics#gaData')
      })

      $timeout.flush()
      $httpBackend.flush()
    })
  })
})