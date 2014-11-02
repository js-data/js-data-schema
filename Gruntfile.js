'use strict';
module.exports = function (grunt) {

  require('jit-grunt')(grunt, {
    coveralls: 'grunt-karma-coveralls'
  });
  require('time-grunt')(grunt);

  var config = {
    lib: 'lib',
    test: 'test'
  };

  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    config: config,
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      pre: ['coverage', 'dist/']
    },
    watch: {
      files: [
        'lib/**/*.js',
        'test/**/*.js'
      ],
      tasks: ['build']
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        ignores: ['test/support/*.js']
      },
      src: [
        'Gruntfile.js',
        '<%= config.lib %>/{,*/}*.js'
      ],
      test: [
        '<%= config.test %>/{,*/}*.js'
      ]
    },

    uglify: {
      second: {
        options: {
          banner: '/**\n' +
            '* @author Jason Dobry <jason.dobry@gmail.com>\n' +
            '* @file js-data-schema.min.js\n' +
            '* @version <%= pkg.version %> - Homepage <https://github.com/js-data/js-data-schema/>\n' +
            '* @copyright (c) 2013-2014 Jason Dobry <https://github.io/js-data/js-data-schema>\n' +
            '* @license MIT <https://github.com/js-data/js-data-schema/blob/master/LICENSE>\n' +
            '*\n' +
            '* @overview Define and validate rules, datatypes and schemata in Node and in the browser.\n' +
            '*/\n'
        },
        files: {
          'dist/js-data-schema.min.js': ['dist/js-data-schema.js']
        }
      }
    },

    mochaTest: {
      dist: {
        options: {
          reporter: 'spec'
        },
        src: ['mocha.start.js', 'test/**/*.js']
      }
    },

    browserify: {
      dist: {
        options: {
          browserifyOptions: {
            standalone: 'Schemator'
          }
        },
        files: {
          'dist/js-data-schema.js': ['lib/index.js']
        }
      }
    },

    karma: {
      options: {
        configFile: './karma.conf.js'
      },
      dist: {},
      dev: {
        browsers: ['Chrome'],
        autoWatch: true,
        singleRun: false,
        reporters: ['spec'],
        preprocessors: {}
      }
    },
    coveralls: {
      options: {
        coverage_dir: 'coverage'
      }
    }
  });

  grunt.registerTask('banner', function () {
    var file = grunt.file.read('dist/js-data-schema.js');

    var banner = '/**\n' +
      '* @author Jason Dobry <jason.dobry@gmail.com>\n' +
      '* @file js-data-schema.js\n' +
      '* @version ' + pkg.version + ' - Homepage <http://www.js-data.io/docs/js-data-schema>\n' +
      '* @copyright (c) 2014 Jason Dobry \n' +
      '* @license MIT <https://github.com/js-data/js-data-schema/blob/master/LICENSE>\n' +
      '*\n' +
      '* @overview Define and validate rules, datatypes and schemata in Node and in the browser.\n' +
      '*/\n';

    file = banner + file;

    grunt.file.write('dist/js-data-schema.js', file);
  });

  grunt.registerTask('test', [
    'build',
    'jshint:test',
    'mochaTest',
    'karma:dist'
  ]);
  grunt.registerTask('build', [
    'clean',
    'jshint:src',
    'browserify',
    'banner',
    'uglify'
  ]);
  grunt.registerTask('go', ['build', 'watch']);

  grunt.registerTask('default', ['build']);
};
