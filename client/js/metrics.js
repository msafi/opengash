angular.module('ogMetricsData', [])

/**
 * This has Google Analytics metrics configurations
 *
 * @namespace ng.service.metricsData
 */
.factory('metricsData', [
  function () {
    var metricsData = {}

    metricsData.names = {
      'ga:visitors': 'Unique visitors',
      'ga:pageviews': 'Pageviews',
      'ga:pageviewsPerVisit': 'Pages per visit',
      'ga:avgTimeOnSite': 'Average time on site',
      'ga:visitBounceRate': 'Bounce rate',
      'ga:percentNewVisits': 'Percentage of new visits',
      'ga:avgPageLoadTime': 'Average page load time'
    }

    metricsData.isBiggerBetter = {
      'ga:visitors': true,
      'ga:pageviews': true,
      'ga:pageviewsPerVisit': true,
      'ga:avgTimeOnSite': true,
      'ga:visitBounceRate': false,
      'ga:percentNewVisits': true,
      'ga:avgPageLoadTime': false
    }

    metricsData.type = {
      'ga:visitors': 'quantity',
      'ga:pageviews': 'quantity',
      'ga:pageviewsPerVisit': 'quantity',
      'ga:avgTimeOnSite': 'seconds',
      'ga:visitBounceRate': 'percentage',
      'ga:percentNewVisits': 'percentage',
      'ga:avgPageLoadTime': 'seconds'
    }

    metricsData.raw = (function () {
      var results = []
      for (var key in metricsData.names) {
        results.push(key)
      }
      return results
    })()

    metricsData.pretty = (function () {
      var results = []
      for (var key in metricsData.names) {
        results.push(metricsData.names[key])
      }
      return results
    })()

    return metricsData
  }
])

/**
 * This filters returned metric results according to the metric's data type
 *
 * @namespace ng.filter.metricsFilter
 */
.filter('metricsFilter', [
  'metricsData', 'numberFilter',
  function(metricsData, numberFilter) {
    return function(input, metric) {
      if (!input)
        return ''

      switch (metricsData.type[metric]) {
        case 'quantity':
          return numberFilter(parseFloat(parseFloat(input).toFixed(2)))
        case 'seconds':
            // http://stackoverflow.com/a/6313008/604296
            var sec_num = parseInt(input, 10);
            var hours = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);

            if (hours < 10) { hours = "0" + hours; }
            if (minutes < 10) { minutes = "0" + minutes; }
            if (seconds < 10) { seconds = "0" + seconds; }

            var time = hours + ':' + minutes + ':' + seconds;

            return time;
        case 'percentage':
          return parseFloat(parseFloat(input).toFixed(1)) + '%'
        default:
          return input
      }
    }
  }
])