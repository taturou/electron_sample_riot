import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import config from '../config';

let $ = gulpLoadPlugins();

gulp.task('render-js', () => {
  return gulp.src([config.render.js.srcDir + '/**/*.js'])
    .pipe($.changed(config.render.js.tmpDir))
    .pipe(gulp.dest(config.render.js.tmpDir));
});
