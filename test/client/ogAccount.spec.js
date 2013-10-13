describe('ogAccount', function() {
  var $provide
    , $cookies
    , ogAccount
    , $httpBackend
    , metricsData
    , $timeout
    , key
    , dateFilter
    , $rootScope

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
      $httpBackend = $injector.get('mock_$httpBackend')
      metricsData = $injector.get('metricsData')
      $timeout = $injector.get('$timeout')
      dateFilter = $injector.get('dateFilter')
      $rootScope = $injector.get('$rootScope')

      $provide.value('$cookies', $cookies)

      ogAccount = $injector.get('ogAccount')
    })

    key = 'ga:115370112013-25-092013-25-09' + metricsData.raw.toString()
  })

  describe('getSavedViews', function() {
    it('should send a request to the server and return saved Google Analytics views', function() {
      ogAccount.getSavedViews().then(function(results) {
        expect(results.length > 3).toBe(true)
      })

      $httpBackend.flush()
    })
  })

  describe('getAllViews', function() {
    it('should return an array of all saved Google Analytics profiles directly from Google', function() {
      ogAccount.getAllViews().then(function(results) {
        expect(results.length > 3).toBe(true)
      })

      $httpBackend.expectGET(/https:\/\/www.googleapis.com\/analytics\/v3\/management\/accounts\/~all\/webproperties\/~all\/profiles.*/)
      $httpBackend.flush()
    })
  })

  describe('saveViews', function() {
    it('should POST a given array of views to `api/ga-views/json`', function() {
      var arrViews = ['array', 'of', 'views']
      ogAccount.saveViews(arrViews)
      $httpBackend.flush()
      $httpBackend.expectPOST(/api\/ga-views\/json.*/, arrViews).respond(200)
    })
  })

  describe('shouldServeCache', function() {
    it('should return false if `latestCall` is != today', function() {
      localStorage['latestCall'] = '1999-01-01'

      ogAccount.shouldServeCache().then(function(shouldServeCache) {
        expect(shouldServeCache).toBe(false)
      })

      $rootScope.$apply()
    })

    it('should return true if `latestCall` is == today', function() {
      var today = new Date().getTime()
      localStorage['latestCall'] = dateFilter(today, 'yyyy-MM-dd')

      ogAccount.shouldServeCache().then(function(shouldServeCache) {
        expect(shouldServeCache).toBe(true)
      })

      $rootScope.$apply()
    })

    it('should clear the cache when `latestCall` is != today', function() {
      localStorage['latestCall'] = '1999-01-01'

      ogAccount.shouldServeCache().then(function() {
        expect(localStorage['latestCall']).toBeFalsy()
      })

      $rootScope.$apply()
    })
  })

  describe('getReport', function() {
    it('should make an actual request to Google if instructed not to use cache', function() {
      ogAccount.getReport('ga:11537011', '2013-25-09', '2013-25-09', metricsData.raw.toString(), false).then(function(body) {
        expect(body.kind).toBe('analytics#gaData')
      })

      $httpBackend.expectGET(/https:\/\/www\.googleapis\.com\/analytics\/v3\/data\/ga\?access_token=.*/)

      $timeout.flush()
      $httpBackend.flush()
    })

    it('should save the results to localStorage when it makes an HTTP request', function() {
      ogAccount.getReport('ga:11537011', '2013-25-09', '2013-25-09', metricsData.raw.toString(), false).then(function() {
        expect(localStorage[key]).toBeTruthy()
      })

      $timeout.flush()
      $httpBackend.flush()
    })

    it('should retrieve data from localStorage if it is instructed to use cache', function() {
      // First put something in localStorage
      localStorage[key] = JSON.stringify({ say: 'ohhaii!' })

      // Now instruct ogAccount to use cache and give it the parameters that will produce the same key used above
      ogAccount.getReport('ga:11537011', '2013-25-09', '2013-25-09', metricsData.raw.toString(), true)
        .then(function(results) {
          expect(results.say).toBe('ohhaii!')
        })

        $rootScope.$apply()
    })

    it('should record the date of its latest HTTP request in `latestCall` localStorage', function() {
      localStorage.clear()
      ogAccount.getReport('ga:11537011', '2013-25-09', '2013-25-09', metricsData.raw.toString(), false).then(function() {
        var currentTime = new Date().getTime()
        var latestCall = dateFilter(currentTime, 'yyyy-MM-dd')
        expect(localStorage['latestCall']).toBe(latestCall)
      })

      $timeout.flush()
      $httpBackend.flush()
    })

    it('should never use cache if the date given is of today', function() {
      // First put something in localStorage
      var currentTime = new Date().getTime()
      currentTime = dateFilter(currentTime, 'yyyy-MM-dd')
      var key = 'ga:11537011' + currentTime + currentTime + metricsData.raw.toString()
      localStorage[key] = JSON.stringify({ say: 'ohhaii!' })

      // Now instruct ogAccount to use cache and give it the parameters that will produce the same key used above
      ogAccount.getReport('ga:11537011', currentTime, currentTime, metricsData.raw.toString(), true)
        .then(function(results) {
          expect(results.say).not.toBe('ohhaii!')
        })

      $httpBackend.expectGET(/https:\/\/www\.googleapis\.com\/analytics\/v3\/data\/ga\?access_token=.*/)

      $timeout.flush()
      $httpBackend.flush()
    })


  })
})