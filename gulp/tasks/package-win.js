import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('package-win', (callback) => {
  return runSequence(
    `build`,
    ['package-win-ia32-do', 'package-win-x64-do'],
    callback);
});