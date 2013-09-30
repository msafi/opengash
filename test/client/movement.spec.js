describe('movement directive', function() {
  var elm
    , scope

  beforeEach(function() {
    module('ogDirectives',
           'ogMetricsData')

    inject(function($injector) {
      var $rootScope = $injector.get('$rootScope')
        , $compile = $injector.get('$compile')

      elm = angular.element('<movement current="{{current}}" comparison="{{comparison}}" metric="{{metric}}"></movement>')

      scope = $rootScope
      $compile(elm)(scope)
      scope.$digest()
    })

    this.addMatchers({
      toHaveClass: function(cls) {
        this.message = function() {
          return "Expected '" + angular.mock.dump(this.actual) + "' to have class '" + cls + "'."
        }

        return this.actual.hasClass(cls)
      }
    })
  })

  it('should create a p element with `movement` CSS class', function() {
    var p = elm.find('p')
    expect(p).toHaveClass('movement')
  })

  it('should fill p element with the value of movement as a percentage', function() {
    scope.$apply(function() {
      scope.current = 100
      scope.comparison = 110
      scope.metric = 'ga:visitors'
    })

    var span = elm.find("p span")
    expect(span[0].innerText).toBe('-10%')
  })
})