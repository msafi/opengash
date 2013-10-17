angular.module('ogMetricsData', [])

/**
 * This has Google Analytics metrics configurations
 *
 * @namespace ng.service.metricsData
 */
.factory('metricsData', [
  function () {

    var metricsData = {
      'ga:visitors': {
        name: 'Unique visitors',
        biggerIsBetter: true,
        type: 'integer',
        urlFragment: 'visitors-overview'
      },
      'ga:pageviews': {
        name: 'Pageviews',
        biggerIsBetter: true,
        type: 'integer',
        urlFragment: 'content-pages'
      },
      'ga:pageviewsPerVisit': {
        name: 'Pages per visit',
        biggerIsBetter: true,
        type: 'integer',
        urlFragment: 'visitors-overview',
      },
      'ga:avgTimeOnSite': {
        name: 'Average time on site',
        biggerIsBetter: true,
        type: 'seconds',
        urlFragment: 'visitors-engagement'
      },
      'ga:visitBounceRate': {
        name: 'Bounce rate',
        biggerIsBetter: false,
        type: 'percentage',
        urlFragment: 'trafficsources-overview',
      },
      'ga:percentNewVisits': {
        name: 'Percentage of new visits',
        biggerIsBetter: true,
        type: 'percentage',
        urlFragment: 'trafficsources-overview',
      },
      'ga:avgPageLoadTime': {
        name: 'Average page load time',
        biggerIsBetter: false,
        type: 'seconds',
        urlFragment: 'content-site-speed-overview'
      }
    }

    metricsData.raw = Object.keys(metricsData)

    metricsData.pretty = (function () {
      var results = []
      for (var key in metricsData) {
        results.push(metricsData[key].name)
      }
      return results
    })()

    return metricsData
  }
])

/**
 * This filters returned metric results according to the metric's data type
 *
 * @namespace ng.filter.metrics
 */
.filter('metrics', [
  'metricsData', 'numberFilter',
  function(metricsData, numberFilter) {
    return function(input, metric) {
      if (!input)
        return ''

      switch (metricsData[metric].type) {
        case 'integer':
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