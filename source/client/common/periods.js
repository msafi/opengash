angular.module('periods', [])

.factory('periods', [
  'dateFilter',
  function(dateFilter) {

    var periods = {}

    var _getNiceDate = function(days) {
      var currentTime
      currentTime = new Date().getTime()
      return dateFilter(currentTime - (days * 86400000), 'yyyy-MM-dd')
    }


    periods.dates = {
      today: { start: _getNiceDate(0), end: _getNiceDate(0) },
      yesterday: {start: _getNiceDate(1), end: _getNiceDate(1) },
      week: {start: _getNiceDate(7), end: _getNiceDate(1) },
      month: {start: _getNiceDate(30), end: _getNiceDate(1) },
      year: {start: _getNiceDate(365), end: _getNiceDate(1) }
    };


    periods.comparisonDates = {
      yesterday: {start: _getNiceDate(8), end: _getNiceDate(8) }, // Compare yesterday to the same day the previous week.
      week: {start: _getNiceDate(14), end: _getNiceDate(8) }, // Compare to the previous 7 days.
      month: {start: _getNiceDate(60), end: _getNiceDate(31) }, // Compare to the previous 30 days
      year: {start: _getNiceDate(730), end: _getNiceDate(366) } // Compare to the previous 365 days
    };

    periods.ordered = ['Today', 'Yesterday', 'Week', 'Month', 'Year']

    periods.totalPeriods = (function() {
      return Object.keys(periods.dates).length + Object.keys(periods.comparisonDates).length
    })();

    periods.forEach = function(arrProfileIds, callback) {
      var eachPeriod;

      // iterate over each web property
      arrProfileIds.forEach(function(profileId) {
        // iterate over each period
        for (eachPeriod in periods.dates) {
          callback(profileId, eachPeriod)
        }
      })
    }

    return periods;
  }
])