module.exports = function (config) {
  config.set({
    basePath: './',
    frameworks: ['mocha', 'chai', 'sinon'],
    browsers: ['Firefox', 'PhantomJS', 'Chrome'],
    files: [
      'dist/js-data-schema.js',
      './karma.start.js',
      'test/**/*.js'
    ],
    captureTimeout: 60000,
    colors: true,
    logLevel: config.LOG_INFO,
    port: 9876,
    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-phantomjs-launcher',
      'karma-mocha',
      'karma-chai',
      'karma-sinon',
      'karma-coverage',
      'karma-spec-reporter'
    ],
    runnerPort: 9100,
    singleRun: true,
    autoWatch: false,
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/'
    },
    preprocessors: {
      'dist/js-data-schema.js': ['coverage']
    },
    reporters: ['progress', 'coverage']
  });
};
