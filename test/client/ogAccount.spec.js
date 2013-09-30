describe('ogAccount', function() {
  var $provide
    , $cookies
    , ogAccount
    , $httpBackend

  beforeEach(function() {
    module(
      'ogServices',
      'ogMocks',
      function(_$provide_) {
        $provide = _$provide_
      }
    )

    inject(function($injector) {
      $cookies = $injector.get('mock_$cookies')
      $httpBackend = $injector.get('mock_$httpBackend')

      $provide.value('$cookies', $cookies)

      ogAccount = $injector.get('ogAccount')
    })
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
})