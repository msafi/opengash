angular.module('opengash')

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
