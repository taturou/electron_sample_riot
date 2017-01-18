import gulp from 'gulp';
import del from 'del';
import config from '../config';

gulp.task('clean-release', () => {
  return del.sync([config.common.releaseDir]);
});