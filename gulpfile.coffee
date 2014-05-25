gulp = require 'gulp'
plugins = require('gulp-load-plugins')()
pkg = require './package.json'
name = pkg.name

SOURCE_PATH = './src'
DIST_PATH = './dist'
DOCS_PATH = "./docs"
SERVER_HOST = 'localhost'
SERVER_PORT = 3000
BANNER = """
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
  .src "#{SOURCE_PATH}/coffee/#{name}.coffee"
  .pipe plugins.changed "#{DIST_PATH}/js"
  .pipe plugins.coffeelint './coffeelint.json'
  .pipe plugins.coffeelint.reporter()
    .on 'error', plugins.util.log
  .pipe plugins.coffee()
    .on 'error', plugins.util.log
  .pipe plugins.header BANNER, pkg: pkg
  .pipe gulp.dest "#{DIST_PATH}/js"
  .pipe plugins.uglify()
  .pipe plugins.header BANNER, pkg: pkg
  .pipe plugins.rename suffix: '.min'
  .pipe gulp.dest "#{DIST_PATH}/js"

gulp.task 'less-bootstrap2', ->
  gulp
  .src "#{SOURCE_PATH}/less/bootstrap2/build.less"
  .pipe plugins.changed "#{DIST_PATH}/css/bootstrap2"
  .pipe plugins.less()
    .on 'error', plugins.util.log
  .pipe plugins.header BANNER, pkg: pkg
  .pipe plugins.rename basename: name
  .pipe gulp.dest "#{DIST_PATH}/css/bootstrap2"
  .pipe plugins.less compress: true, cleancss: true
  .pipe plugins.header BANNER, pkg: pkg
  .pipe plugins.rename suffix: '.min'
  .pipe gulp.dest "#{DIST_PATH}/css/bootstrap2"

gulp.task 'less-bootstrap3', ->
  gulp
  .src "#{SOURCE_PATH}/less/bootstrap3/build.less"
  .pipe plugins.changed "#{DIST_PATH}/css/bootstrap3"
  .pipe plugins.less()
  .pipe plugins.header BANNER, pkg: pkg
  .pipe plugins.rename basename: name
  .pipe gulp.dest "#{DIST_PATH}/css/bootstrap3"
  .pipe plugins.less compress: true, cleancss: true
  .pipe plugins.header BANNER, pkg: pkg
  .pipe plugins.rename suffix: '.min'
  .pipe gulp.dest "#{DIST_PATH}/css/bootstrap3"

gulp.task 'docs', ->
  gulp
  .src "#{SOURCE_PATH}/docs/*.jade"
  .pipe plugins.changed './'
  .pipe plugins.jade pretty: true
  .pipe gulp.dest './'

gulp.task 'connect', ['docs'], ->
  plugins.connect.server
    root: [__dirname]
    host: SERVER_HOST
    port: SERVER_PORT
    livereload: true

gulp.task 'open', ['connect'], ->
  gulp
  .src './index.html'
  .pipe plugins.open '', url: "http://#{SERVER_HOST}:#{SERVER_PORT}"

gulp.task 'watch', ['connect'], ->
  gulp.watch "#{SOURCE_PATH}/coffee/#{name}.coffee", ['coffee']
  gulp.watch "#{SOURCE_PATH}/less/bootstrap2/*.less", ['less-bootstrap2']
  gulp.watch "#{SOURCE_PATH}/less/bootstrap3/*.less", ['less-bootstrap3']
  gulp.watch "#{SOURCE_PATH}/docs/*.jade", ['docs']
  gulp.watch [
    "#{DIST_PATH}/js/**/*.js"
    "#{DIST_PATH}/css/**/*.css"
    './*.html'
  ]
  .on 'change', (event) ->
    gulp.src event.path
    .pipe plugins.connect.reload()

gulp.task 'server', ['connect', 'open', 'watch']
gulp.task 'less', ['less-bootstrap2', 'less-bootstrap3']
gulp.task 'dist', ['coffee', 'less']
gulp.task 'default', ['dist', 'docs', 'server']
