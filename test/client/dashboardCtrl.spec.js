describe('dashboardCtrl', function() {
  var scope
    , googleAnalytics
    , userAccount
    , periods
    , metricsData
    , $rootScope

  beforeEach(module('dashboard', 'metricsData', 'mocks'))

  beforeEach(inject(function($controller, _$rootScope_, _metricsData_, mock_googleAnalytics, mock_userAccount, mock_periods) {
    $rootScope = _$rootScope_
    scope = $rootScope.$new()
    googleAnalytics = mock_googleAnalytics
    userAccount = mock_userAccount
    periods = mock_periods
    metricsData = _metricsData_

    runs(function() {
      $controller('dashboardCtrl', {
        $scope: scope,
        googleAnalytics: googleAnalytics,
        userAccount: userAccount,
        periods: periods,
        metricsData: metricsData
      })
    })

    waitsFor(function() {
      return scope.tableContent && Object.keys(scope.tableContent).length == userAccount.savedViews.length
    }, 'tableContent to be filled', 1000)
  }))

  describe('tableStructure', function() {
    it('should have array of metrics, views, and periods', function() {
      expect(Array.isArray(scope.tableStructure.metrics)).toBe(true)
      expect(Array.isArray(scope.tableStructure.views)).toBe(true)
      expect(Array.isArray(scope.tableStructure.periods)).toBe(true)
    })
  })

  describe('tableContent', function() {
    it('should contain Google Analytics reports data for 2013-09-25 and 2013-09-24', function() {
      expect(Object.keys(scope.tableContent).length).toBe(5) // Five websites in mock data
      expect(scope.tableContent['ga:' + userAccount.savedViews[0].id].today.query['start-date']).toBe('2013-09-25')
      expect(scope.tableContent['ga:' + userAccount.savedViews[0].id].yesterday.query['start-date']).toBe('2013-09-24')
    })
  })

  describe('tableComparisonContent', function() {
    it('should contain Google Analytics reports data for 2013-09-17', function() {
      expect(Object.keys(scope.tableComparisonContent).length).toBe(5) // Five websites in mock data
      expect(scope.tableComparisonContent['ga:' + userAccount.savedViews[0].id].yesterday.query['start-date']).toBe('2013-09-17')
    })
  })

  describe('metricsData', function() {
    it("should work like the metricsData service", function() {
      expect(scope.metricsData['ga:visitors'].name).toBe(metricsData['ga:visitors'].name)
    })
  })
})