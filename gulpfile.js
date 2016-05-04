var gulp = require('gulp');
var mocha = require('gulp-mocha');
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

gulp.task('test', ['compile'], function () {
  return gulp.src('test/**/*.test.js', {read: false})
    .pipe(mocha({reporter: 'spec'}));
});
