// include gulp and plugins
var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins();

// Define paths
var path = {
  html_src: 'out/*.html',
  html_out: 'out',

  css_src: 'out/styles/*.css',
  css_out: 'out/styles',

  js_src: 'out/javascripts/*.js',
  js_out: 'out/javascripts'
};

// Concatenate & Minify JS
gulp.task('minify-script', function() {
  return gulp.src(path.js_src)
    .pipe(plugins.jshint())
    .pipe(plugins.uglify())
    .pipe(gulp.dest(path.js_out));
});

// Minify Css
gulp.task('minify-css', function() {
  return gulp.src(path.css_out)
    .pipe(plugins.minifyCss())
    .pipe(gulp.dest(path.css_out));
});

// Minify html
gulp.task('minify-html', function() {
  var opts = {
    conditionals: true,
    spare: true,
    comment: true,
    empty: true,
    quotes: true
  };

  return gulp.src(path.html_src)
    .pipe(plugins.minifyHtml(opts))
    .pipe(gulp.dest(path.html_out));
});

// run all task with gulp
gulp.task('default', [
  'minify-html',
  'minify-css',
  'minify-script'
]);
