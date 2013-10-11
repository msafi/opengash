// Helps other scripts know that they were run by this Gruntfile, like reqBase.js in tests.
process.env.GRUNTFILE = true

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        sourceMap: 'build/client/js/opengash.min.js.map',
        sourceMapRoot: 'http://opengash.com/js/',
        sourceMappingURL: 'http://opengash.com/js/opengash.min.js.map',
        compress: {
          screw_ie8:true,sequences:true,properties:true,dead_code:true,drop_debugger:true,unsafe:true,conditionals:true,
          comparisons:true,evaluate:true,booleans:true,loops:true,unused:true,if_return:true,join_vars:true,
          cascade:true,negate_iife:true
        },
        mangle: {
          screw_ie8: true
        }
      },
      ogprod: {
        files: {
          'build/client/js/opengash.min.js': [
            'build/client/js/services.js',
            'build/client/js/controllers.js',
            'build/client/js/directives.js',
            'build/client/js/metrics.js',
            'build/client/js/app.js'
          ]
        }
      }
    },
    copy: {
      main: {
        expand: true,
        cwd: 'source/',
        src: ['**'],
        dest: 'build/'
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'build/client/index.ejs': 'build/client/index.ejs',
          'build/client/dashboard.html': 'build/client/dashboard.html',
          'build/client/add-views.html': 'build/client/add-views.html',
          'build/client/connect.html': 'build/client/connect.html'
        }
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: 'build/client/css/',
        src: ['style.css'],
        dest: 'build/client/css/'
      }
    },
    karma: {
      unit: {
        configFile: 'test/client/karma-config-build.js',
        singleRun: true
      }
    },
    simplemocha: {
      all: { src: ['test/server/**/*.js'] }
    },
    clean: ['build/**']
  })

  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-htmlmin')
  grunt.loadNpmTasks('grunt-contrib-cssmin')
  grunt.loadNpmTasks('grunt-karma')
  grunt.loadNpmTasks('grunt-simple-mocha')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-install-dependencies')

  grunt.registerTask('default', ['install-dependencies', 'clean', 'copy', 'uglify', 'htmlmin', 'cssmin'])
  grunt.registerTask('withTests', ['install-dependencies', 'clean', 'copy', 'uglify', 'htmlmin', 'cssmin','simplemocha', 'karma'])
  grunt.registerTask('minimal', ['clean', 'uglify', 'htmlmin', 'cssmin'])
  grunt.registerTask('test', ['simplemocha', 'karma'])
};