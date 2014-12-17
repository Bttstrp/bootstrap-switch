gulp = require 'gulp'
$ = require('gulp-load-plugins') lazy: false
extend = require('util')._extend
karma = require('karma').server
karmaConfig = require './karma.json'
pkg = require './package.json'
name = pkg.name

cleanCss = require 'less-plugin-clean-css'
cleanCss = new cleanCss advanced: true

paths =
  src: 'src'
  dist: 'dist'
  test: 'test'
  docs: "./"
server =
  host: 'localhost'
  port: 3000

banner = """
  /* ========================================================================
   * <%= pkg.name %> - v<%= pkg.version %>
   * <%= pkg.homepage %>
   * ========================================================================
   * Copyright 2012-2013 <%= pkg.author.name %>
   *
   * ========================================================================
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   * ========================================================================
   */


  """

gulp.task 'coffee', ->
  gulp
  .src "#{paths.src}/coffee/#{name}.coffee"
  .pipe $.changed "#{paths.dist}/js"
  .pipe $.coffeelint 'coffeelint.json'
  .pipe $.coffeelint.reporter()
  .pipe $.coffeelint.reporter("fail")
  .pipe $.coffee()
    .on 'error', $.util.log
  .pipe $.header banner, pkg: pkg
  .pipe gulp.dest "#{paths.dist}/js"
  .pipe gulp.dest paths.test
  .pipe $.uglify()
  .pipe $.header banner, pkg: pkg
  .pipe $.rename suffix: '.min'
  .pipe gulp.dest "#{paths.dist}/js"

gulp.task 'less-bootstrap2', ->
  gulp
  .src "#{paths.src}/less/bootstrap2/build.less"
  .pipe $.changed "#{paths.dist}/css/bootstrap2"
  .pipe $.less()
    .on 'error', $.util.log
  .pipe $.header banner, pkg: pkg
  .pipe $.rename basename: name
  .pipe gulp.dest "#{paths.dist}/css/bootstrap2"
  .pipe $.less plugins: [cleanCss]
  .pipe $.header banner, pkg: pkg
  .pipe $.rename suffix: '.min'
  .pipe gulp.dest "#{paths.dist}/css/bootstrap2"

gulp.task 'less-bootstrap3', ->
  gulp
  .src "#{paths.src}/less/bootstrap3/build.less"
  .pipe $.changed "#{paths.dist}/css/bootstrap3"
  .pipe $.less()
  .pipe $.header banner, pkg: pkg
  .pipe $.rename basename: name
  .pipe gulp.dest "#{paths.dist}/css/bootstrap3"
  .pipe $.less compress: true, cleancss: true
  .pipe $.header banner, pkg: pkg
  .pipe $.rename suffix: '.min'
  .pipe gulp.dest "#{paths.dist}/css/bootstrap3"

gulp.task 'docs', ->
  gulp
  .src "#{paths.src}/docs/*.jade"
  .pipe $.changed paths.docs
  .pipe $.jade pretty: true
  .pipe gulp.dest paths.docs

gulp.task 'test-coffee', ['coffee'], ->
  gulp
  .src "#{paths.src}/coffee/#{name}.tests.coffee"
  .pipe $.changed paths.test
  .pipe $.coffeelint 'coffeelint.json'
  .pipe $.coffeelint.reporter()
    .on 'error', $.util.log
  .pipe $.coffee()
    .on 'error', $.util.log
  .pipe gulp.dest paths.test

gulp.task 'test-go', ['test-coffee'], (done) ->
  karma.start extend(karmaConfig, singleRun: true), done

gulp.task 'connect', ['docs'], ->
  $.connect.server
    root: [__dirname]
    host: server.host
    port: server.port
    livereload: true

gulp.task 'open', ['connect'], ->
  gulp
  .src 'index.html'
  .pipe $.open '', url: "http://#{server.host}:#{server.port}"

gulp.task 'watch', ['connect'], ->
  gulp.watch "#{paths.src}/coffee/#{name}.coffee", ['coffee']
  gulp.watch "#{paths.src}/less/bootstrap2/*.less", ['less-bootstrap2']
  gulp.watch "#{paths.src}/less/bootstrap3/*.less", ['less-bootstrap3']
  gulp.watch "#{paths.src}/docs/*.jade", ['docs']
  gulp.watch('package.json', ['dist']).on 'change', -> pkg = require './package.json'
  gulp.watch [
    "#{paths.dist}/js/**/*.js"
    "#{paths.dist}/css/**/*.css"
    '*.html'
  ]
  .on 'change', (event) ->
    gulp.src event.path
    .pipe $.connect.reload()

gulp.task 'server', ['connect', 'open', 'watch']
gulp.task 'less', ['less-bootstrap2', 'less-bootstrap3']
gulp.task 'dist', ['coffee', 'less']
gulp.task 'test', ['coffee', 'test-coffee', 'test-go']
gulp.task 'default', ['dist', 'docs', 'server']
