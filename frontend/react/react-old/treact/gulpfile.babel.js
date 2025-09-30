'use strict';

import gulp       from 'gulp';
import del        from 'del';
import run        from 'gulp-run';
import sass       from 'gulp-sass';
import cssmin     from 'gulp-minify-css';
import browserify from 'browserify';
import uglify     from 'gulp-uglify';
import concat     from 'gulp-concat';
import jshint     from 'gulp-jshint';
import browserSync from 'browser-sync';
import source     from 'vinyl-source-stream';
import buffer     from 'vinyl-buffer';
import reactify   from 'reactify';
import babel      from 'gulp-babel';
import packages   from './package.json';
import babelify   from 'babelify';

var reload = browserSync.reload;

/*
 * TODO: Running Bower
 */
gulp.task('bower', () => {
  run('bower install').exec();
})

/*
 * TODO: Cleaning dist/folder
 */
.task('clean', (cb) => {
  del(['dist/**'], cb);
})

/*
 * TODO: Running livereload server
 */
.task('server', () => {
  browserSync({
    server: {
      baseDir: './'
    }
  });
})

/*
 * TODO: Less compilation
 */
.task('sass', () => {
  console.log(packages.paths.sass);
  return gulp.src(packages.paths.sass)
    .pipe(sass({
      includePaths: [

      ]
    }).on('error', sass.logError))
    .pipe(concat(packages.dest.style))
    .pipe(gulp.dest(packages.dest.dist));
})

.task('sass:min', () => {
  return gulp.src(packages.paths.sass)
    .pipe(sass())
    .pipe(concat(packages.dest.style))
    .pipe(cssmin())
    .pipe(gulp.dest(packages.dest.dist));
})

/*
 * JSLint, JSHint validation
 */
.task('lint', () => {
  return gulp.src(packages.paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
})

/*
 * javascript compilation
 */
.task('js', () => {
  return browserify(packages.paths.app)
    .transform(babelify)
    .bundle()
    .on('error', (err) => { console.log('Error: ' + err.message); })
    .pipe(source(packages.dest.app))
    .pipe(gulp.dest(packages.dest.dist));
})

.task('js:min', () => {
  return browserify(packages.paths.app)
    .transform(babelify)
    .bundle()
    .on('error', (err) => { console.log('Error: ' + err.message); })
    .pipe(source(packages.dest.app))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(packages.dest.dist));
})

/*
 * Compiling resources and serving application
 */
.task('serve', ['bower', 'clean', 'lint', 'sass', 'js', 'server'], () => {
  return gulp.watch([
    packages.paths.js,
    packages.paths.jsx,
    packages.paths.html,
    packages.paths.sass
  ], [
    'lint',
    'sass',
    'js',
    reload
  ]);
})

.task('serve:minified', ['bower', 'clean', 'lint', 'sass:min', 'js:min', 'server'], () => {
  return gulp.watch([
    packages.paths.js,
    packages.paths.jsx,
    packages.paths.html,
    packages.paths.sass
  ], [
    'lint',
    'sass:min',
    'js:min',
    reload
  ]);
});