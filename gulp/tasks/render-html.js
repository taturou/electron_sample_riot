import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import config from '../config';

let $ = gulpLoadPlugins();

gulp.task('render-html', () => {
  return gulp.src([config.render.html.srcDir + '/**/*.html'])
    .pipe($.changed(config.render.html.distDir))
    .pipe($.minifyHtml({ empty: true }))
    .pipe(gulp.dest(config.render.html.distDir));
});
