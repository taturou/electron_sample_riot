import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import sass from 'node-sass';
import config from '../config';

let $ = gulpLoadPlugins();

gulp.task('render-riot', () => {
  return gulp.src([config.render.riot.srcDir + '/**/*.tag.html'])
    .pipe($.changed(config.render.riot.tmpDir, {
      extension: '.js'
    }))
    .pipe($.plumber())
    .pipe($.riot({
      type: 'es6',
      parsers: {
        /*
        js: {
          babelrc: false,
          presets: ['es2015-riot']
        },
        */
        css: {
          sass: function(tagName, css) {
            var result = sass.renderSync({
              data: css
            });
            return result.css.toString();
          },
        },
      },
    }))
    .pipe($.header("import riot from 'riot';\n"))
    .pipe(gulp.dest(config.render.riot.tmpDir));
});
