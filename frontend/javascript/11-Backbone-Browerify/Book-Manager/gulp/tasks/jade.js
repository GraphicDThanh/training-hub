var gulp = require('gulp');
var browserSync  = require('browser-sync');
var jade = require('gulp-jade');
var config = require('../config').jade;

gulp.task('jade', function () {
  return gulp.src(config.src)
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream: true}));
});