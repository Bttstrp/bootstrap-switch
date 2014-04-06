var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var pkg = require('./package.json');
var name = pkg.name;
var banner = [
  '/* ========================================================================',
  ' * <%= pkg.name %> - v<%= pkg.version %>',
  ' * <%= pkg.homepage %>',
  ' * ========================================================================',
  ' * Copyright 2012-2013 <%= pkg.author.name %>',
  ' *',
  ' * ========================================================================',
  ' * Licensed under the Apache License, Version 2.0 (the \"License\");',
  ' * you may not use this file except in compliance with the License.',
  ' * You may obtain a copy of the License at',
  ' *',
  ' *     http://www.apache.org/licenses/LICENSE-2.0',
  ' *',
  ' * Unless required by applicable law or agreed to in writing, software',
  ' * distributed under the License is distributed on an \"AS IS\" BASIS,',
  ' * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.',
  ' * See the License for the specific language governing permissions and',
  ' * limitations under the License.',
  ' * ========================================================================',
  ' */',
  '',
  ''].join('\n');

var SERVER_HOST = 'localhost';
var SERVER_PORT = 3000;

gulp.task('coffee', function(done) {
  gulp.src('./src/coffee/' + name + '.coffee')
    .pipe(plugins.coffeelint('./coffeelint.json'))
    .pipe(plugins.coffeelint.reporter())
    .pipe(plugins.coffee()).on('error', plugins.util.log)
    .pipe(plugins.header(banner, { pkg: pkg }))
    .pipe(gulp.dest('./dist/js'))
    .pipe(plugins.uglify())
    .pipe(plugins.header(banner, { pkg: pkg }))
    .pipe(plugins.rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/js'))
    .on('end', done);
});

gulp.task('less-bootstrap2', function(done) {
  gulp.src('./src/less/bootstrap2/build.less')
    .pipe(plugins.less())
    .pipe(plugins.header(banner, { pkg: pkg }))
    .pipe(plugins.rename({ basename: name }))
    .pipe(gulp.dest('./dist/css/bootstrap2'))
    .pipe(plugins.less({
      compress: true,
      cleancss: true
    }))
    .pipe(plugins.header(banner, { pkg: pkg }))
    .pipe(plugins.rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/css/bootstrap2'))
    .on('end', done);
});

gulp.task('less-bootstrap3', function(done) {
  gulp.src('./src/less/bootstrap3/build.less')
    .pipe(plugins.less())
    .pipe(plugins.header(banner, { pkg: pkg }))
    .pipe(plugins.rename({ basename: name }))
    .pipe(gulp.dest('./dist/css/bootstrap3'))
    .pipe(plugins.less({
      compress: true,
      cleancss: true
    }))
    .pipe(plugins.header(banner, { pkg: pkg }))
    .pipe(plugins.rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/css/bootstrap3'))
    .on('end', done);
});

gulp.task('docs', function(done) {
  gulp.src('./docs/index.jade')
    .pipe(plugins.jade({ pretty: true }))
    .pipe(gulp.dest('./'))
    .on('end', done);
});

gulp.task('open', ['connect'], function(done) {
  gulp.src('./index.html')
    .pipe(plugins.open('', { url: 'http://' + SERVER_HOST + ':' + SERVER_PORT }))
    .on('end', done);
});

gulp.task('connect', function(done) {
  plugins.connect.server({
    root: [__dirname],
    host: SERVER_HOST,
    port: SERVER_PORT,
    livereload: true
  });
  done();
});

gulp.task('watch', ['connect'], function() {
  var change = function(data) {
    gulp.src(data.path).pipe(plugins.connect.reload());
  };

  gulp.watch('./src/coffee/' + name + '.coffee', ['coffee']).on('change', change);
  gulp.watch('./src/less/bootstrap2/*.less', ['less-bootstrap2']).on('change', change);
  gulp.watch('./src/less/bootstrap3/*.less', ['less-bootstrap3']).on('change', change);
  gulp.watch('./docs/index.jade', ['docs']).on('change', change);
});

gulp.task('server', ['connect', 'open']);
gulp.task('less', ['less-bootstrap2', 'less-bootstrap3']);
gulp.task('build', ['coffee', 'less']);
gulp.task('default', ['server', 'build', 'docs', 'watch']);
