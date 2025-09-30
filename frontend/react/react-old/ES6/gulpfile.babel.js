'use strict';

import gulp from 'gulp';
// for use ES6 in gulp file
import babel from 'gulp-babel';
import sass from 'gulp-sass';
// for style build
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';

const paths = {
  src: 'app',
  dest: 'build'
};

const sassPath = {
  src: `${paths.src}/app.scss`,
  dest: `${paths.src}/styles/`
};

gulp.task('default', ['style', 'js'], () => {
});

gulp.task('style', () => {
  return gulp.src(sassPath.src)
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', plugins.sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dest));
});

gulp.task('js', () => {
  return gulp.src(paths.src + '/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dest));
});