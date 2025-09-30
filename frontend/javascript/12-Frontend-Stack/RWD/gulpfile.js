/* File: gulpfile.js */
'use strict';

// grab our gulp packages
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    // data = require('gulp-data'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    changed = require('gulp-changed'),
    cache = require('gulp-cache'),
    // imagemin = require('gulp-imagemin'),
    // jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat');

var paths = {
  src: 'src',
  jade: 'src/documents',
  sass: 'src/files/sass',
  // images: 'src/files/images',
  css: 'out/css',
  // js: 'src/files/scripts',
  // fonts: 'src/files/fonts/',
  out: 'out',
  // vendor: 'src/files/bower-components/'
};

/*
 * Config the jade task
 */
gulp.task('jade', function() {
  return gulp.src(paths.jade + '/*.jade')
    // .pipe(data(function(file) {
    //   return require('./src/documents/data/data.json');
    // }))
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(paths.out));
});

gulp.task('sass', function() {
  return gulp.src(paths.sass + '/main.scss')
    .pipe(sass({
      includePaths: [
        // paths.vendor + 'bourbon' + paths.stylesheets,
        // paths.vendor + 'neat' + paths.stylesheets,
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
  gulp.watch(paths.out + '/**/*.html', reload); 
  gulp.watch(paths.out + '/**/*.css', reload);
  return;
});

/**
 * images task
 * @param  {[type]} )
 * @return {[type]}   [description]
 */
// gulp.task('images', function() {
//   return gulp.src(paths.images + '/**/*.{jpg,jpeg,png,gif,svg}')
//     .pipe(changed(paths.out + '/images/'))
//     .pipe(imagemin({
//       progressive: true,
//       // svgoPlugins: [{removeViewBox: false}],
//       // use: [pngquant()]
//     }))
//     .pipe(gulp.dest(paths.out + '/images'));
// });

// gulp.task('fonts', function () {
//   return gulp.src(paths.fonts)
//     .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
//     .pipe($.flatten())
//     .pipe(gulp.dest(paths.out + '/fonts/'));
// });

// gulp.task('copy-font', ['copy-js-vendor'], function() {
//   return gulp.src(paths.fonts + '/**/*.{ttf,woff,eof,svg,woff2}')
//     .pipe(gulp.dest(paths.out + '/fonts/'))
// });

// gulp.task('copy-js-vendor', function() {
//   return gulp.src([
//       paths.vendor + '/jquery/dist/jquery.min.js',
//       paths.vendor + '/Materialize/dist/js/materialize.min.js'
//     ])
//     .pipe(gulp.dest(paths.out + '/js/'))
// });

// gulp.task('jshint', function() {
//   return gulp.src(paths.js + '/main.js')
//     .pipe(jshint())
//     .pipe(jshint.reporter('jshint-stylish'));
// });

// gulp.task('js', function() {
//   return gulp.src(paths.js + '/main.js')
//     .pipe(sourcemaps.init())
//       .pipe(concat('main.js'))

//       // only uglify if gulp in ran with '--type production'
//       .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest(paths.out + '/js'));
// });

// Default version
gulp.task('default', [
  'connect:app',
  // 'copy-font',
  // 'copy-js-vendor',
  'jade',
  'sass',
  // 'js',
  // 'images'
]);