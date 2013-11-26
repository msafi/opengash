// Helps other scripts know that they were run by this Gruntfile, like pathBase.js in tests.
process.env.GRUNTFILE = true

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        sourceMap: 'build/client/opengash.min.js.map',
        sourceMapRoot: 'http://opengash.com/',
        sourceMappingURL: 'http://opengash.com/opengash.min.js.map',
        compress: {
          screw_ie8:true,sequences:true,properties:true,dead_code:true,drop_debugger:true,unsafe:true,conditionals:true,
          comparisons:true,evaluate:true,booleans:true,loops:true,unused:true,if_return:true,join_vars:true,
          cascade:true,negate_iife:true
        },
        mangle: {
          screw_ie8: true
        }
      },
      files: {
        'build/client/opengash.min.js': [
          'build/client/**.{js}',
          '!build/client/vendor/**'
        ]
      }
    },
    copy: {
      main: {
        expand: true,
        cwd: 'source/',
        src: ['**'],
        dest: 'build/'
      },
      test: {
        src: 'test/client/karma-config-build-intact.js',
        dest: 'test/client/karma-config-build.js'
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        src: ['build/client/**.{js}', '!build/client/vendor/**']
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: 'build/client/',
        src: ['style.css'],
        dest: 'build/client/'
      }
    },
    karma: {
      build: {
        configFile: 'test/client/karma-config-build.js',
        singleRun: true
      },
      source: {
        configFile: 'test/client/karma-config-source.js',
        singleRun: true
      }
    },
    simplemocha: {
      all: { src: ['test/server/**/*.js'] }
    },
    clean: ['build/**'],
    watch: {
      scripts: {
        files: ['source/**/*'],
        tasks: ['minimal'],
        options: {
          spawn: false
        }
      }
    },
    rev: {
      options: {
        algorithm: 'md5',
        length: 8
      },
      assets: {
        files: [
          {
            src: [
              'build/client/**.{js,css,html,map}',
              '!build/client/vendor/**'
            ]
          }
        ]
      }
    },
    forcemin: {
      src: [
        'build/client/**.{js,css,html,ejs,map}',
        '!build/client/vendor/**',
        'test/client/karma-config-build.js'
      ]
    }
  })

  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-htmlmin')
  grunt.loadNpmTasks('grunt-contrib-cssmin')
  grunt.loadNpmTasks('grunt-karma')
  grunt.loadNpmTasks('grunt-simple-mocha')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-install-dependencies')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-rev')
  grunt.loadNpmTasks('grunt-forcemin')

  grunt.registerTask('default', ['install-dependencies', 'clean', 'copy', 'uglify', 'htmlmin', 'cssmin', 'rev', 'forcemin'])
  grunt.registerTask('withTests', ['install-dependencies', 'clean', 'copy', 'uglify', 'htmlmin', 'cssmin', 'rev', 'forcemin', 'simplemocha', 'karma:build'])
  grunt.registerTask('minimal', ['clean', 'copy', 'uglify', 'htmlmin', 'cssmin', 'rev', 'forcemin'])
  grunt.registerTask('test', ['simplemocha', 'karma:source'])
  grunt.registerTask('testClient', ['karma:source'])
  grunt.registerTask('testServer', ['simplemocha'])
}