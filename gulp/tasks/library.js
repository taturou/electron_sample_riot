import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import runSequence from 'run-sequence';
import config from '../config';

let $ = gulpLoadPlugins();

gulp.task('library', (callback) => {
  return runSequence(
    `library-create`,
    `library-install`,
    callback);
});

gulp.task('library-create', () => {
  return gulp.src('./package.json')
    .pipe($.changed(config.common.distDir))
    .pipe($.jsonEditor((json) => {
      json.scripts = {};
      json.devDependencies = {};
      return json;
    }))
    .pipe(gulp.dest(config.common.distDir));
});

gulp.task('library-install', () => {
  return gulp.src(config.common.distDir + '/package.json')
    .pipe($.install());
});