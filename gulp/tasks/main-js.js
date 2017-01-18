import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import config from '../config';

let $ = gulpLoadPlugins();

gulp.task('main-js', () => {
  return gulp.src([config.main.js.srcDir + '/**/*.js'])
    .pipe($.changed(config.main.js.distDir))
    .pipe(gulp.dest(config.main.js.distDir));
});