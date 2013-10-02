// Karma configuration
// Generated on Sun Sep 15 2013 18:40:22 GMT+0300 (Arab Standard Time)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',

    // frameworks to use
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      '../../build/client/js/vendor/jquery-2.0.3.min.js',
      '../../build/client/js/vendor/angular.js',
      '../../build/client/js/vendor/angular-cookies.js',
      '../../build/client/js/vendor/angular-ui-router.js',
      '../../build/client/js/vendor/angular-mocks.js',
      '../../build/client/js/opengash.min.js',
      './mocks.js',
      './*.js'
    ],


    // list of files to exclude
    exclude: [
    ],

    preprocessors: {
      '../../build/client/js!(vendor)/*.js': 'coverage'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['coverage', 'dots'],

    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/'
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false

  });
};
