var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    gulp-clean = require('gulp-clean');

gulp.task('copy', function() {

  gulp.src('src/**/*')
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {

  gulp.src('dist')
    .pipe(clean());
});

gulp.task('build-img', function() {

  gulp.src('src/img/**/*')
      .pipe(imagemin())
      .pipe(gulp.dest('src/img'));
});
