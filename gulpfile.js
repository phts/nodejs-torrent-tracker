var gulp = require('gulp');
var mocha = require('gulp-mocha');
var ts  = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

gulp.task('default', ['compile']);

gulp.task('compile', function () {
  return gulp.src('app/**/*.ts')
    .pipe(ts(tsProject))
    .pipe(gulp.dest('js/app'));
});

gulp.task('compile-tests', ['compile'], function () {
  return gulp.src('test/**/*.ts')
    .pipe(ts(tsProject))
    .pipe(gulp.dest('js/test'));
});

gulp.task('watch', function () {
  gulp.watch('app/**/*.ts', ['compile']);
});

gulp.task('watch-test', function () {
  gulp.watch(['app/**/*.ts', 'test/**/*.ts'], ['test']);
});

gulp.task('test', ['compile-tests'], function () {
  return gulp.src('js/test/**/*.test.js', {read: false})
    .pipe(mocha({reporter: 'spec'}));
});
