var gulp = require('gulp'),
    del = require('del'),
    run = require('gulp-run'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-minify-css'),
    browserify = require('browserify'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    browserSync = require('browser-sync'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    reactify = require('reactify'),
    package = require('./package.json'),
    reload = browserSync.reload;

/*
 * TODO: Running Bower
 */
gulp.task('bower', function() {
  run('bower install').exec();
})

/*
 * TODO: Cleaning dist/folder
 */
.task('clean', function(cb) {
  del(['dist/**'], cb);
})

/*
 * TODO: Running livereload server
 */
.task('server', function() {
  browserSync({
    server: {
      baseDir: './'
    }
  });
})

/*
 * TODO: Less compilation
 */
.task('sass', function() {
  console.log(package.paths.sass);
  return gulp.src(package.paths.sass)
    .pipe(sass({
      includePaths: [

      ]
    }).on('error', sass.logError))
    .pipe(concat(package.dest.style))
    .pipe(gulp.dest(package.dest.dist));
})

.task('sass:min', function() {
  return gulp.src(package.paths.sass)
    .pipe(sass())
    .pipe(concat(package.dest.style))
    .pipe(cssmin())
    .pipe(gulp.dest(package.dest.dist));
})

/*
 * JSLint, JSHint validation
 */
.task('lint', function() {
  return gulp.src(package.paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
})

/*
 * javascript compilation
 */
.task('js', function() {
  return browserify(package.paths.app)
    .transform(reactify)
    .bundle()
    .pipe(source(package.dest.app))
    .pipe(gulp.dest(package.dest.dist));
})

.task('js:min', function() {
  return browserify(package.paths.app)
    .transform(reactify)
    .bundle()
    .pipe(source(package.dest.app))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(package.dest.dist));
})

/*
 * Compiling resources and serving application
 */
.task('serve', ['bower', 'clean', 'lint', 'sass', 'js', 'server'], function() {
  return gulp.watch([
    package.paths.js,
    package.paths.jsx,
    package.paths.html,
    package.paths.sass
  ], [
    'lint',
    'sass',
    'js',
    reload
  ]);
})

.task('serve:minified', ['bower', 'clean', 'lint', 'sass:min', 'js:min', 'server'], function() {
  return gulp.watch([
    package.paths.js,
    package.paths.jsx,
    package.paths.html,
    package.paths.sass
  ], [
    'lint',
    'sass:min',
    'js:min',
    reload
  ]);
});