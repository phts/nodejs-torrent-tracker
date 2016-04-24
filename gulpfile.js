var gulp = require('gulp');
var tsc  = require('gulp-typescript-compiler');

gulp.task('default', ['compile']);

gulp.task('compile', function () {
  return gulp
    .src('app/**/*.ts')
    .pipe(tsc())
    .pipe(gulp.dest('release'));
});

gulp.task('watch', function () {
  gulp.watch('app/**/*.ts', ['compile']);
});
