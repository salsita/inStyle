var gulp = require('gulp');
var stylus = require('gulp-stylus');
var rename = require("gulp-rename");
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');

gulp.task('build-styles', function () {
  gulp.src('./src/css/_main.styl')
    .pipe(stylus({
      compress: true,
      'include css': true
    }))
    .pipe(rename('gonzo.css'))
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 version'] }) ]))
    .pipe(gulp.dest('./build'));
});

gulp.task('watch', function() {
  gulp.watch('./src/css/**/*.styl', ['build-styles']);
});

gulp.task('default', ['build-styles', 'watch']);