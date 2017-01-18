import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('package', (callback) => {
  return runSequence(
    ['build', 'package-json'],
    ['package-mac-do', 'package-win-ia32-do', 'package-win-x64-do'],
    callback);
});