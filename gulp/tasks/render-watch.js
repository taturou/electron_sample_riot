import gulp from 'gulp';
import runSequence from 'run-sequence';
import bundle from '../helper/bundle';
import config from '../config';

gulp.task('render-watch', (callback) => {
  return runSequence(
    'render-src-watch',
    ['render-bundle-watch', 'render-businessman-watch'],
    callback);
});

gulp.task('render-src-watch', () => {
  gulp.watch([config.render.html.srcDir + '/**/*.html'], ['render-html']);
  gulp.watch([config.render.js.srcDir + '/**/*.js'], ['render-js']);
  gulp.watch([config.render.riot.srcDir + '/**/*.tag.html'], ['render-riot']);
})

gulp.task('render-bundle-watch', () => {
  return bundle({
    is_watch: true,
    entries: config.render.js.bundle.entries,
    source: config.render.js.bundle.distFile,
    dest: config.render.js.bundle.distDir
  });
});

gulp.task('render-businessman-watch', () => {
  return bundle({
    is_watch: true,
    entries: config.render.businessman.bundle.entries,
    source: config.render.businessman.bundle.distFile,
    dest: config.render.businessman.bundle.distDir
  });
});