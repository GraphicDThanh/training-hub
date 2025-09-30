/* File: gulpfile.js */
'use strict';

// grab our gulp packages
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

var paths = {
  src: 'src',
  jade: 'src/documents',
  sass: 'src/files/sass',
  css: 'out/css',
  out: 'out',
  vendor: 'src/files/bower-components/',
  stylesheets: '/app/assets/stylesheets/'
};


/*
 * Config the jade task
 */
gulp.task('jade', function() {
  var YOUR_LOCALS = {};
  return gulp.src(paths.jade + '/**/index.jade')
    .pipe(jade({
      locals: YOUR_LOCALS,
      pretty: true
    }))
    .pipe(gulp.dest(paths.out));
});

gulp.task('sass', function() {
  return gulp.src(paths.sass + '/main.scss')
    .pipe(sass({
      includePaths: [
        paths.vendor + 'bourbon' + paths.stylesheets
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
  gulp.watch(paths.out + '/**/*.html', reload); 
  gulp.watch(paths.sass + '/**/*.scss', ['sass']);
  gulp.watch(paths.out + '/**/*.css', reload);
  return;
});

// Default version
gulp.task('default', [
  'connect:app',
  'jade',
  'sass'
]);