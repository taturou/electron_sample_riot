import gulp from 'gulp';
import runSequence from 'run-sequence';
import bundle from '../helper/bundle';
import config from '../config';

gulp.task('render-bundle', (callback) => {
  return runSequence(
    ['render-html', 'render-js', 'render-riot'],
    'render-bundle-do',
    callback);
});

gulp.task('render-businessman-bundle', (callback) => {
  return runSequence(
    'render-js',
    'render-businessman-do',
    callback);
});

gulp.task('render-bundle-do', () => {
  return bundle({
    is_watch: false,
    entries: config.render.js.bundle.entries,
    source: config.render.js.bundle.distFile,
    dest: config.render.js.bundle.distDir
  });
});

gulp.task('render-businessman-bundle-do', () => {
  return bundle({
    is_watch: false,
    entries: config.render.businessman.bundle.entries,
    source: config.render.businessman.bundle.distFile,
    dest: config.render.businessman.bundle.distDir
  });
});