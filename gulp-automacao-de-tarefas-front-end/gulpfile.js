var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat');

gulp.task('copy', ['clean'], function() {

  return gulp.src('src/**/*')
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {

  return gulp.src('dist')
    .pipe(clean());
});

gulp.task('build-img', ['copy'], function() {

  gulp.src('src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('src/img'));
});

gulp.task('build-js', function() {

  gulp.src('dist/js/**/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist/js'));
});
