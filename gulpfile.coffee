gulp = require 'gulp'
$ = require('gulp-load-plugins') lazy: false
server = require('browser-sync').create()
reload = server.reload
extend = require('util')._extend
karma = require('karma').server
karmaConfig = require './karma.json'
pkg = require './package.json'
name = pkg.name

cleanCss = require 'less-plugin-clean-css'
cleanCss = new cleanCss advanced: true

paths =
  base: './'
  src: 'src'
  dist: 'dist'
  test: 'test'
  components: "components"

src =
  scripts: "#{paths.src}/coffee/#{name}.coffee"
  stylesheets:
    bootstrap2: "#{paths.src}/less/bootstrap2/build.less"
    bootstrap3: "#{paths.src}/less/bootstrap3/build.less"
  test: "#{paths.src}/coffee/#{name}.tests.coffee"

dest =
  scripts: "#{paths.dist}/js"
  stylesheets:
    bootstrap2: "#{paths.dist}/css/bootstrap2"
    bootstrap3: "#{paths.dist}/css/bootstrap3"
  test: paths.test

banner = """
  /* ========================================================================
   * <%= pkg.name %> - v<%= pkg.version %>
   * <%= pkg.homepage %>
   * ========================================================================
   * Copyright 2012-2015 <%= pkg.author.name %>
   *
   * Released under the MIT license
   * ========================================================================
   */


  """


# build
gulp.task 'coffee', ->
  gulp
  .src src.scripts
  .pipe $.plumber errorHandler: $.notify.onError "Error: <%= error.message %>"
  .pipe $.changed dest.scripts
  .pipe $.coffeelint 'coffeelint.json'
  .pipe $.coffeelint.reporter()
  .pipe $.coffeelint.reporter("fail")
  .pipe $.cjsx()
    .on 'error', $.util.log
  .pipe $.header banner, pkg: pkg
  .pipe gulp.dest dest.scripts
  .pipe gulp.dest dest.test
  .pipe $.uglify()
  .pipe $.header banner, pkg: pkg
  .pipe $.rename suffix: '.min'
  .pipe gulp.dest dest.scripts

gulp.task 'less-bootstrap2', ->
  gulp
  .src src.stylesheets.bootstrap2
  .pipe $.plumber errorHandler: $.notify.onError "Error: <%= error.message %>"
  .pipe $.changed dest.stylesheets.bootstrap2
  .pipe $.less()
    .on 'error', $.util.log
  .pipe $.header banner, pkg: pkg
  .pipe $.rename basename: name
  .pipe gulp.dest dest.stylesheets.bootstrap2
  .pipe $.less plugins: [cleanCss]
  .pipe $.header banner, pkg: pkg
  .pipe $.rename suffix: '.min'
  .pipe gulp.dest dest.stylesheets.bootstrap2

gulp.task 'less-bootstrap3', ->
  gulp
  .src src.stylesheets.bootstrap3
  .pipe $.plumber errorHandler: $.notify.onError "Error: <%= error.message %>"
  .pipe $.changed dest.stylesheets.bootstrap3
  .pipe $.less()
  .pipe $.header banner, pkg: pkg
  .pipe $.rename basename: name
  .pipe gulp.dest dest.stylesheets.bootstrap3
  .pipe $.less plugins: [cleanCss]
  .pipe $.header banner, pkg: pkg
  .pipe $.rename suffix: '.min'
  .pipe gulp.dest dest.stylesheets.bootstrap3

# test
gulp.task 'test-coffee', ['coffee'], ->
  gulp
  .src src.test
  .pipe $.plumber errorHandler: $.notify.onError "Error: <%= error.message %>"
  .pipe $.changed dest.test
  .pipe $.coffeelint 'coffeelint.json'
  .pipe $.coffeelint.reporter()
  .pipe $.coffeelint.reporter("fail")
  .pipe $.coffee()
    .on 'error', $.util.log
  .pipe gulp.dest dest.test

gulp.task 'test-go', ['test-coffee'], (done) ->
  karma.start extend(karmaConfig, singleRun: true), done

# extra
gulp.task 'watch', [], ->
  gulp.watch src.scripts, ['coffee']
  gulp.watch src.stylesheets.bootstrap2, ['less-bootstrap2']
  gulp.watch src.stylesheets.bootstrap3, ['less-bootstrap3']

  gulp.watch('package.json', ['dist']).on 'change', -> pkg = require './package.json'
  gulp.watch [
    "#{dest.scripts}/*.js"
    "#{dest.stylesheets.bootstrap2}/*.css"
    "#{dest.stylesheets.bootstrap3}/*.css"
    "*.html"
  ]
  .on 'change', reload

gulp.task 'less', ['less-bootstrap2', 'less-bootstrap3']
gulp.task 'dist', ['coffee', 'less']
gulp.task 'test', ['coffee', 'test-coffee', 'test-go']
gulp.task 'default', ['dist', 'watch']
