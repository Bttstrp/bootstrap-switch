var gulp = require('gulp');
var gutil = require('gulp-util');
var coffeelint = require('gulp-coffeelint');
var coffee = require('gulp-coffee');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var header = require('gulp-header');
var clean = require('gulp-clean');
var open = require('gulp-open');
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

gulp.task('coffee', function() {
  gulp.src('src/coffee/' + name + '.coffee')
    .pipe(coffeelint({
      indentation: 2,
      no_trailing_semicolons: true,
      no_trailing_whitespace: true
    }))
    .pipe(coffee()).on('error', gutil.log)
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest('build/js'))
    .pipe(uglify())
    .pipe(header(banner, { pkg: pkg }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('build/js'));
});

gulp.task('less-bootstrap2', function() {
  gulp.src('src/less/bootstrap2/build.less')
    .pipe(less())
    .pipe(header(banner, { pkg: pkg }))
    .pipe(rename({ basename: name }))
    .pipe(gulp.dest('build/css/bootstrap2'))
    .pipe(less({
      compress: true,
      cleancss: true
    }))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('build/css/bootstrap2'));
});

gulp.task('less-bootstrap3', function() {
  gulp.src([
      'src/less/bootstrap3/build.less',
    ])
    .pipe(less())
    .pipe(header(banner, { pkg: pkg }))
    .pipe(rename({ basename: name }))
    .pipe(gulp.dest('build/css/bootstrap3'))
    .pipe(less({
      compress: true,
      cleancss: true
    }))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('build/css/bootstrap3'));
});

gulp.task('clean', function() {
  gulp.src(['build/css', 'build/js'], { read: false })
    .pipe(clean());
});

gulp.task('open', function(){
  gulp.src('index.html')
    .pipe(open());
});

gulp.task('watch', function () {
  gulp.watch('src/coffee/' + name + '.coffee', ['coffee']);
  gulp.watch('src/less/bootstrap2/*.less', ['less-bootstrap2']);
  gulp.watch('src/less/bootstrap3/*.less', ['less-bootstrap3']);
});

gulp.task('default', ['clean', 'coffee', 'less-bootstrap2', 'less-bootstrap3', 'open', 'watch']);
