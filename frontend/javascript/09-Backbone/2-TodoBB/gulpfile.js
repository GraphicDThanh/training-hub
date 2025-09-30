/* File: gulpfile.js */
/*
 * Required gulp and gulp plugins
 */
var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    concat = require('gulp-concat'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    stylish = require('jshint-stylish'),
    minifyHTML = require('gulp-minify-html'),
    minifyCss = require('gulp-minify-css'),
    util = require('gulp-util');

var environment = 'development';
/*
 * Config paths
 */
var paths = {
  css_src: 'src/files/styles/**/*.scss',

  css_out: 'out/files/styles',

  html_src: [
    'src/documents/index.jade'
  ],

  html_out: 'out/',

  javascript_src: [
    'src/files/scripts/helper/configHandle.js',
    'src/files/scripts/models/todo.js',
    'src/files/scripts/collections/todos.js',
    'src/files/scripts/views/todo-view.js',
    'src/files/scripts/views/app-view.js',
    'src/files/scripts/routers/router.js',
    'src/files/scripts/app.js'
  ],
  
  javascript_out: 'out/files/scripts',

  javascript_components: 'out/files/bower-components/',

  vendor: 'src/files/bower-components/'
}

/*
 * Define the default task as develop task
 */
gulp.task('default', function() {
  gulp.start(
    'watch',
    'jshint',
    'vendor-scripts',
    'jade',
    'scripts',
    'sass',
    'serve'
  )
});

/*
 * Define task production
 */
gulp.task('production', ['set-production', 'default']);

gulp.task('set-production', function() {
  environment = 'production';
});
/*
 * Configure the jshint task
 */
gulp.task('jshint', function() {
  return gulp.src(paths.javascript_src)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
});

/*
 * Process scripts and concatenate them into one output file
 */
gulp.task('scripts', function() {
  var stream = gulp.src(paths.javascript_src);

  if(environment === 'production') {
    stream = stream.pipe(concat('main.js'))
          .pipe(uglify())
          .pipe(rename({suffix: '.min'}));
  }

  stream = stream.pipe(gulp.dest(paths.javascript_out));
});

/*
 * Config the sass task
 */
gulp.task('sass', function () {
  var stream = gulp.src(paths.css_src)
    .pipe(sass().on('error', sass.logError));

  if(environment === 'production') {
    stream = stream.pipe(minifyCss())
          .pipe(rename({suffix: '.min'}));
  }

  stream = stream.pipe(gulp.dest(paths.css_out))
});

/*
 * Config the jade task
 */
gulp.task('jade', function() {
  var YOUR_LOCALS = {};

  var opts = {
    conditionals: true,
    spare:true
  };

  var stream = gulp.src(paths.html_src)
    .pipe(jade({
      locals: YOUR_LOCALS,
      pretty: true
    }))
    .pipe(gulp.dest(paths.html_out));

  if(environment === 'production') {
    stream = stream.pipe(minifyHTML(opts));
  }

  stream = stream.pipe(gulp.dest(paths.html_out));
});

/*
 * Config the serve task
 */
gulp.task('serve', [], function() {
  browserSync({
    notify: false,
    port: 3003,
    server: {
      baseDir: './out'
    }
  });

  gulp.watch(paths.javascript_out, reload);
  gulp.watch(paths.css_out, reload);
  gulp.watch(paths.html_out, reload);
});

/*
 * Config for libraries
 */
gulp.task('vendor-scripts', function() {
  var stream = gulp.src([
    paths.vendor + 'jquery/dist/jquery.js',
    paths.vendor + 'bootstrap-sass-official/assets/javascripts/bootstrap.js',
    paths.vendor + 'underscore/underscore.js',
    paths.vendor + 'backbone/backbone.js',
    paths.vendor + 'Backbone.localStorage/backbone.localStorage.js',
    paths.vendor + 'handlebars/handlebars.js',
  ])

  if(environment == 'production') {
    stream = stream.pipe(concat('vendor.js'))
          .pipe(uglify())
          .pipe(rename({suffix: '.min'}));
  }

  stream = stream.pipe(gulp.dest(paths.javascript_components));
});

/*
 * Watch changed files
 */
gulp.task('watch', function() {
  gulp.watch(paths.javascript_src, ['scripts']);
  gulp.watch(paths.css_src, ['sass']);
  gulp.watch(paths.html_src, ['jade']);
  gulp.watch(paths.libraries, ['libraries']);
});
