angular.module('mocks', ['ngMock', 'metricsData'])

.factory("mock_$httpBackend",
  function($httpBackend, mock_$cookies, mock_userAccount) {
    var $cookies = mock_$cookies
      , userAccount = mock_userAccount
      , id = 'ga:' + userAccount.savedViews[0].id

    $httpBackend
      .when('GET', /http:\/\/www\.example\.com\/?\?access_token=.*/)
      .respond(200, 'OK!')

    $httpBackend
      .when('GET', 'api/authurl')
      .respond({ url: 'https://accounts.google.com/o/oauth2/auth' })

    $httpBackend
      .when('GET', 'https://www.googleapis.com/analytics/v3/management/accounts/~all/webproperties/~all/profiles?access_token=' + $cookies.accessToken)
      .respond('{"kind":"analytics#profiles","username":"msafi@msafi.com","totalResults":8,"startIndex":1,"itemsPerPage":1000,"items":[{"id":"11537011","kind":"analytics#profile","selfLink":"https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-1/profiles/11537011","accountId":"5715214","webPropertyId":"UA-5715214-1","internalWebPropertyId":"11036598","name":"DET","currency":"USD","timezone":"Asia/Riyadh","websiteUrl":"http://dubaiemploymenttips.com","type":"WEB","created":"2008-09-23T17:10:32.000Z","updated":"2013-04-04T13:14:30.375Z","eCommerceTracking":false,"parentLink":{"type":"analytics#webproperty","href":"https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-1"},"childLink":{"type":"analytics#goals","href":"https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-1/profiles/11537011/goals"}},{"id":"13623581","kind":"analytics#profile","selfLink":"https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-2/profiles/13623581","accountId":"5715214","webPropertyId":"UA-5715214-2","internalWebPropertyId":"12969258","name":"msafi.com","currency":"USD","timezone":"Asia/Riyadh","websiteUrl":"http://msafi.com","type":"WEB","created":"2008-12-19T12:55:25.000Z","updated":"2012-06-27T06:55:57.310Z","eCommerceTracking":false,"parentLink":{"type":"analytics#webproperty","href":"https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-2"},"childLink":{"type":"analytics#goals","href":"https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-2/profiles/13623581/goals"}},{"id":"21776812","kind":"analytics#profile","selfLink":"https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-4/profiles/21776812","accountId":"5715214","webPropertyId":"UA-5715214-4","internalWebPropertyId":"23444706","name":"Z. BGFK","currency":"USD","timezone":"Asia/Dubai","websiteUrl":"http://bestgamesforkids.net","type":"WEB","created":"2009-09-23T16:24:59.000Z","updated":"2012-04-18T01:42:09.515Z","eCommerceTracking":false,"parentLink":{"type":"analytics#webproperty","href":"https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-4"},"childLink":{"type":"analytics#goals","href":"https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-4/profiles/21776812/goals"}},{"id":"22020310","kind":"analytics#profile","selfLink":"https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-5/profiles/22020310","accountId":"5715214","webPropertyId":"UA-5715214-5","internalWebPropertyId":"23666249","name":"Z. WPMPs","currency":"USD","timezone":"Asia/Riyadh","websiteUrl":"http://wordpressmembershipplugins.net","type":"WEB","created":"2009-10-01T11:39:18.000Z","updated":"2012-04-18T01:42:39.284Z","eCommerceTracking":false,"parentLink":{"type":"analytics#webproperty","href":"https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-5"},"childLink":{"type":"analytics#goals","href":"https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-5/profiles/22020310/goals"}},{"id":"26084387","kind":"analytics#profile","selfLink":"https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-7/profiles/26084387","accountId":"5715214","webPropertyId":"UA-5715214-7","internalWebPropertyId":"27382504","name":"Z. WP4IM","currency":"USD","timezone":"Asia/Riyadh","websiteUrl":"http://wp4im.com","type":"WEB","created":"2010-02-06T08:44:17.000Z","updated":"2012-04-18T01:37:58.942Z","eCommerceTracking":false,"parentLink":{"type":"analytics#webproperty","href":"https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-7"},"childLink":{"type":"analytics#goals","href":"https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-7/profiles/26084387/goals"}},{"id":"37307543","kind":"analytics#profile","selfLink":"https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-8/profiles/37307543","accountId":"5715214","webPropertyId":"UA-5715214-8","internalWebPropertyId":"37758662","name":"WinkPress","currency":"USD","timezone":"Asia/Riyadh","websiteUrl":"http://winkpress.com","type":"WEB","created":"2010-09-29T15:44:46.605Z","updated":"2013-04-07T15:26:55.107Z","eCommerceTracking":false,"parentLink":{"type":"analytics#webproperty","href":"https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-8"},"childLink":{"type":"analytics#goals","href":"https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-8/profiles/37307543/goals"}},{"id":"55604500","kind":"analytics#profile","selfLink":"https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-11/profiles/55604500","accountId":"5715214","webPropertyId":"UA-5715214-11","internalWebPropertyId":"54646899","name":"ksafi.com","currency":"USD","timezone":"Asia/Riyadh","websiteUrl":"http://ksafi.com","type":"WEB","created":"2012-01-30T20:25:32.905Z","updated":"2012-06-27T06:55:44.993Z","eCommerceTracking":false,"parentLink":{"type":"analytics#webproperty","href":"https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-11"},"childLink":{"type":"analytics#goals","href":"https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-11/profiles/55604500/goals"}},{"id":"56394045","kind":"analytics#profile","selfLink":"https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-12/profiles/56394045","accountId":"5715214","webPropertyId":"UA-5715214-12","internalWebPropertyId":"55386753","name":"The Hollowverse","currency":"USD","timezone":"Asia/Riyadh","websiteUrl":"http://hollowverse.com","siteSearchQueryParameters":"search","type":"WEB","created":"2012-02-18T20:59:40.290Z","updated":"2013-04-04T13:32:48.067Z","eCommerceTracking":false,"parentLink":{"type":"analytics#webproperty","href":"https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-12"},"childLink":{"type":"analytics#goals","href":"https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-12/profiles/56394045/goals"}}]}')

    $httpBackend
      .when('GET', /https:\/\/www\.googleapis\.com\/analytics\/v3\/data\/ga\?access_token=.*/)
      .respond('{"kind": "analytics#gaData", "id": "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:11537011&metrics=ga:…centNewVisits,ga:avgPageLoadTime&start-date=2013-09-25&end-date=2013-09-25", "query": {"start-date": "2013-09-25", "end-date": "2013-09-25", "ids": "ga:11537011", "metrics": ["ga:visitors", "ga:pageviews", "ga:pageviewsPerVisit", "ga:avgTimeOnSite", "ga:visitBounceRate", "ga:percentNewVisits", "ga:avgPageLoadTime"], "start-index": 1, "max-results": 1000}, "itemsPerPage": 1000, "totalResults": 1, "selfLink": "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:11537011&metrics=ga:…centNewVisits,ga:avgPageLoadTime&start-date=2013-09-25&end-date=2013-09-25", "profileInfo": {"profileId": "11537011", "accountId": "5715214", "webPropertyId": "UA-5715214-1", "internalWebPropertyId": "11036598", "profileName": "DET", "tableId": "ga:11537011"}, "containsSampledData": false, "columnHeaders": [{"name": "ga:visitors", "columnType": "METRIC", "dataType": "INTEGER"},{"name": "ga:pageviews", "columnType": "METRIC", "dataType": "INTEGER"},{"name": "ga:pageviewsPerVisit", "columnType": "METRIC", "dataType": "FLOAT"},{"name": "ga:avgTimeOnSite", "columnType": "METRIC", "dataType": "TIME"},{"name": "ga:visitBounceRate", "columnType": "METRIC", "dataType": "PERCENT"},{"name": "ga:percentNewVisits", "columnType": "METRIC", "dataType": "PERCENT"},{"name": "ga:avgPageLoadTime", "columnType": "METRIC", "dataType": "FLOAT"}], "totalsForAllResults": {"ga:visitors": "2440", "ga:pageviews": "5016", "ga:pageviewsPerVisit": "1.8420859346309217", "ga:avgTimeOnSite": "618.4950422328315", "ga:visitBounceRate": "51.009915534337125", "ga:percentNewVisits": "67.79287550495778", "ga:avgPageLoadTime": "10.687555555555555"}, "rows": [["2440", "5016", "1.8420859346309217", "618.4950422328315", "51.009915534337125", "67.79287550495778", "10.687555555555555"]]}')

    $httpBackend
      .when('GET', /api\/ga-views.*/)
      .respond('[{"name" : "DET","id" : "11537011"},{"name" : "msafi.com","id" : "13623581"},{"name" : "WinkPress","id" : "37307543"},{"name" : "ksafi.com","id" : "55604500"},{"name" : "The Hollowverse","id" : "56394045"}]')

    $httpBackend
      .when('POST', /api\/ga-views.*/)
      .respond(200)

    return $httpBackend
  }
)

.factory('mock_$state', [
  function() {
    var $state = {}

    $state.name = undefined

    $state.go = function(name) {
      $state.name = name
    }

    return $state;
  }
])

.factory('mock_$cookies', [
  function() {
    var $cookies = {}
    $cookies.loggedIn = 'user@example.com'
    $cookies.accessToken = 's0m3l0ngstr1ng'
    $cookies.csrf = '123'

    return $cookies
  }
])

.factory('mock_userAccount',
  function(mock_googleAnalytics) {
    var userAccount = {}
    var $q
    var $timeout

    inject(function(_$q_, _$timeout_) {
      $q = _$q_
      $timeout = _$timeout_
    })

    userAccount.succeed = true

    userAccount.savedViews = [{"name": "DET", "id": "11537011"}, {"name": "msafi.com", "id": "13623581"},{"name": "WinkPress", "id": "37307543"}, {"name": "ksafi.com", "id": "55604500"},{"name": "The Hollowverse", "id": "56394045"}]

    userAccount.getSavedViews = function() {
      var deferred
        , that = this

      deferred = $q.defer()

      if (userAccount.succeed) {
        $timeout(function() {
          deferred.resolve(userAccount.savedViews)
        }, 200)
      } else {
        $timeout(function() {
          deferred.reject()
        }, 200)
      }

      setTimeout(function() {try {$timeout.flush.apply(that)} catch (err) {}}, 0)

      return deferred.promise
    }

    userAccount.getAllViews = function() {
      // This is what the actual service returns from Google for MK Safi
      return {"kind": "analytics#profiles", "username": "msafi@msafi.com", "totalResults": 8, "startIndex": 1, "itemsPerPage": 1000, "items": [{"id": "11537011", "kind": "analytics#profile", "selfLink": "https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-1/profiles/11537011", "accountId": "5715214", "webPropertyId": "UA-5715214-1", "internalWebPropertyId": "11036598", "name": "DET", "currency": "USD", "timezone": "Asia/Riyadh", "websiteUrl": "http://dubaiemploymenttips.com", "type": "WEB", "created": "2008-09-23T17:10:32.000Z", "updated": "2013-04-04T13:14:30.375Z", "eCommerceTracking": false, "parentLink": {"type": "analytics#webproperty", "href": "https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-1"}, "childLink": {"type": "analytics#goals", "href": "https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-1/profiles/11537011/goals"}},{"id": "13623581", "kind": "analytics#profile", "selfLink": "https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-2/profiles/13623581", "accountId": "5715214", "webPropertyId": "UA-5715214-2", "internalWebPropertyId": "12969258", "name": "msafi.com", "currency": "USD", "timezone": "Asia/Riyadh", "websiteUrl": "http://msafi.com", "type": "WEB", "created": "2008-12-19T12:55:25.000Z", "updated": "2012-06-27T06:55:57.310Z", "eCommerceTracking": false, "parentLink": {"type": "analytics#webproperty", "href": "https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-2"}, "childLink": {"type": "analytics#goals", "href": "https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-2/profiles/13623581/goals"}},{"id": "21776812", "kind": "analytics#profile", "selfLink": "https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-4/profiles/21776812", "accountId": "5715214", "webPropertyId": "UA-5715214-4", "internalWebPropertyId": "23444706", "name": "Z. BGFK", "currency": "USD", "timezone": "Asia/Dubai", "websiteUrl": "http://bestgamesforkids.net", "type": "WEB", "created": "2009-09-23T16:24:59.000Z", "updated": "2012-04-18T01:42:09.515Z", "eCommerceTracking": false, "parentLink": {"type": "analytics#webproperty", "href": "https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-4"}, "childLink": {"type": "analytics#goals", "href": "https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-4/profiles/21776812/goals"}},{"id": "22020310", "kind": "analytics#profile", "selfLink": "https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-5/profiles/22020310", "accountId": "5715214", "webPropertyId": "UA-5715214-5", "internalWebPropertyId": "23666249", "name": "Z. WPMPs", "currency": "USD", "timezone": "Asia/Riyadh", "websiteUrl": "http://wordpressmembershipplugins.net", "type": "WEB", "created": "2009-10-01T11:39:18.000Z", "updated": "2012-04-18T01:42:39.284Z", "eCommerceTracking": false, "parentLink": {"type": "analytics#webproperty", "href": "https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-5"}, "childLink": {"type": "analytics#goals", "href": "https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-5/profiles/22020310/goals"}},{"id": "26084387", "kind": "analytics#profile", "selfLink": "https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-7/profiles/26084387", "accountId": "5715214", "webPropertyId": "UA-5715214-7", "internalWebPropertyId": "27382504", "name": "Z. WP4IM", "currency": "USD", "timezone": "Asia/Riyadh", "websiteUrl": "http://wp4im.com", "type": "WEB", "created": "2010-02-06T08:44:17.000Z", "updated": "2012-04-18T01:37:58.942Z", "eCommerceTracking": false, "parentLink": {"type": "analytics#webproperty", "href": "https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-7"}, "childLink": {"type": "analytics#goals", "href": "https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-7/profiles/26084387/goals"}},{"id": "37307543", "kind": "analytics#profile", "selfLink": "https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-8/profiles/37307543", "accountId": "5715214", "webPropertyId": "UA-5715214-8", "internalWebPropertyId": "37758662", "name": "WinkPress", "currency": "USD", "timezone": "Asia/Riyadh", "websiteUrl": "http://winkpress.com", "type": "WEB", "created": "2010-09-29T15:44:46.605Z", "updated": "2013-04-07T15:26:55.107Z", "eCommerceTracking": false, "parentLink": {"type": "analytics#webproperty", "href": "https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-8"}, "childLink": {"type": "analytics#goals", "href": "https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-8/profiles/37307543/goals"}},{"id": "55604500", "kind": "analytics#profile", "selfLink": "https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-11/profiles/55604500", "accountId": "5715214", "webPropertyId": "UA-5715214-11", "internalWebPropertyId": "54646899", "name": "ksafi.com", "currency": "USD", "timezone": "Asia/Riyadh", "websiteUrl": "http://ksafi.com", "type": "WEB", "created": "2012-01-30T20:25:32.905Z", "updated": "2012-06-27T06:55:44.993Z", "eCommerceTracking": false, "parentLink": {"type": "analytics#webproperty", "href": "https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-11"}, "childLink": {"type": "analytics#goals", "href": "https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-11/profiles/55604500/goals"}},{"id": "56394045", "kind": "analytics#profile", "selfLink": "https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-12/profiles/56394045", "accountId": "5715214", "webPropertyId": "UA-5715214-12", "internalWebPropertyId": "55386753", "name": "The Hollowverse", "currency": "USD", "timezone": "Asia/Riyadh", "websiteUrl": "http://hollowverse.com", "siteSearchQueryParameters": "search", "type": "WEB", "created": "2012-02-18T20:59:40.290Z", "updated": "2013-04-04T13:32:48.067Z", "eCommerceTracking": false, "parentLink": {"type": "analytics#webproperty", "href": "https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-12"}, "childLink": {"type": "analytics#goals", "href": "https://www.googleapis.com/analytics/v3/management/accounts/5715214/webproperties/UA-5715214-12/profiles/56394045/goals"}}]}
    }

    userAccount.saveViews = function(views) {
      userAccount.savedViews = views
    }

    userAccount.shouldServeCache = function() {
      var deferred = $q.defer()
        , that = this

      $timeout(function() {
        deferred.resolve(false)
      }, 200)

      setTimeout(function() { try { $timeout.flush.apply(that) } catch (err) {}}, 0)

      return deferred.promise
    }

    userAccount.getReport = function(ids, startDate, endDate, metrics) {
      var deferred = $q.defer()
        , that = this

      $timeout(function() {
        mock_googleAnalytics.getReport(ids, startDate, endDate, metrics).then(function(results) {
          deferred.resolve(results)
        })
      }, 200)

      setTimeout(function() { try { $timeout.flush.apply(that) } catch (err) {}}, 0)

      return deferred.promise
    }

    userAccount.status = function() {
      return {
        then: function(cb) {
          cb('foobarz')
        }
      }
    }

    return userAccount
  }
)

.factory('mock_authUrl', [
  function() {
    return 'https://accounts.google.com/o/oauth2/auth'
  }
])

.factory('mock_googleAnalytics', [
  '$q',
  function($q) {
    var googleAnalytics = {}

    googleAnalytics.getReport = function(id, startDate, endDate, metrics) {
      var deferred
        , $timeout
        , that = this

      inject(function(_$timeout_, $q) {
        deferred = $q.defer()
        $timeout = _$timeout_

        $timeout(function() {
          switch(id) {
            case 'ga:11537011': // DET
              switch(startDate) {
                case '2013-09-24':
                  deferred.resolve({"kind": "analytics#gaData","id": "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:11537011&metrics=ga:visitors,ga:pageviews,ga:pageviewsPerVisit,ga:avgTimeOnSite,ga:visitBounceRate,ga:percentNewVisits,ga:avgPageLoadTime&start-date=2013-09-24&end-date=2013-09-24","query": {"start-date": "2013-09-24","end-date": "2013-09-24","ids": "ga:11537011","metrics": ["ga:visitors", "ga:pageviews", "ga:pageviewsPerVisit", "ga:avgTimeOnSite", "ga:visitBounceRate", "ga:percentNewVisits", "ga:avgPageLoadTime"],"start-index": 1,"max-results": 1000},"itemsPerPage": 1000,"totalResults": 1,"selfLink": "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:11537011&metrics=ga:visitors,ga:pageviews,ga:pageviewsPerVisit,ga:avgTimeOnSite,ga:visitBounceRate,ga:percentNewVisits,ga:avgPageLoadTime&start-date=2013-09-24&end-date=2013-09-24","profileInfo": {"profileId": "11537011","accountId": "5715214","webPropertyId": "UA-5715214-1","internalWebPropertyId": "11036598","profileName": "DET", "tableId": "ga:11537011"},"containsSampledData": false,"columnHeaders": [{"name": "ga:visitors", "columnType": "METRIC", "dataType": "INTEGER"},{"name": "ga:pageviews", "columnType": "METRIC", "dataType": "INTEGER"},{"name": "ga:pageviewsPerVisit", "columnType": "METRIC", "dataType": "FLOAT"},{"name": "ga:avgTimeOnSite", "columnType": "METRIC", "dataType": "TIME"},{"name": "ga:visitBounceRate", "columnType": "METRIC", "dataType": "PERCENT"},{"name": "ga:percentNewVisits", "columnType": "METRIC", "dataType": "PERCENT"},{"name": "ga:avgPageLoadTime", "columnType": "METRIC", "dataType": "FLOAT"}],"totalsForAllResults": {"ga:visitors": "2563","ga:pageviews": "5159","ga:pageviewsPerVisit": "1.8101754385964912","ga:avgTimeOnSite": "638.3045614035087","ga:visitBounceRate": "51.26315789473684","ga:percentNewVisits": "69.71929824561404","ga:avgPageLoadTime": "33.430519999999994"},"rows": [["2563", "5159", "1.8101754385964912", "638.3045614035087", "51.26315789473684", "69.71929824561404", "33.430519999999994"]]})
                  break
                case '2013-09-17':
                  deferred.resolve({"kind": "analytics#gaData","id": "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:11537011&metrics=ga:visitors,ga:pageviews,ga:pageviewsPerVisit,ga:avgTimeOnSite,ga:visitBounceRate,ga:percentNewVisits,ga:avgPageLoadTime&start-date=2013-09-17&end-date=2013-09-17","query": {"start-date": "2013-09-17","end-date": "2013-09-17","ids": "ga:11537011","metrics": ["ga:visitors", "ga:pageviews", "ga:pageviewsPerVisit", "ga:avgTimeOnSite", "ga:visitBounceRate", "ga:percentNewVisits", "ga:avgPageLoadTime"],"start-index": 1,"max-results": 1000}, "itemsPerPage": 1000,"totalResults": 1,"selfLink": "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:11537011&metrics=ga:visitors,ga:pageviews,ga:pageviewsPerVisit,ga:avgTimeOnSite,ga:visitBounceRate,ga:percentNewVisits,ga:avgPageLoadTime&start-date=2013-09-17&end-date=2013-09-17","profileInfo": {"profileId": "11537011","accountId": "5715214","webPropertyId": "UA-5715214-1","internalWebPropertyId": "11036598","profileName": "DET","tableId": "ga:11537011"},"containsSampledData": false,"columnHeaders": [{"name": "ga:visitors", "columnType": "METRIC", "dataType": "INTEGER"},{"name": "ga:pageviews", "columnType": "METRIC", "dataType": "INTEGER"},{"name": "ga:pageviewsPerVisit", "columnType": "METRIC", "dataType": "FLOAT"},{"name": "ga:avgTimeOnSite", "columnType": "METRIC", "dataType": "TIME"},{"name": "ga:visitBounceRate", "columnType": "METRIC", "dataType": "PERCENT"},{"name": "ga:percentNewVisits", "columnType": "METRIC", "dataType": "PERCENT"},{"name": "ga:avgPageLoadTime", "columnType": "METRIC", "dataType": "FLOAT"}],"totalsForAllResults": {"ga:visitors": "2435","ga:pageviews": "4941","ga:pageviewsPerVisit": "1.81721221037146","ga:avgTimeOnSite": "653.6035307098198","ga:visitBounceRate": "50.82751011401251","ga:percentNewVisits": "68.33394630378817","ga:avgPageLoadTime": "16.792128205128208"},"rows": [["2435", "4941", "1.81721221037146", "653.6035307098198", "50.82751011401251", "68.33394630378817", "16.792128205128208"]]})
                  break
                case '2013-09-25':
                  deferred.resolve({"kind": "analytics#gaData", "id": "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:11537011&metrics=ga:…centNewVisits,ga:avgPageLoadTime&start-date=2013-09-25&end-date=2013-09-25", "query": {"start-date": "2013-09-25", "end-date": "2013-09-25", "ids": "ga:11537011", "metrics": ["ga:visitors", "ga:pageviews", "ga:pageviewsPerVisit", "ga:avgTimeOnSite", "ga:visitBounceRate", "ga:percentNewVisits", "ga:avgPageLoadTime"], "start-index": 1, "max-results": 1000}, "itemsPerPage": 1000, "totalResults": 1, "selfLink": "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:11537011&metrics=ga:…centNewVisits,ga:avgPageLoadTime&start-date=2013-09-25&end-date=2013-09-25", "profileInfo": {"profileId": "11537011", "accountId": "5715214", "webPropertyId": "UA-5715214-1", "internalWebPropertyId": "11036598", "profileName": "DET", "tableId": "ga:11537011"}, "containsSampledData": false, "columnHeaders": [{"name": "ga:visitors", "columnType": "METRIC", "dataType": "INTEGER"},{"name": "ga:pageviews", "columnType": "METRIC", "dataType": "INTEGER"},{"name": "ga:pageviewsPerVisit", "columnType": "METRIC", "dataType": "FLOAT"},{"name": "ga:avgTimeOnSite", "columnType": "METRIC", "dataType": "TIME"},{"name": "ga:visitBounceRate", "columnType": "METRIC", "dataType": "PERCENT"},{"name": "ga:percentNewVisits", "columnType": "METRIC", "dataType": "PERCENT"},{"name": "ga:avgPageLoadTime", "columnType": "METRIC", "dataType": "FLOAT"}], "totalsForAllResults": {"ga:visitors": "2440", "ga:pageviews": "5016", "ga:pageviewsPerVisit": "1.8420859346309217", "ga:avgTimeOnSite": "618.4950422328315", "ga:visitBounceRate": "51.009915534337125", "ga:percentNewVisits": "67.79287550495778", "ga:avgPageLoadTime": "10.687555555555555"}, "rows": [["2440", "5016", "1.8420859346309217", "618.4950422328315", "51.009915534337125", "67.79287550495778", "10.687555555555555"]]})
                  break
                default:
                  deferred.resolve('No data for the given startDate')
              }
              break
            case 'ga:13623581': // msafi.com
              switch(startDate) {
                case '2013-09-24':
                  deferred.resolve({"kind": "analytics#gaData","id": "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:13623581&metrics=ga:visitors,ga:pageviews,ga:pageviewsPerVisit,ga:avgTimeOnSite,ga:visitBounceRate,ga:percentNewVisits,ga:avgPageLoadTime&start-date=2013-09-24&end-date=2013-09-24","query": {"start-date": "2013-09-24","end-date": "2013-09-24","ids": "ga:13623581","metrics": ["ga:visitors", "ga:pageviews", "ga:pageviewsPerVisit", "ga:avgTimeOnSite", "ga:visitBounceRate", "ga:percentNewVisits", "ga:avgPageLoadTime"],"start-index": 1,"max-results": 1000},"itemsPerPage": 1000,"totalResults": 1,"selfLink": "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:13623581&metrics=ga:visitors,ga:pageviews,ga:pageviewsPerVisit,ga:avgTimeOnSite,ga:visitBounceRate,ga:percentNewVisits,ga:avgPageLoadTime&start-date=2013-09-24&end-date=2013-09-24","profileInfo": {"profileId": "13623581","accountId": "5715214","webPropertyId": "UA-5715214-1","internalWebPropertyId": "11036598","profileName": "DET", "tableId": "ga:13623581"},"containsSampledData": false,"columnHeaders": [{"name": "ga:visitors", "columnType": "METRIC", "dataType": "INTEGER"},{"name": "ga:pageviews", "columnType": "METRIC", "dataType": "INTEGER"},{"name": "ga:pageviewsPerVisit", "columnType": "METRIC", "dataType": "FLOAT"},{"name": "ga:avgTimeOnSite", "columnType": "METRIC", "dataType": "TIME"},{"name": "ga:visitBounceRate", "columnType": "METRIC", "dataType": "PERCENT"},{"name": "ga:percentNewVisits", "columnType": "METRIC", "dataType": "PERCENT"},{"name": "ga:avgPageLoadTime", "columnType": "METRIC", "dataType": "FLOAT"}],"totalsForAllResults": {"ga:visitors": "2563","ga:pageviews": "5159","ga:pageviewsPerVisit": "1.8101754385964912","ga:avgTimeOnSite": "638.3045614035087","ga:visitBounceRate": "51.26315789473684","ga:percentNewVisits": "69.71929824561404","ga:avgPageLoadTime": "33.430519999999994"},"rows": [["2563", "5159", "1.8101754385964912", "638.3045614035087", "51.26315789473684", "69.71929824561404", "33.430519999999994"]]})
                  break
                case '2013-09-17':
                  deferred.resolve({"kind": "analytics#gaData","id": "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:13623581&metrics=ga:visitors,ga:pageviews,ga:pageviewsPerVisit,ga:avgTimeOnSite,ga:visitBounceRate,ga:percentNewVisits,ga:avgPageLoadTime&start-date=2013-09-17&end-date=2013-09-17","query": {"start-date": "2013-09-17","end-date": "2013-09-17","ids": "ga:13623581","metrics": ["ga:visitors", "ga:pageviews", "ga:pageviewsPerVisit", "ga:avgTimeOnSite", "ga:visitBounceRate", "ga:percentNewVisits", "ga:avgPageLoadTime"],"start-index": 1,"max-results": 1000}, "itemsPerPage": 1000,"totalResults": 1,"selfLink": "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:13623581&metrics=ga:visitors,ga:pageviews,ga:pageviewsPerVisit,ga:avgTimeOnSite,ga:visitBounceRate,ga:percentNewVisits,ga:avgPageLoadTime&start-date=2013-09-17&end-date=2013-09-17","profileInfo": {"profileId": "13623581","accountId": "5715214","webPropertyId": "UA-5715214-1","internalWebPropertyId": "11036598","profileName": "DET","tableId": "ga:13623581"},"containsSampledData": false,"columnHeaders": [{"name": "ga:visitors", "columnType": "METRIC", "dataType": "INTEGER"},{"name": "ga:pageviews", "columnType": "METRIC", "dataType": "INTEGER"},{"name": "ga:pageviewsPerVisit", "columnType": "METRIC", "dataType": "FLOAT"},{"name": "ga:avgTimeOnSite", "columnType": "METRIC", "dataType": "TIME"},{"name": "ga:visitBounceRate", "columnType": "METRIC", "dataType": "PERCENT"},{"name": "ga:percentNewVisits", "columnType": "METRIC", "dataType": "PERCENT"},{"name": "ga:avgPageLoadTime", "columnType": "METRIC", "dataType": "FLOAT"}],"totalsForAllResults": {"ga:visitors": "2435","ga:pageviews": "4941","ga:pageviewsPerVisit": "1.81721221037146","ga:avgTimeOnSite": "653.6035307098198","ga:visitBounceRate": "50.82751011401251","ga:percentNewVisits": "68.33394630378817","ga:avgPageLoadTime": "16.792128205128208"},"rows": [["2435", "4941", "1.81721221037146", "653.6035307098198", "50.82751011401251", "68.33394630378817", "16.792128205128208"]]})
                  break
                case '2013-09-25':
                  deferred.resolve({"kind": "analytics#gaData", "id": "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:13623581&metrics=ga:…centNewVisits,ga:avgPageLoadTime&start-date=2013-09-25&end-date=2013-09-25", "query": {"start-date": "2013-09-25", "end-date": "2013-09-25", "ids": "ga:13623581", "metrics": ["ga:visitors", "ga:pageviews", "ga:pageviewsPerVisit", "ga:avgTimeOnSite", "ga:visitBounceRate", "ga:percentNewVisits", "ga:avgPageLoadTime"], "start-index": 1, "max-results": 1000}, "itemsPerPage": 1000, "totalResults": 1, "selfLink": "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:13623581&metrics=ga:…centNewVisits,ga:avgPageLoadTime&start-date=2013-09-25&end-date=2013-09-25", "profileInfo": {"profileId": "13623581", "accountId": "5715214", "webPropertyId": "UA-5715214-1", "internalWebPropertyId": "11036598", "profileName": "DET", "tableId": "ga:13623581"}, "containsSampledData": false, "columnHeaders": [{"name": "ga:visitors", "columnType": "METRIC", "dataType": "INTEGER"},{"name": "ga:pageviews", "columnType": "METRIC", "dataType": "INTEGER"},{"name": "ga:pageviewsPerVisit", "columnType": "METRIC", "dataType": "FLOAT"},{"name": "ga:avgTimeOnSite", "columnType": "METRIC", "dataType": "TIME"},{"name": "ga:visitBounceRate", "columnType": "METRIC", "dataType": "PERCENT"},{"name": "ga:percentNewVisits", "columnType": "METRIC", "dataType": "PERCENT"},{"name": "ga:avgPageLoadTime", "columnType": "METRIC", "dataType": "FLOAT"}], "totalsForAllResults": {"ga:visitors": "2440", "ga:pageviews": "5016", "ga:pageviewsPerVisit": "1.8420859346309217", "ga:avgTimeOnSite": "618.4950422328315", "ga:visitBounceRate": "51.009915534337125", "ga:percentNewVisits": "67.79287550495778", "ga:avgPageLoadTime": "10.687555555555555"}, "rows": [["2440", "5016", "1.8420859346309217", "618.4950422328315", "51.009915534337125", "67.79287550495778", "10.687555555555555"]]})
                  break
                default:
                  deferred.resolve('No data for the given startDate')
              }
              break
            case 'ga:37307543': // WinkPress
              switch(startDate) {
                case '2013-09-24':
                  deferred.resolve({"kind": "analytics#gaData","id": "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:37307543&metrics=ga:visitors,ga:pageviews,ga:pageviewsPerVisit,ga:avgTimeOnSite,ga:visitBounceRate,ga:percentNewVisits,ga:avgPageLoadTime&start-date=2013-09-24&end-date=2013-09-24","query": {"start-date": "2013-09-24","end-date": "2013-09-24","ids": "ga:37307543","metrics": ["ga:visitors", "ga:pageviews", "ga:pageviewsPerVisit", "ga:avgTimeOnSite", "ga:visitBounceRate", "ga:percentNewVisits", "ga:avgPageLoadTime"],"start-index": 1,"max-results": 1000},"itemsPerPage": 1000,"totalResults": 1,"selfLink": "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:37307543&metrics=ga:visitors,ga:pageviews,ga:pageviewsPerVisit,ga:avgTimeOnSite,ga:visitBounceRate,ga:percentNewVisits,ga:avgPageLoadTime&start-date=2013-09-24&end-date=2013-09-24","profileInfo": {"profileId": "37307543","accountId": "5715214","webPropertyId": "UA-5715214-1","internalWebPropertyId": "11036598","profileName": "DET", "tableId": "ga:37307543"},"containsSampledData": false,"columnHeaders": [{"name": "ga:visitors", "columnType": "METRIC", "dataType": "INTEGER"},{"name": "ga:pageviews", "columnType": "METRIC", "dataType": "INTEGER"},{"name": "ga:pageviewsPerVisit", "columnType": "METRIC", "dataType": "FLOAT"},{"name": "ga:avgTimeOnSite", "columnType": "METRIC", "dataType": "TIME"},{"name": "ga:visitBounceRate", "columnType": "METRIC", "dataType": "PERCENT"},{"name": "ga:percentNewVisits", "columnType": "METRIC", "dataType": "PERCENT"},{"name": "ga:avgPageLoadTime", "columnType": "METRIC", "dataType": "FLOAT"}],"totalsForAllResults": {"ga:visitors": "2563","ga:pageviews": "5159","ga:pageviewsPerVisit": "1.8101754385964912","ga:avgTimeOnSite": "638.3045614035087","ga:visitBounceRate": "51.26315789473684","ga:percentNewVisits": "69.71929824561404","ga:avgPageLoadTime": "33.430519999999994"},"rows": [["2563", "5159", "1.8101754385964912", "638.3045614035087", "51.26315789473684", "69.71929824561404", "33.430519999999994"]]})
                  break
                case '2013-09-17':
                  deferred.resolve({"kind": "analytics#gaData","id": "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:37307543&metrics=ga:visitors,ga:pageviews,ga:pageviewsPerVisit,ga:avgTimeOnSite,ga:visitBounceRate,ga:percentNewVisits,ga:avgPageLoadTime&start-date=2013-09-17&end-date=2013-09-17","query": {"start-date": "2013-09-17","end-date": "2013-09-17","ids": "ga:37307543","metrics": ["ga:visitors", "ga:pageviews", "ga:pageviewsPerVisit", "ga:avgTimeOnSite", "ga:visitBounceRate", "ga:percentNewVisits", "ga:avgPageLoadTime"],"start-index": 1,"max-results": 1000}, "itemsPerPage": 1000,"totalResults": 1,"selfLink": "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:37307543&metrics=ga:visitors,ga:pageviews,ga:pageviewsPerVisit,ga:avgTimeOnSite,ga:visitBounceRate,ga:percentNewVisits,ga:avgPageLoadTime&start-date=2013-09-17&end-date=2013-09-17","profileInfo": {"profileId": "37307543","accountId": "5715214","webPropertyId": "UA-5715214-1","internalWebPropertyId": "11036598","profileName": "DET","tableId": "ga:37307543"},"containsSampledData": false,"columnHeaders": [{"name": "ga:visitors", "columnType": "METRIC", "dataType": "INTEGER"},{"name": "ga:pageviews", "columnType": "METRIC", "dataType": "INTEGER"},{"name": "ga:pageviewsPerVisit", "columnType": "METRIC", "dataType": "FLOAT"},{"name": "ga:avgTimeOnSite", "columnType": "METRIC", "dataType": "TIME"},{"name": "ga:visitBounceRate", "columnType": "METRIC", "dataType": "PERCENT"},{"name": "ga:percentNewVisits", "columnType": "METRIC", "dataType": "PERCENT"},{"name": "ga:avgPageLoadTime", "columnType": "METRIC", "dataType": "FLOAT"}],"totalsForAllResults": {"ga:visitors": "2435","ga:pageviews": "4941","ga:pageviewsPerVisit": "1.81721221037146","ga:avgTimeOnSite": "653.6035307098198","ga:visitBounceRate": "50.82751011401251","ga:percentNewVisits": "68.33394630378817","ga:avgPageLoadTime": "16.792128205128208"},"rows": [["2435", "4941", "1.81721221037146", "653.6035307098198", "50.82751011401251", "68.33394630378817", "16.792128205128208"]]})
                  break
                case '2013-09-25':
                  deferred.resolve({"kind": "analytics#gaData", "id": "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:37307543&metrics=ga:…centNewVisits,ga:avgPageLoadTime&start-date=2013-09-25&end-date=2013-09-25", "query": {"start-date": "2013-09-25", "end-date": "2013-09-25", "ids": "ga:37307543", "metrics": ["ga:visitors", "ga:pageviews", "ga:pageviewsPerVisit", "ga:avgTimeOnSite", "ga:visitBounceRate", "ga:percentNewVisits", "ga:avgPageLoadTime"], "start-index": 1, "max-results": 1000}, "itemsPerPage": 1000, "totalResults": 1, "selfLink": "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:37307543&metrics=ga:…centNewVisits,ga:avgPageLoadTime&start-date=2013-09-25&end-date=2013-09-25", "profileInfo": {"profileId": "37307543", "accountId": "5715214", "webPropertyId": "UA-5715214-1", "internalWebPropertyId": "11036598", "profileName": "DET", "tableId": "ga:37307543"}, "containsSampledData": false, "columnHeaders": [{"name": "ga:visitors", "columnType": "METRIC", "dataType": "INTEGER"},{"name": "ga:pageviews", "columnType": "METRIC", "dataType": "INTEGER"},{"name": "ga:pageviewsPerVisit", "columnType": "METRIC", "dataType": "FLOAT"},{"name": "ga:avgTimeOnSite", "columnType": "METRIC", "dataType": "TIME"},{"name": "ga:visitBounceRate", "columnType": "METRIC", "dataType": "PERCENT"},{"name": "ga:percentNewVisits", "columnType": "METRIC", "dataType": "PERCENT"},{"name": "ga:avgPageLoadTime", "columnType": "METRIC", "dataType": "FLOAT"}], "totalsForAllResults": {"ga:visitors": "2440", "ga:pageviews": "5016", "ga:pageviewsPerVisit": "1.8420859346309217", "ga:avgTimeOnSite": "618.4950422328315", "ga:visitBounceRate": "51.009915534337125", "ga:percentNewVisits": "67.79287550495778", "ga:avgPageLoadTime": "10.687555555555555"}, "rows": [["2440", "5016", "1.8420859346309217", "618.4950422328315", "51.009915534337125", "67.79287550495778", "10.687555555555555"]]})
                  break
                default:
                  deferred.resolve('No data for the given startDate')
              }
              break
            case 'ga:55604500': // ksafi.com
              switch(startDate) {
                case '2013-09-24':
                  deferred.resolve({"kind": "analytics#gaData","id": "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:55604500&metrics=ga:visitors,ga:pageviews,ga:pageviewsPerVisit,ga:avgTimeOnSite,ga:visitBounceRate,ga:percentNewVisits,ga:avgPageLoadTime&start-date=2013-09-24&end-date=2013-09-24","query": {"start-date": "2013-09-24","end-date": "2013-09-24","ids": "ga:55604500","metrics": ["ga:visitors", "ga:pageviews", "ga:pageviewsPerVisit", "ga:avgTimeOnSite", "ga:visitBounceRate", "ga:percentNewVisits", "ga:avgPageLoadTime"],"start-index": 1,"max-results": 1000},"itemsPerPage": 1000,"totalResults": 1,"selfLink": "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:55604500&metrics=ga:visitors,ga:pageviews,ga:pageviewsPerVisit,ga:avgTimeOnSite,ga:visitBounceRate,ga:percentNewVisits,ga:avgPageLoadTime&start-date=2013-09-24&end-date=2013-09-24","profileInfo": {"profileId": "55604500","accountId": "5715214","webPropertyId": "UA-5715214-1","internalWebPropertyId": "11036598","profileName": "DET", "tableId": "ga:55604500"},"containsSampledData": false,"columnHeaders": [{"name": "ga:visitors", "columnType": "METRIC", "dataType": "INTEGER"},{"name": "ga:pageviews", "columnType": "METRIC", "dataType": "INTEGER"},{"name": "ga:pageviewsPerVisit", "columnType": "METRIC", "dataType": "FLOAT"},{"name": "ga:avgTimeOnSite", "columnType": "METRIC", "dataType": "TIME"},{"name": "ga:visitBounceRate", "columnType": "METRIC", "dataType": "PERCENT"},{"name": "ga:percentNewVisits", "columnType": "METRIC", "dataType": "PERCENT"},{"name": "ga:avgPageLoadTime", "columnType": "METRIC", "dataType": "FLOAT"}],"totalsForAllResults": {"ga:visitors": "2563","ga:pageviews": "5159","ga:pageviewsPerVisit": "1.8101754385964912","ga:avgTimeOnSite": "638.3045614035087","ga:visitBounceRate": "51.26315789473684","ga:percentNewVisits": "69.71929824561404","ga:avgPageLoadTime": "33.430519999999994"},"rows": [["2563", "5159", "1.8101754385964912", "638.3045614035087", "51.26315789473684", "69.71929824561404", "33.430519999999994"]]})
                  break
                case '2013-09-17':
                  deferred.resolve({"kind": "analytics#gaData","id": "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:55604500&metrics=ga:visitors,ga:pageviews,ga:pageviewsPerVisit,ga:avgTimeOnSite,ga:visitBounceRate,ga:percentNewVisits,ga:avgPageLoadTime&start-date=2013-09-17&end-date=2013-09-17","query": {"start-date": "2013-09-17","end-date": "2013-09-17","ids": "ga:55604500","metrics": ["ga:visitors", "ga:pageviews", "ga:pageviewsPerVisit", "ga:avgTimeOnSite", "ga:visitBounceRate", "ga:percentNewVisits", "ga:avgPageLoadTime"],"start-index": 1,"max-results": 1000}, "itemsPerPage": 1000,"totalResults": 1,"selfLink": "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:55604500&metrics=ga:visitors,ga:pageviews,ga:pageviewsPerVisit,ga:avgTimeOnSite,ga:visitBounceRate,ga:percentNewVisits,ga:avgPageLoadTime&start-date=2013-09-17&end-date=2013-09-17","profileInfo": {"profileId": "55604500","accountId": "5715214","webPropertyId": "UA-5715214-1","internalWebPropertyId": "11036598","profileName": "DET","tableId": "ga:55604500"},"containsSampledData": false,"columnHeaders": [{"name": "ga:visitors", "columnType": "METRIC", "dataType": "INTEGER"},{"name": "ga:pageviews", "columnType": "METRIC", "dataType": "INTEGER"},{"name": "ga:pageviewsPerVisit", "columnType": "METRIC", "dataType": "FLOAT"},{"name": "ga:avgTimeOnSite", "columnType": "METRIC", "dataType": "TIME"},{"name": "ga:visitBounceRate", "columnType": "METRIC", "dataType": "PERCENT"},{"name": "ga:percentNewVisits", "columnType": "METRIC", "dataType": "PERCENT"},{"name": "ga:avgPageLoadTime", "columnType": "METRIC", "dataType": "FLOAT"}],"totalsForAllResults": {"ga:visitors": "2435","ga:pageviews": "4941","ga:pageviewsPerVisit": "1.81721221037146","ga:avgTimeOnSite": "653.6035307098198","ga:visitBounceRate": "50.82751011401251","ga:percentNewVisits": "68.33394630378817","ga:avgPageLoadTime": "16.792128205128208"},"rows": [["2435", "4941", "1.81721221037146", "653.6035307098198", "50.82751011401251", "68.33394630378817", "16.792128205128208"]]})
                  break
                case '2013-09-25':
                  deferred.resolve({"kind": "analytics#gaData", "id": "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:55604500&metrics=ga:…centNewVisits,ga:avgPageLoadTime&start-date=2013-09-25&end-date=2013-09-25", "query": {"start-date": "2013-09-25", "end-date": "2013-09-25", "ids": "ga:55604500", "metrics": ["ga:visitors", "ga:pageviews", "ga:pageviewsPerVisit", "ga:avgTimeOnSite", "ga:visitBounceRate", "ga:percentNewVisits", "ga:avgPageLoadTime"], "start-index": 1, "max-results": 1000}, "itemsPerPage": 1000, "totalResults": 1, "selfLink": "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:55604500&metrics=ga:…centNewVisits,ga:avgPageLoadTime&start-date=2013-09-25&end-date=2013-09-25", "profileInfo": {"profileId": "55604500", "accountId": "5715214", "webPropertyId": "UA-5715214-1", "internalWebPropertyId": "11036598", "profileName": "DET", "tableId": "ga:55604500"}, "containsSampledData": false, "columnHeaders": [{"name": "ga:visitors", "columnType": "METRIC", "dataType": "INTEGER"},{"name": "ga:pageviews", "columnType": "METRIC", "dataType": "INTEGER"},{"name": "ga:pageviewsPerVisit", "columnType": "METRIC", "dataType": "FLOAT"},{"name": "ga:avgTimeOnSite", "columnType": "METRIC", "dataType": "TIME"},{"name": "ga:visitBounceRate", "columnType": "METRIC", "dataType": "PERCENT"},{"name": "ga:percentNewVisits", "columnType": "METRIC", "dataType": "PERCENT"},{"name": "ga:avgPageLoadTime", "columnType": "METRIC", "dataType": "FLOAT"}], "totalsForAllResults": {"ga:visitors": "2440", "ga:pageviews": "5016", "ga:pageviewsPerVisit": "1.8420859346309217", "ga:avgTimeOnSite": "618.4950422328315", "ga:visitBounceRate": "51.009915534337125", "ga:percentNewVisits": "67.79287550495778", "ga:avgPageLoadTime": "10.687555555555555"}, "rows": [["2440", "5016", "1.8420859346309217", "618.4950422328315", "51.009915534337125", "67.79287550495778", "10.687555555555555"]]})
                  break
                default:
                  deferred.resolve('No data for the given startDate')
              }
              break
            case 'ga:56394045': // Hollowverse
              switch(startDate) {
                case '2013-09-24':
                  deferred.resolve({"kind": "analytics#gaData","id": "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:56394045&metrics=ga:visitors,ga:pageviews,ga:pageviewsPerVisit,ga:avgTimeOnSite,ga:visitBounceRate,ga:percentNewVisits,ga:avgPageLoadTime&start-date=2013-09-24&end-date=2013-09-24","query": {"start-date": "2013-09-24","end-date": "2013-09-24","ids": "ga:56394045","metrics": ["ga:visitors", "ga:pageviews", "ga:pageviewsPerVisit", "ga:avgTimeOnSite", "ga:visitBounceRate", "ga:percentNewVisits", "ga:avgPageLoadTime"],"start-index": 1,"max-results": 1000},"itemsPerPage": 1000,"totalResults": 1,"selfLink": "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:56394045&metrics=ga:visitors,ga:pageviews,ga:pageviewsPerVisit,ga:avgTimeOnSite,ga:visitBounceRate,ga:percentNewVisits,ga:avgPageLoadTime&start-date=2013-09-24&end-date=2013-09-24","profileInfo": {"profileId": "56394045","accountId": "5715214","webPropertyId": "UA-5715214-1","internalWebPropertyId": "11036598","profileName": "DET", "tableId": "ga:56394045"},"containsSampledData": false,"columnHeaders": [{"name": "ga:visitors", "columnType": "METRIC", "dataType": "INTEGER"},{"name": "ga:pageviews", "columnType": "METRIC", "dataType": "INTEGER"},{"name": "ga:pageviewsPerVisit", "columnType": "METRIC", "dataType": "FLOAT"},{"name": "ga:avgTimeOnSite", "columnType": "METRIC", "dataType": "TIME"},{"name": "ga:visitBounceRate", "columnType": "METRIC", "dataType": "PERCENT"},{"name": "ga:percentNewVisits", "columnType": "METRIC", "dataType": "PERCENT"},{"name": "ga:avgPageLoadTime", "columnType": "METRIC", "dataType": "FLOAT"}],"totalsForAllResults": {"ga:visitors": "2563","ga:pageviews": "5159","ga:pageviewsPerVisit": "1.8101754385964912","ga:avgTimeOnSite": "638.3045614035087","ga:visitBounceRate": "51.26315789473684","ga:percentNewVisits": "69.71929824561404","ga:avgPageLoadTime": "33.430519999999994"},"rows": [["2563", "5159", "1.8101754385964912", "638.3045614035087", "51.26315789473684", "69.71929824561404", "33.430519999999994"]]})
                  break
                case '2013-09-17':
                  deferred.resolve({"kind": "analytics#gaData","id": "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:56394045&metrics=ga:visitors,ga:pageviews,ga:pageviewsPerVisit,ga:avgTimeOnSite,ga:visitBounceRate,ga:percentNewVisits,ga:avgPageLoadTime&start-date=2013-09-17&end-date=2013-09-17","query": {"start-date": "2013-09-17","end-date": "2013-09-17","ids": "ga:56394045","metrics": ["ga:visitors", "ga:pageviews", "ga:pageviewsPerVisit", "ga:avgTimeOnSite", "ga:visitBounceRate", "ga:percentNewVisits", "ga:avgPageLoadTime"],"start-index": 1,"max-results": 1000}, "itemsPerPage": 1000,"totalResults": 1,"selfLink": "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:56394045&metrics=ga:visitors,ga:pageviews,ga:pageviewsPerVisit,ga:avgTimeOnSite,ga:visitBounceRate,ga:percentNewVisits,ga:avgPageLoadTime&start-date=2013-09-17&end-date=2013-09-17","profileInfo": {"profileId": "56394045","accountId": "5715214","webPropertyId": "UA-5715214-1","internalWebPropertyId": "11036598","profileName": "DET","tableId": "ga:56394045"},"containsSampledData": false,"columnHeaders": [{"name": "ga:visitors", "columnType": "METRIC", "dataType": "INTEGER"},{"name": "ga:pageviews", "columnType": "METRIC", "dataType": "INTEGER"},{"name": "ga:pageviewsPerVisit", "columnType": "METRIC", "dataType": "FLOAT"},{"name": "ga:avgTimeOnSite", "columnType": "METRIC", "dataType": "TIME"},{"name": "ga:visitBounceRate", "columnType": "METRIC", "dataType": "PERCENT"},{"name": "ga:percentNewVisits", "columnType": "METRIC", "dataType": "PERCENT"},{"name": "ga:avgPageLoadTime", "columnType": "METRIC", "dataType": "FLOAT"}],"totalsForAllResults": {"ga:visitors": "2435","ga:pageviews": "4941","ga:pageviewsPerVisit": "1.81721221037146","ga:avgTimeOnSite": "653.6035307098198","ga:visitBounceRate": "50.82751011401251","ga:percentNewVisits": "68.33394630378817","ga:avgPageLoadTime": "16.792128205128208"},"rows": [["2435", "4941", "1.81721221037146", "653.6035307098198", "50.82751011401251", "68.33394630378817", "16.792128205128208"]]})
                  break
                case '2013-09-25':
                  deferred.resolve({"kind": "analytics#gaData", "id": "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:56394045&metrics=ga:…centNewVisits,ga:avgPageLoadTime&start-date=2013-09-25&end-date=2013-09-25", "query": {"start-date": "2013-09-25", "end-date": "2013-09-25", "ids": "ga:56394045", "metrics": ["ga:visitors", "ga:pageviews", "ga:pageviewsPerVisit", "ga:avgTimeOnSite", "ga:visitBounceRate", "ga:percentNewVisits", "ga:avgPageLoadTime"], "start-index": 1, "max-results": 1000}, "itemsPerPage": 1000, "totalResults": 1, "selfLink": "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:56394045&metrics=ga:…centNewVisits,ga:avgPageLoadTime&start-date=2013-09-25&end-date=2013-09-25", "profileInfo": {"profileId": "56394045", "accountId": "5715214", "webPropertyId": "UA-5715214-1", "internalWebPropertyId": "11036598", "profileName": "DET", "tableId": "ga:56394045"}, "containsSampledData": false, "columnHeaders": [{"name": "ga:visitors", "columnType": "METRIC", "dataType": "INTEGER"},{"name": "ga:pageviews", "columnType": "METRIC", "dataType": "INTEGER"},{"name": "ga:pageviewsPerVisit", "columnType": "METRIC", "dataType": "FLOAT"},{"name": "ga:avgTimeOnSite", "columnType": "METRIC", "dataType": "TIME"},{"name": "ga:visitBounceRate", "columnType": "METRIC", "dataType": "PERCENT"},{"name": "ga:percentNewVisits", "columnType": "METRIC", "dataType": "PERCENT"},{"name": "ga:avgPageLoadTime", "columnType": "METRIC", "dataType": "FLOAT"}], "totalsForAllResults": {"ga:visitors": "2440", "ga:pageviews": "5016", "ga:pageviewsPerVisit": "1.8420859346309217", "ga:avgTimeOnSite": "618.4950422328315", "ga:visitBounceRate": "51.009915534337125", "ga:percentNewVisits": "67.79287550495778", "ga:avgPageLoadTime": "10.687555555555555"}, "rows": [["2440", "5016", "1.8420859346309217", "618.4950422328315", "51.009915534337125", "67.79287550495778", "10.687555555555555"]]})
                  break
                default:
                  deferred.resolve('No data for the given startDate')
              }
              break
            default:
              deferred.resolve('Given ID was not found')
          }
        }, 200)
      })

      setTimeout(function() {
        try { $timeout.flush.apply(that) } catch(err) {}
      }, 0)

      return deferred.promise
    }

    googleAnalytics.fetchViews = function() {
      var views = $q.defer()
      views.resolve([
        {"name": "DET", "id": "11537011"},
        {"name": "msafi.com", "id": "13623581"},
        {"name": "WinkPress", "id": "37307543"},
        {"name": "ksafi.com", "id": "55604500"},
        {"name": "The Hollowverse", "id": "56394045"}
      ])
      return views.promise
    }

    return googleAnalytics
  }
])

.factory('mock_periods', [
  function() {
    var periods = {}

    periods.dates = {
      today: { start: '2013-09-25', end: '2013-09-25' },
      yesterday: {start: '2013-09-24', end: '2013-09-24' }
    }

    periods.comparisonDates = {
      yesterday: {start: '2013-09-17', end: '2013-08-17' }
    }

    periods.ordered = ['Today', 'Yesterday']

    periods.totalPeriods = 2

    periods.forEach = function(arrProfileIds, callback) {
      var eachPeriod
      var dates = this.dates

      // iterate over each web property
      arrProfileIds.forEach(function(profileId) {
        // iterate over each period
        for (eachPeriod in dates) {
          callback(profileId, eachPeriod)
        }
      })
    }

    return periods
  }
])

