var gulp = require('gulp');
var stylus = require('gulp-stylus');
var rename = require("gulp-rename");
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer-core');
var minifycss = require('gulp-minify-css');

gulp.task('build-styles', function () {
  gulp.src('./src/css/_main.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(rename('gonzo.css'))
    .pipe(sourcemaps.init())
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 version'] }) ]))
    .pipe(sourcemaps.write('.'))
    .pipe(minifycss({compatibility: 'ie8'}))
    .pipe(gulp.dest('./build'));
});

gulp.task('watch', function() {
  gulp.watch('./src/css/**/*.styl', ['build-styles']);
});

gulp.task('default', ['build-styles', 'watch']);