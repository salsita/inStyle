var gulp = require('gulp');
var stylus = require('gulp-stylus');
var rename = require("gulp-rename");
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer-core');
var minifyCss = require('gulp-minify-css');

gulp.task('compile-stylus', function () {
  gulp.src('./src/css/main.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(rename('gonzo.css'))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('./build'));
});

gulp.task('autoprefixer', function () {
  gulp.src('./build/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 version'] }) ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build'));
});

gulp.task('default', ['compile-stylus', 'autoprefixer']);