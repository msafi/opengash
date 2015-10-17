describe('metricsFilter', function() {
  var metricsFilter
  beforeEach(function() {
    module('dashboard', 'commonServices')

    inject(function(_metricsFilter_) {
      metricsFilter = _metricsFilter_
    })
  })

  it('should format integer type Google Analytics metrics as numbers', function() {
    expect(metricsFilter(2000.00, 'ga:visitors')).toBe('2,000')
    expect(metricsFilter(2000.01, 'ga:visitors')).toBe('2,000.01')
    expect(metricsFilter(2000.567, 'ga:visitors')).toBe('2,000.57')
  })

  it('should format time type Google Analytics metrics as hh:mm:ss', function() {
    expect(metricsFilter(60, 'ga:avgTimeOnSite')).toBe('00:01:00')
  })

  it('should format percentage type Google Analytics metrics as X%', function() {
    expect(metricsFilter(50.20, 'ga:visitBounceRate')).toBe('50.2%')
  })

})