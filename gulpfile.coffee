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
  base: './'
  src: 'src'
  dist: 'dist'
  test: 'test'
  docs: "docs"
  components: "components"

src =
  scripts: "#{paths.src}/coffee/#{name}.coffee"
  stylesheets:
    bootstrap2: "#{paths.src}/less/bootstrap2/build.less"
    bootstrap3: "#{paths.src}/less/bootstrap3/build.less"
  test: "#{paths.src}/coffee/#{name}.tests.coffee"
  docs:
    vendor:
      scripts: [
        "#{paths.components}/jquery/dist/jquery.min.js"
        "#{paths.components}/bootstrap/dist/js/bootstrap.min.js"
        "#{paths.src}/docs/js/*.js"
      ]
      stylesheets: [
        "#{paths.components}/bootstrap/dist/css/bootstrap.min.css"
        "#{paths.src}/docs/css/*.css"
      ]
      fonts: "#{paths.components}/bootstrap/dist/fonts/*"
    scripts: "#{paths.src}/docs/coffee/main.coffee"
    stylesheets: "#{paths.src}/docs/less/main.less"
    markup: "#{paths.src}/docs/jade/*.jade"

dest =
  scripts: "#{paths.dist}/js"
  stylesheets:
    bootstrap2: "#{paths.dist}/css/bootstrap2"
    bootstrap3: "#{paths.dist}/css/bootstrap3"
  test: paths.test
  docs:
    scripts: "#{paths.docs}/js"
    stylesheets: "#{paths.docs}/css"
    fonts: "#{paths.docs}/fonts"
    markup: paths.base

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


# build
gulp.task 'coffee', ->
  gulp
  .src src.scripts
  .pipe $.changed dest.scripts
  .pipe $.coffeelint 'coffeelint.json'
  .pipe $.coffeelint.reporter()
  .pipe $.coffeelint.reporter("fail")
  .pipe $.coffee()
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
  .pipe $.changed dest.stylesheets.bootstrap3
  .pipe $.less()
  .pipe $.header banner, pkg: pkg
  .pipe $.rename basename: name
  .pipe gulp.dest dest.stylesheets.bootstrap3
  .pipe $.less compress: true, cleancss: true
  .pipe $.header banner, pkg: pkg
  .pipe $.rename suffix: '.min'
  .pipe gulp.dest dest.stylesheets.bootstrap3

# docs
vendorTask = (name) ->
  return ->
    gulp
    .src src.docs.vendor[name]
    .pipe $.changed dest.docs[name]
    .pipe gulp.dest dest.docs[name]

gulp.task 'docs-vendor-scripts', vendorTask 'scripts'

gulp.task 'docs-vendor-stylesheets', vendorTask 'stylesheets'

gulp.task 'docs-vendor-fonts', vendorTask 'fonts'

gulp.task 'docs-coffee', ->
  gulp
  .src src.docs.scripts
  .pipe $.changed dest.docs.scripts
  .pipe $.coffeelint 'coffeelint.json'
  .pipe $.coffeelint.reporter()
  .pipe $.coffeelint.reporter("fail")
  .pipe $.coffee()
    .on 'error', $.util.log
  .pipe gulp.dest dest.docs.scripts

gulp.task 'docs-less', ->
  gulp
  .src src.docs.stylesheets
  .pipe $.changed dest.docs.stylesheets
  .pipe $.less()
  .pipe gulp.dest dest.docs.stylesheets

gulp.task 'docs-jade', ->
  gulp
  .src src.docs.markup
  .pipe $.changed dest.docs.markup
  .pipe $.jade pretty: true
  .pipe gulp.dest dest.docs.markup

# test
gulp.task 'test-coffee', ['coffee'], ->
  gulp
  .src src.test
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

# watch
gulp.task 'watch', ['connect'], ->
  gulp.watch src.scripts, ['coffee']
  gulp.watch src.stylesheets.bootstrap2, ['less-bootstrap2']
  gulp.watch src.stylesheets.bootstrap3, ['less-bootstrap3']
  gulp.watch src.docs.vendor.scripts, ['docs-vendor-scripts']
  gulp.watch src.docs.vendor.stylesheets, ['docs-vendor-stylesheets']
  gulp.watch src.docs.vendor.fonts, ['docs-vendor-fonts']
  gulp.watch src.docs.scripts, ['docs-coffee']
  gulp.watch src.docs.stylesheets, ['docs-less']
  gulp.watch src.docs.markup, ['docs-jade']

  gulp.watch('package.json', ['dist']).on 'change', -> pkg = require './package.json'
  gulp.watch [
    "#{dest.scripts}/*.js"
    "#{dest.stylesheets.bootstrap2}/*.css"
    "#{dest.stylesheets.bootstrap3}/*.css"
    "*.html"
  ]
  .on 'change', (event) ->
    gulp.src event.path
    .pipe $.connect.reload()

gulp.task 'docs', ['docs-vendor-scripts', 'docs-vendor-stylesheets', 'docs-vendor-fonts', 'docs-coffee', 'docs-less', 'docs-jade']
gulp.task 'less', ['less-bootstrap2', 'less-bootstrap3']
gulp.task 'dist', ['coffee', 'less']
gulp.task 'test', ['coffee', 'test-coffee', 'test-go']
gulp.task 'server', ['connect', 'open', 'watch']
gulp.task 'default', ['dist', 'docs', 'server']
