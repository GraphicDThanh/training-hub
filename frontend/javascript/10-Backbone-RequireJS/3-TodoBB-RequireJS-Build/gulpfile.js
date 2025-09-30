'use strict';

/*
 * Required gulp and gulp plugins
 */
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    del = require('del'),
    rjs = require('requirejs'),
    sass = require('gulp-sass'),
    util = require('gulp-util'),
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
    minifyCss = require('gulp-minify-css'),
    minifyHTML = require('gulp-minify-html'),
    reload = browserSync.reload,
    filename = require('uuid').v4(),
    rjs = require('requirejs');

var paths = {
  src: 'src',
  jade: 'src/documents',
  script: 'src/files/scripts',
  sass: 'src/files/sass',
  css: 'src/files/css',
  dist: 'dist',
  vendor: 'src/files/bower-components',
  tpl: 'src/files/templates'
};

/*
 * Config the jade task
 */
gulp.task('jade', function() {
  var YOUR_LOCALS = {};
  return gulp.src(paths.jade + '/**/index.jade')
    .pipe($.jade({
      locals: YOUR_LOCALS,
      pretty: true
    }))
    .pipe(gulp.dest(paths.src));
});

gulp.task('sass', function() {
  return gulp.src(paths.sass + '/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.css));
});

gulp.task('html', ['jade'], function() {
  var opts = {
    conditionals: true,
    spare:true
  };

  return gulp.src(paths.src + '/*.html')
    .pipe(changed(paths.dist))
    .pipe(replaced('files/css/main.css', 'css/main.min.css'))
    .pipe(replaced('files/scripts/app', 'js/' + filename))
    .pipe(replaced('files/bower-components/requirejs/require.js', 'js/require.min.js'))
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('dist/'));
});

gulp.task('css', ['sass'], function() {
  return gulp.src(paths.css + '/*.css')
    .pipe(rename({suffix: '.min'}))
    .pipe(minifyCss())
    .pipe(gulp.dest(paths.dist + '/css'));
});

gulp.task('connect:app', function() {
  browserSync({
    notify: false,
    port: 3003,    
    server: {
      baseDir: [paths.src]
    }
  });

  gulp.watch(paths.jade + '/**/*.jade', ['html']);
  gulp.watch(paths.src + '/*.html', reload);
  gulp.watch(paths.sass + '/**/*.scss', ['styles']);
  gulp.watch(paths.css + '/*.css', reload);
  gulp.watch(paths.script + '/**/*.js', reload);
  gulp.watch(paths.tpl + '/**/*.tpl', reload);
  return;
});

gulp.task('clean', del.bind(null, [
  '.sass-cache',
  paths.css,
  paths.dist, 
  paths.src + '**/*.html',
  paths.script + '/app-build.js'
]));

// gulp.task('rjs', ['build'], function(cb) {
  // return rjs.optimize({
  //   baseUrl: paths.script,
  //   name: 'app',
  //   mainConfigFile: paths.script + '/app.js',
  //   out: paths.script + '/app-build.js',
  //   preserveLicenseComments: false,
  //   wrapShim: true
  // }, function(buildResponse) {
  //   return cb();
  // });
// });

gulp.task('rjs', ['build'], shell.task([
  'r.js -o build.js'
]));

gulp.task('rename', ['rjs'], function() {
  gulp.src(paths.script + '/app-build.js')
    .pipe(rename(filename + '.js'))
    .pipe(gulp.dest(paths.dist + '/js'));
  gulp.src(paths.vendor + '/requirejs/require.js')
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist + '/js'));
  return;
});

// Default version
gulp.task('default', function(cb) {
  return runs(['jade', 'sass'], 'connect:app', cb);
});

// Build version
gulp.task('build', ['css', 'html'], function() {
  return gulp.src(paths.dist + '/**/*')
    .pipe($.size({
      showFiles: true,
      gzip: true
    }));
});

// Release version
gulp.task('release', function(cb) {
  return runs(['build', 'rjs', 'rename'], cb);
});