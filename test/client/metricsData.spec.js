describe('metricsData', function() {
  var metricsData

  beforeEach(function() {
    module('ogMetricsData')

    inject(function($injector) {
      metricsData = $injector.get('metricsData')
    })
  })

  describe('names', function() {
    it('should contain the pretty names of Google Analytics metrics', function() {
      expect(metricsData.names['ga:visitors']).toBe('Unique visitors')
    })
  })

  describe('biggerIsBetter', function() {
    it('should tell us if a larger figure for a metric is better than a smaller one', function() {
      expect(metricsData.biggerIsBetter['ga:visitBounceRate']).toBe(false)
    })
  })

  describe('type', function() {
    it('should give us the data type of the metric, like integer, percent, time, etc', function() {
      expect(metricsData.type['ga:visitBounceRate']).toBe('percentage')
    })
  })

  describe('raw', function() {
    it('should give us an array of all the stored metrics in their raw/ugly names', function() {
      expect(metricsData.raw.indexOf('ga:visitors')).toNotBe(-1)
    })
  })

  describe('pretty', function() {
    it('should give us an array of all the stored metrics in their pretty format', function() {
      expect(metricsData.pretty.indexOf('Unique visitors')).toNotBe(-1)
    })
  })
})