import gulp from 'gulp';
import runSequence from 'run-sequence';
import bundle from '../helper/bundle';
import config from '../config';

gulp.task('render-bundle', (callback) => {
  return runSequence(
    ['render-html', 'render-js', 'render-riot'],
    ['render-bundle-bundle', 'render-businessman-bundle'],
    callback);
});

gulp.task('render-bundle-bundle', () => {
  return bundle({
    is_watch: false,
    entries: config.render.js.bundle.entries,
    source: config.render.js.bundle.distFile,
    dest: config.render.js.bundle.distDir
  });
});

gulp.task('render-businessman-bundle', () => {
  return bundle({
    is_watch: false,
    entries: config.render.businessman.bundle.entries,
    source: config.render.businessman.bundle.distFile,
    dest: config.render.businessman.bundle.distDir
  });
});