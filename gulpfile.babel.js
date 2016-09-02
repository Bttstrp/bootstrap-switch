var gulp        = require('gulp');
var gutil       = require('gulp-util');
var source      = require('vinyl-source-stream');
var babelify    = require('babelify');
var watchify    = require('watchify');
var reactify    = require('reactify');
var browserify  = require('browserify');
var browserSync = require('browser-sync').create();
var less        = require('gulp-less');
var rename      = require('gulp-rename');
var cleanCss    = require('gulp-clean-css');
var header      = require('gulp-header');
var pkg         = require('./package.json');

import { buildFolder } from './tools/build';


const banner = `
/* ========================================================================
 * ${pkg.name} - v${pkg.version}
 * ${pkg.homepage}
 * ========================================================================
 * Copyright 2012-2016 ${pkg.author.name}
 *
 * Released under the MIT license
 * ========================================================================
 */

`

gulp.task('dev-bundle', function(){
    // Input file.
    watchify.args.debug = true;

    // var bundler = watchify(browserify('./src/js/switch.js', watchify.args));
    var bundler = watchify(browserify('./example/src/example.js', watchify.args));

    // Babel transform
    bundler.transform(babelify.configure({
        sourceMapRelative: 'src/js',
        presets: [ 'es2015', 'react' ]
    }));

    bundler.transform(reactify);

    // On updates recompile
    bundler.on('update', bundle);

    function bundle(){

        gutil.log('Compiling JS...');

        return bundler.bundle()
            .on('error', function (err) {
                gutil.log(err.message);
                browserSync.notify("Browserify Error!");
                this.emit("end");
            })
            .pipe(source('react-bootstrap-switch.js'))
            .pipe(gulp.dest('./example/js'))
            .pipe(browserSync.stream({once: true}));
    }

    return bundle();
});

gulp.task('dev-less', function() {
    return gulp.src('src/less/bootstrap3/build.less')
    .pipe(less())
    .pipe(rename('react-bootstrap-switch.css'))
    .pipe(gulp.dest('example/css'))
    .on('error', gutil.log);
});

gulp.task('less-bs3', function() {
    return gulp.src('src/less/bootstrap3/build.less')
    .pipe(less())
    .pipe(header(banner, {pkg: pkg}))
    .pipe(rename('react-bootstrap-switch.css'))
    .pipe(gulp.dest('dist/css/bootstrap3'))
    .pipe(cleanCss())
    .pipe(header(banner, {pkg: pkg}))
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest('dist/css/bootstrap3'))
    .on('error', gutil.log);
});

gulp.task('less-bs2', function() {
    return gulp.src('src/less/bootstrap2/build.less')
    .pipe(less())
    .pipe(header(banner, {pkg: pkg}))
    .pipe(rename('react-bootstrap-switch.css'))
    .pipe(gulp.dest('dist/css/bootstrap2'))
    .pipe(cleanCss())
    .pipe(header(banner, {pkg: pkg}))
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest('dist/css/bootstrap2'))
    .on('error', gutil.log);
});

gulp.task('less', ['less-bs2', 'less-bs3'], ()=>{});

gulp.task('dist', function(){
    buildFolder("src/js", "dist/js");
});

/**
 * First bundle, then serve from the ./app directory
 */
gulp.task('default', ['dev-bundle', 'dev-less'], function(){
    // Watch .less files
    gulp.watch('src/less/bootstrap3/**/*.less', ['dev-less']);

    browserSync.init({
        server: "./example"
    });
});