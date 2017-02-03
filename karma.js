module.exports = function (config) {
  config.set({
    autoWatch: true,
    singleRun: false,
    frameworks: ['jasmine'],
    files: [
      'node_modules/jquery/dist/jquery.js',
      'node_modules/bootstrap/dist/js/bootstrap.js',
      'test/bootstrap-switch.js',
      'test/bootstrap-switch.tests.js'
    ],
    colors: true,
    browsers: ['PhantomJS'],
    reporters: ['progress'],
    plugins: ['karma-jasmine', 'karma-phantomjs-launcher']
  })
}
