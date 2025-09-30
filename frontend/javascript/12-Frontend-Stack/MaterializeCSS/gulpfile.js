/* File: gulpfile.js */
'use strict';

// grab our gulp packages
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    changed = require('gulp-changed'),
    cache = require('gulp-cache'),
    imagemin = require('gulp-imagemin'),
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat');

var paths = {
  src: 'src',
  jade: 'src/documents',
  sass: 'src/files/scss',
  images: 'src/files/images',
  css: 'out/css',
  js: 'src/files/js',
  fonts: 'src/files/fonts/',
  out: 'out',
  vendor: 'src/files/bower-components/',
  stylesheets: '/app/assets/stylesheets/'
};

/*
 * Config the jade task
 */
gulp.task('jade', function() {
  var YOUR_LOCALS = {};
  return gulp.src(paths.jade + '/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS,
      pretty: true
    }))
    .pipe(gulp.dest(paths.out));
});

gulp.task('sass', function() {
  return gulp.src(paths.sass + '/app.scss')
    .pipe(sass({
      includePaths: [
        // paths.vendor + 'foundation/scss',
        // paths.vendor + 'foundation/scss/foundation',
        // paths.vendor + 'font-awesome/scss'
      ]
    }).on('error', sass.logError))
    .pipe(gulp.dest(paths.css));
});

gulp.task('connect:app', function() {
  browserSync({
    notify: false,
    port: 8008,    
    server: {
      baseDir: [paths.out]
    }
  });

  gulp.watch(paths.jade + '/**/*.jade', ['jade']);
  gulp.watch(paths.sass + '/**/*.scss', ['sass']);
  gulp.watch(paths.js + '/*.js', ['jshint']);
  gulp.watch(paths.js + '/main.js', ['js']);
  gulp.watch(paths.fonts + '/**/*/{ttf,woff,eof,svg,woff2}', ['copyfiles']);
  gulp.watch(paths.images + '/**/*.{jpg, jpeg, png, gif}', ['images']);
  gulp.watch(paths.out + '/**/*.html', reload); 
  gulp.watch(paths.out + '/**/*.css', reload);
  gulp.watch(paths.out + '/js/*.js', reload);
  gulp.watch(paths.out + '/**/*.{jpg, jpeg, png, gif}', reload);
  gulp.watch(paths.out + '/**/*.{ttf,woff,eof,svg,woff2}', reload);
  return;
});

/**
 * images task
 * @param  {[type]} )
 * @return {[type]}   [description]
 */
gulp.task('images', function() {
  return gulp.src(paths.images + '/**/*.{jpg,jpeg,png,gif}')
    .pipe(changed(paths.out + '/images/'))
    .pipe(imagemin({
      progressive: true,
      // svgoPlugins: [{removeViewBox: false}],
      // use: [pngquant()]
    }))
    .pipe(gulp.dest(paths.out + '/images'));
});

gulp.task('fonts', function () {
  return gulp.src(paths.fonts)
    .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
    .pipe($.flatten())
    .pipe(gulp.dest(paths.out + '/fonts/'));
});

gulp.task('copy-font', ['copy-js-vendor'], function() {
  return gulp.src(paths.fonts + '/**/*.{ttf,woff,eof,svg,woff2}')
    .pipe(gulp.dest(paths.out + '/fonts/'))
});

gulp.task('copy-js-vendor', function() {
  return gulp.src([
      paths.vendor + '/jquery/dist/jquery.min.js',
      paths.vendor + '/Materialize/dist/js/materialize.min.js'
    ])
    .pipe(gulp.dest(paths.out + '/js/'))
});

gulp.task('jshint', function() {
  return gulp.src(paths.js + '/main.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('js', function() {
  return gulp.src(paths.js + '/main.js')
    .pipe(sourcemaps.init())
      .pipe(concat('main.js'))

      // only uglify if gulp in ran with '--type production'
      .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.out + '/js'));
});

// Default version
gulp.task('default', [
  'connect:app',
  'copy-font',
  'copy-js-vendor',
  'jade',
  'sass',
  'js',
  'images'
]);