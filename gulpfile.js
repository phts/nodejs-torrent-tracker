var gulp = require('gulp');
var ts  = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

gulp.task('default', ['compile']);

gulp.task('compile', function () {
  return tsProject.src()
    .pipe(ts(tsProject))
    .pipe(gulp.dest('release'));
});

gulp.task('watch', function () {
  gulp.watch('app/**/*.ts', ['compile']);
});
