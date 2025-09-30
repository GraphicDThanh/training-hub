'use strict';

/*
 * Required gulp and gulp plugins
 */
var gulp = require('gulp'),
    del = require('del'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade'),
    rjs = require ('requirejs'),
    util = require('gulp-util'),
    size = require('gulp-size'),
    shell = require('gulp-shell'),
    runs = require('run-sequence'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    changed = require('gulp-changed'),
    replaced = require('gulp-replace'),
    stylish = require('jshint-stylish'),
    browserSync = require('browser-sync'),
    amdOptimize = require('amd-optimize'),
    minifyCss = require('gulp-minify-css'),
    minifyHTML = require('gulp-minify-html'),
    ifElse = require('gulp-if-else'),
    reload = browserSync.reload;

var paths = {
  src: 'src',
  jade: 'src/documents',
  script: 'src/files/scripts',
  sass: 'src/files/sass',
  css: 'src/files/css',
  dist: 'dist',
  vendor: 'src/files/bower-components',
  hbs: 'src/files/templates'
};

/*
 * Config the jade task
 */
gulp.task('jade', function() {
  var YOUR_LOCALS = {};
  var stream = gulp.src(paths.jade + '/**/index.jade');

  stream = stream.pipe(jade({
            locals: YOUR_LOCALS,
            pretty: true
          }))
          .pipe(gulp.dest(paths.src));
});

gulp.task('styles', function() {
  var stream = gulp.src(paths.sass + '/**/*.scss')

  stream = stream.pipe(sass().on('error', sass.logError))
                 .pipe(gulp.dest(paths.css));
});

gulp.task('html', function() {
  var opts = {
    conditionals: true,
    spare:true
  };

  return gulp.src(paths.src + '/*.html')
    .pipe(changed(paths.dist))
    .pipe(replaced('files/css/main.css', 'css/main.min.css'))
    .pipe(replaced('files/scripts/app', ''))
    .pipe(replaced('files/bower-components/requirejs/require.js', 'js/main.min.js'))
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('css-minify', function() {
  return gulp.src(paths.css + '**/*.css')
    .pipe(rename({suffix: '.min'}))
    .pipe(minifyCss())
    .pipe(gulp.dest(paths.dist + ''));
});

gulp.task('connect:app', function() {
  return browserSync({
    notify: false,
    port: 3003,    
    server: {
      baseDir: [paths.src]
    }
  });

  gulp.watch(paths.jade + '/**/*.jade', ['html']);
  gulp.watch(paths.src + '/*.html', reload);
  gulp.watch(paths.sass + '/**/*.scss', ['styles']);
  gulp.watch(paths.css + '/**/*.css', ['styles']);
  gulp.watch(paths.script + '/**/*.js', reload);
  gulp.watch(paths.hbs + '/**/*.hbs', reload);
});

gulp.task('clean', del.bind(null, [
  paths.dist, 
  '.sass-cache',
  paths.src + '**/*.html',
  paths.css,
  paths.script + 'text.js'
]));

gulp.task('copy', function() {
  return gulp.src(['./text.js']).pipe(gulp.dest(paths.src + '/files/scripts'));
});

gulp.task('requirejs', function() {
  return gulp.src(paths.vendor + 'requirejs/require.js')
    .pipe(gulp.dest(paths.dist + 'js'));
});

gulp.task('rjs-build', ['styles'], shell.task([
  'r.js -o build.js'
]));

// Default version
gulp.task('default', function(cb) {
  return runs(['jade', 'styles', 'copy', 'requirejs'], 'connect:app', cb);
});

// // Build version
gulp.task('build', ['default'], function(cb) {
  return runs('html', 'rjs-build', 'css-minify', cb);
});