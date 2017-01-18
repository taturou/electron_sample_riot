import gulp from 'gulp';
import del from 'del';
import config from '../config';

gulp.task('clean-dist', () => {
  return del.sync([config.common.distDir]);
});