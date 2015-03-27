module.exports = function (grunt) {

  require('jit-grunt')(grunt, {
    coveralls: 'grunt-karma-coveralls'
  });
  require('time-grunt')(grunt);

  var config = {
    lib: 'lib',
    test: 'test'
  };

  var webpack = require('webpack');
  var pkg = grunt.file.readJSON('package.json');
  var banner = 'js-data-schema\n' +
    '@version ' + pkg.version + ' - Homepage <https://github.com/js-data/js-data-schema/>\n' +
    '@author Jason Dobry <jason.dobry@gmail.com>\n' +
    '@copyright (c) 2013-2015 Jason Dobry \n' +
    '@license MIT <https://github.com/js-data/js-data-schema/blob/master/LICENSE>\n' +
    '\n' +
    '@overview Define and validate rules, datatypes and schemata in Node and in the browser.';

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
          sourceMap: true,
          sourceMapName: 'dist/js-data-schema.min.map',
          banner: '/*!\n' +
          '* js-data-schema\n' +
          '* @version <%= pkg.version %> - Homepage <https://github.com/js-data/js-data-schema/>\n' +
          '* @author Jason Dobry <jason.dobry@gmail.com>\n' +
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
    webpack: {
      dist: {
        entry: './lib/index.js',
        output: {
          filename: './dist/js-data-schema.js',
          libraryTarget: 'umd',
          library: 'Schemator'
        },
        module: {
          loaders: [
            { test: /(lib)(.+)\.js$/, exclude: /node_modules/, loader: 'babel-loader?blacklist=useStrict' }
          ],
          preLoaders: [
            {
              test: /(lib)(.+)\.js$|(test)(.+)\.js$/, // include .js files
              exclude: /node_modules/, // exclude any and all files in the node_modules folder
              loader: "jshint-loader?failOnHint=true"
            }
          ]
        },
        plugins: [
          new webpack.BannerPlugin(banner)
        ]
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

  grunt.registerTask('test', [
    'build',
    'mochaTest',
    'karma:dist'
  ]);
  grunt.registerTask('build', [
    'clean',
    'webpack',
    'uglify'
  ]);
  grunt.registerTask('go', ['build', 'watch']);

  grunt.registerTask('default', ['build']);
};
