describe('periods', function() {
  var periods

  beforeEach(function() {
    module('ogServices')

    inject(function($injector) {
      periods = $injector.get('periods')
    })
  })

  describe('dates', function() {
    it('should have a bunch of period: { start: yyyy-MM-dd, end: yyyy-MM-dd }', function() {
      expect(Object.keys(periods.dates).length > 3).toBe(true)
      expect(periods.dates.today.start.length === 10).toBe(true)
    })
  })

  describe('comparisonDates', function() {
    it('should have a bunch of period: { start: yyyy-MM-dd, end: yyyy-MM-dd }', function() {
      expect(Object.keys(periods.comparisonDates).length > 3).toBe(true)
      expect(periods.comparisonDates.yesterday.start.length === 10).toBe(true)
    })
  })

  describe('ordered', function() {
    it('should an array of periods in chronological order', function() {
      expect(periods.ordered[0] === 'Today' &&
             periods.ordered[1] === 'Yesterday' &&
             periods.ordered[2] === 'Week' &&
             periods.ordered[3] === 'Month' &&
             periods.ordered[4] === 'Year').toBe(true)
    })
  })

  describe('totalPeriods', function() {
    it('should be a number containing the sum of periods of dates and comparisonDates objects',function() {
      var totalPeriods = Object.keys(periods.dates).length + Object.keys(periods.comparisonDates).length
      expect(periods.totalPeriods).toBe(totalPeriods)
    })
  })

  describe('forEach', function() {
    it('should iterate over a given array, calling back a function for each period in `dates`', function() {
      var arrStuff = [1,2,3]
        , results = []

      periods.forEach(arrStuff, function(stuffItem, periodName) {
        results.push(stuffItem + ' ' + periodName)
      })

      expect(results[0]).toBe('1 today')
    })
  })

})